import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
    createPost,
    getPosts,
} from '../controllers/post.controller.js';

const router = Router();

router.post('/create-post', verifyJWT, createPost);
router.get('/get-posts', verifyJWT, getPosts);

export default router;
