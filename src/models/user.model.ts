import mongoose,{Schema} from "mongoose";
import { userDTO } from "../dto/user.dto";
import bcrypt from 'bcrypt';

const userSchema= new Schema<userDTO>({
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

export const User=mongoose.model('User',userSchema);