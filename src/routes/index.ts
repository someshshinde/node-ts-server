import { Router } from 'express';
import { getUsers, createUser } from '../controllers/user.controller';
import { test } from '../controllers/test.controller';

const router = Router();
router.get('/test', test);

router.post('/users', createUser);



export { router };