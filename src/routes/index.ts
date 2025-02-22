import { Router } from 'express';
import { createUser, loginUser } from '../controllers/user.controller';
import { test } from '../controllers/test.controller';

const router = Router();
router.get('/test', test);

router.post('/users', createUser);

router.post('/login', loginUser);


export { router };