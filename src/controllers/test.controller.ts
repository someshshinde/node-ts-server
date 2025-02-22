import {Request,Response} from 'express'
import { ApiResponse } from '../utils/ApiResponce'


export const test=async(req:Request,res:Response)=>{
    res
    .status(200)
    .json(new ApiResponse(200,true,'Test API is working fine'))

}