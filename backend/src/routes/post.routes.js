import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
    createPost,
    deletePost,
    getPosts,
} from '../controllers/post.controller.js';

const router = Router();

router.post('/create-post', verifyJWT, createPost);
router.get('/get-posts', verifyJWT, getPosts);
router.post('/delete-post', verifyJWT, deletePost);

export default router;
