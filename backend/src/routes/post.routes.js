import { Router } from 'express';

import { verifyJWT } from '../middlewares/auth.middleware.js';

import {
    createComment,
    createPost,
    deletePost,
    getPosts,
    likePost,
    unlikePost,
} from '../controllers/post.controller.js';

const router = Router();

// Posts
router.get('/', verifyJWT, getPosts);
router.post('/', verifyJWT, createPost);
router.delete('/:postId', verifyJWT, deletePost);

// Likes
router.post('/:postId/likes', verifyJWT, likePost);
router.delete('/:postId/likes', verifyJWT, unlikePost);

// Comments
router.post('/:postId/comments', verifyJWT, createComment);

export default router;
