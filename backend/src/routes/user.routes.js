import { Router } from 'express';

import {
    getCurrentUser,
    changeUserPassword,
    getUserPosts,
} from '../controllers/user.controller.js';

import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/me', verifyJWT, getCurrentUser);
router.patch('/me/password', verifyJWT, changeUserPassword);
router.get('/me/posts', verifyJWT, getUserPosts);

export default router;
