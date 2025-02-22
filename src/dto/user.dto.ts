import { Schema } from 'mongoose';
import {Document, Types} from 'mongoose'
export interface userDTO extends Document{
 //  _id:Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: string;
    status: string;
    refreshToken: string;
    compairPassword:(password:string)=>Promise<boolean>;
    generateAccessToken:()=>string;
    generateRefreshToken:()=>string;
}