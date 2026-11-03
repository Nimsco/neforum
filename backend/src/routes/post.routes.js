import { Router } from 'express';

import { verifyJWT } from '../middlewares/auth.middleware.js';

import {
    createComment,
    createPost,
    deletePost,
    getPosts,
    getPostById,
    likePost,
    unlikePost,
    deleteComment,
    updateComment,
    fetchPostsComments,
    setCommentLike,
    setPostSaved,
} from '../controllers/post.controller.js';

const router = Router();

// Posts
router.get('/', verifyJWT, getPosts);
router.get('/:postId', verifyJWT, getPostById);
router.post('/', verifyJWT, createPost);
router.delete('/:postId', verifyJWT, deletePost);

// Likes
router.post('/:postId/likes', verifyJWT, likePost);
router.delete('/:postId/likes', verifyJWT, unlikePost);
router.post('/:postId/saves', verifyJWT, setPostSaved);
router.delete('/:postId/saves', verifyJWT, setPostSaved);

// Comments
router.get(
    '/:postId/comments',
    verifyJWT,
    fetchPostsComments
);
router.post(
    '/comments/:commentId/likes',
    verifyJWT,
    setCommentLike
);
router.delete(
    '/comments/:commentId/likes',
    verifyJWT,
    setCommentLike
);
router.post('/:postId/comments', verifyJWT, createComment);
router.delete(
    '/:commentId/comments',
    verifyJWT,
    deleteComment
);
router.patch(
    '/:commentId/comments',
    verifyJWT,
    updateComment
);

export default router;
