import mongoose,{Schema} from "mongoose";
import { userDTO } from "../dto/user.dto";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {JWT_ACCESS_TOKEN_SECRET,JWT_ACCESS_TOKEN_EXPIRY,JWT_REFRESH_TOKEN_SECRET,JWT_REFRESH_TOKEN_EXPIRY} from '../config';

const userSchema= new Schema<userDTO>({
    // _id:{
    //     type:Schema.Types.ObjectId,
    // },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String,
    }
},{
    timestamps:true
})
// Hash the password before saving
userSchema.pre<userDTO>('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.compairPassword=async function(password:string){
    return await bcrypt.compare(password,this.password);
}
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email:this.email
        },
        JWT_ACCESS_TOKEN_SECRET as string,
        {
            expiresIn: JWT_ACCESS_TOKEN_EXPIRY
        } as jwt.SignOptions
    )
 
}
userSchema.methods.generateRefreshToken = function () {

    return jwt.sign({
        _id: this._id,
        email:this.email
        },
        JWT_REFRESH_TOKEN_SECRET as string,
        {
            expiresIn: JWT_REFRESH_TOKEN_EXPIRY
        } as jwt.SignOptions
    )
}
export const User=mongoose.model('User',userSchema);