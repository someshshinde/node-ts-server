import { Request, Response, NextFunction, RequestHandler } from 'express';
import { userDTO } from '../dto/user.dto';
import { ApiResponse } from '../utils/ApiResponce';
import { ApiError } from '../utils/ApiError';
import { User } from '../models/user.model';

interface AuthRequest extends Request {
user?:any;
}
export const getUsers = (req: Request, res: Response) => {
  res.json([{ id: 1, name: 'John Doe' }]);
};

export const createUser = async (req: Request, res: Response) => {
  try {

    const userData: userDTO = req.body;
    const user = User.create(userData);
    const insertData = await User.findById((await user)._id).select(" -password -refreshToken");
    res.status(201).json(new ApiResponse(201, true, 'User created successfully', insertData));
  } catch (error:any) {
    res.status(400).json(new ApiResponse(400, false, error));
  }

};
const generateAccessAndRefreshTockens = async (userID: any) => {
  try {
    const user = await User.findById(userID);
    const accessToken = user?.generateAccessToken()
    const refreshToken = user?.generateRefreshToken();
    if (user) {
      user.refreshToken = refreshToken as string;
      await user.save({ validateBeforeSave: false });
    }
    return { accessToken, refreshToken };
  } catch (error:any) {
    throw new ApiError(500, error);
  }

}


export const loginUser: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
   
    if (!user) {
      throw new ApiError(404, "User not found");
    } else {
      const isMatch = await user.compairPassword(password);
      if (!isMatch) {
        throw new ApiError(400, "Invalid credentials");
      }
    }
    const{accessToken,refreshToken}=await generateAccessAndRefreshTockens(user._id);
    //set cookies
    const options = {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: true,
  }
  res
  .status(200)
  .cookie('refreshToken', refreshToken, options)
  .cookie('accessToken', accessToken, options)
  .json(new ApiResponse(200, true, 'User logged in successfully', { accessToken, refreshToken }));
  next();

  } catch (error:any) {
    res.status(400).json(new ApiResponse(400, false, error));

  }

 
}

export const changePassword:RequestHandler=async(req:AuthRequest,res:Response,next:NextFunction):Promise<void>=>{
  try {
    const {oldPassword,newPassword}=req.body;
    const user  = await User.findById({ _id: req.user?._id });
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const isMatch = await user.compairPassword(oldPassword);
    //console.log(isMatch);
    if(!isMatch){
      throw new ApiError(400,"Invalid Password")
    }
    user.password=newPassword;
    //console.log(user.password);
    await user.save({ validateBeforeSave: false });
   res.status(200).json(new ApiResponse(200,true,"Password changed successfully",user));

  } catch (error:any) {
    res.status(400).json(new ApiResponse(400, false, error));
  }

}

export const getAllUsers= async(req:Request,res:Response)=>{
  try {
    const user=await User.find().select("-password -refreshToken");
    res.status(200).json(new ApiResponse(200,true,"All users",user));
    
  } catch (error:any) {
    res.status(400).json(new ApiResponse(400, false, error));
  }

}