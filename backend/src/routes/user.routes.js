import { Router } from 'express';
import {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    changeUserPassword,
} from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', verifyJWT, logoutUser);
router.get('/currentUser', verifyJWT, getCurrentUser);
router.post(
    '/change-password',
    verifyJWT,
    changeUserPassword
);

export default router;
