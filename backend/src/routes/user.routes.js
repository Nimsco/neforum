import { Router } from 'express';
import {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    changeUserPassword,
    refreshAccessToken,
} from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', verifyJWT, logoutUser);
router.get('/current-user', verifyJWT, getCurrentUser);
router.post(
    '/change-password',
    verifyJWT,
    changeUserPassword
);
router.post('/refresh-access-token', refreshAccessToken);

export default router;
