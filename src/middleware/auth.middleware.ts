import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

interface AuthRequest extends Request, jwt.JwtPayload{
    user?:any;
}

export const verify_JWT=async(req:AuthRequest,res:Response,next:NextFunction)=>{


    try {
        if (req.headers.cookie) {
            const cookies = req.headers.cookie.split(";").reduce((acc, cookie) => {
                const [key, value] = cookie.trim().split("=");
                acc[key] = value;
                return acc;
            }, {} as Record<string, string>);
            //console.log(cookies.accessToken);
            const token = cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");
            //console.log("Token=>"+token)
            if(!token){
                throw new ApiError(401,"Unauthenticated");
            }
                const decodeToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET as string) as AuthRequest
                const email:string=decodeToken.email;
                const user= await User.findOne({email}).select("-password -refreshToken");
                if(!user){
                    throw new ApiError(401,"Unauthenticated");
                }
                req.user=user;
                //console.log("User "+user)
                next();
        }else{
             res.status(400).json(new ApiError(401, "Unauthenticated"));
            //throw new ApiError(401,"Unauthenticated");
        }
       
        
    } catch (error:any) {
        throw new ApiError(401,error);
        }
}