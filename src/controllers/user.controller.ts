import { Request, Response } from 'express';
import { userDTO } from '../dto/user.dto';
import { ApiResponse } from '../utils/ApiResponce';
import { ApiError } from '../utils/ApiError';

export const getUsers = (req: Request, res: Response) => {
  res.json([{ id: 1, name: 'John Doe' }]);
};

export const createUser = (req: Request, res: Response) =>  {
  try {
    
    const userData:userDTO= req.body;
    
    res.status(201).json(new ApiResponse(201,true,'User created successfully',userData));
  } catch (error) {
    throw new ApiError(400, ""+error);
  }

};