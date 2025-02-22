import {Document, ObjectId} from 'mongoose'
export interface userDTO extends Document{
   _id:ObjectId;
    name: string;
    email: string;
    password: string;
    role: string;
    status: string;
    refreshToken: string;
}