import { Router } from 'express';
import { changePassword, createUser, getAllUsers, loginUser, logout } from '../controllers/user.controller';
import { test } from '../controllers/test.controller';
import { verify_JWT } from '../middleware/auth.middleware';

const router = Router();
router.get('/test', test);

router.post('/users', createUser);

router.post('/login', loginUser);

router.post('/changepassword',verify_JWT, changePassword)

router.get('/getalluser',verify_JWT,getAllUsers)

router.get('/logout',verify_JWT,logout)
export { router };