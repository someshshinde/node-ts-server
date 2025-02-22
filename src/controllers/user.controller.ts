import { Request, Response } from 'express';
import { userDTO } from '../dto/user.dto';
import { ApiResponse } from '../utils/ApiResponce';
import { ApiError } from '../utils/ApiError';
import { User } from '../models/user.model';

export const getUsers = (req: Request, res: Response) => {
  res.json([{ id: 1, name: 'John Doe' }]);
};

export const createUser =async (req: Request, res: Response) =>  {
  try {
    
    const userData:userDTO= req.body;
    const user=User.create(userData);
    const insertData=await User.findById((await user)._id).select(" -password -refreshToken");
    res.status(201).json(new ApiResponse(201,true,'User created successfully',insertData));
  } catch (error) {
    res.status(400).json(new ApiResponse(400,false,""+error));
  }

};