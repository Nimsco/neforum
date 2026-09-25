import { Router } from 'express';
import {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
} from '../controllers/user.controller.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/currentUser', getCurrentUser);

export default router;
