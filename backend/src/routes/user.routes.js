import { Router } from 'express';

import {
    getCurrentUser,
    changeUserPassword,
    getUserPosts,
    fetchUserComments,
    fetchUserStats,
} from '../controllers/user.controller.js';

import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/me', verifyJWT, getCurrentUser);
router.patch('/me/password', verifyJWT, changeUserPassword);
router.get('/me/posts', verifyJWT, getUserPosts);
router.get('/me/comments', verifyJWT, fetchUserComments);
router.get('/me/stats', verifyJWT, fetchUserStats);

export default router;
