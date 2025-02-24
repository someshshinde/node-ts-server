import { Router } from 'express';
import { changePassword, createUser, deleteUser, getAllUsers, getUser, loginUser, logout } from '../controllers/user.controller';
import { test } from '../controllers/test.controller';
import { verify_JWT } from '../middleware/auth.middleware';

const router = Router();
router.get('/test', test);

router.post('/users', createUser);

router.post('/login', loginUser);

router.put('/changepassword',verify_JWT, changePassword)

router.get('/getalluser',verify_JWT,getAllUsers)

router.get('/getuser',verify_JWT,getUser)
router.delete('/deleteuser',verify_JWT,deleteUser)

router.get('/logout',verify_JWT,logout)

router.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page Not Found!'
    })
})

export { router };