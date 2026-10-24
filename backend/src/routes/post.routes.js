import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { createPost } from '../controllers/post.controller.js';

const router = Router();

router.post('/create-post', verifyJWT, createPost);

export default router;
