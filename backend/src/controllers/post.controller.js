import Post from '../models/post.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
    validateComment,
    validatePost,
} from '../utils/validators.js';
import User from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import Like from '../models/like.model.js';
import Comment from '../models/comment.model.js';
import mongoose from 'mongoose';

const createPost = asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(
            400,
            'Cannot create post without logging in.'
        );
    }

    validatePost(title, content);

    const user = await User.findById(userId);

    if (!user || user.isBlocked) {
        throw new ApiError(403, 'Post cannot be created.');
    }

    const post = new Post({
        author: userId,
        title,
        content,
    });

    await post.save();

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                post,
                'Post created successfully.'
            )
        );
});

const getPosts = asyncHandler(async (req, res) => {
    const user = req.user?.id;
    if (!user) {
        throw new ApiError(
            401,
            'User must be logged in to view posts.'
        );
    }

    const posts = await Post.find()
        .populate('author', 'username')
        .limit(10);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                posts,
                'Posts fetched successfully'
            )
        );
});

const deletePost = asyncHandler(async (req, res) => {
    const user = req.user?.id;
    if (!user) {
        throw new ApiError(
            401,
            'User must be logged in to delete posts.'
        );
    }

    const postId = req.params.postId;
    if (!postId) {
        throw new ApiError(400, 'Post not available.');
    }

    const deletedPost = await Post.findOneAndDelete({
        _id: postId,
        author: user,
    });

    if (!deletedPost) {
        throw new ApiError(
            404,
            'Post not found or you are not authorized to delete this post.'
        );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                'Post deleted successfully'
            )
        );
});

const likePost = asyncHandler(async (req, res) => {
    const postId = req.params.postId;

    console.log(postId);

    const user = req.user?.id;

    if (!postId) {
        throw new ApiError(400, 'No post available.');
    }

    if (!user) {
        throw new ApiError(401, 'Please login first.');
    }

    const session = await mongoose.startSession();

    try {
        await session.withTransaction(async () => {
            const post =
                await Post.findById(postId).session(
                    session
                );

            if (!post) {
                throw new ApiError(404, 'Post not found.');
            }

            const doesLikeExist = await Like.findOne({
                post: postId,
                user: user,
            }).session(session);

            if (doesLikeExist) {
                throw new ApiError(
                    400,
                    'User already liked the post'
                );
            }
            await Like.create(
                [{ post: postId, user: user }],
                { session }
            );

            await Post.updateOne(
                { _id: postId },
                { $inc: { likeCount: 1 } },
                { session }
            );
        });
    } catch (error) {
        throw new ApiError(
            error?.statusCode || 400,
            error?.message ||
                'Something went wrong when liking the post.'
        );
    } finally {
        await session.endSession();
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                'Post liked successfully'
            )
        );
});

const unlikePost = asyncHandler(async (req, res) => {
    const postId = req.params.postId;

    const user = req.user?.id;

    if (!postId) {
        throw new ApiError(400, 'No post available.');
    }

    if (!user) {
        throw new ApiError(401, 'Please login first.');
    }

    const session = await mongoose.startSession();

    try {
        await session.withTransaction(async () => {
            const post =
                await Post.findById(postId).session(
                    session
                );

            if (!post) {
                throw new ApiError(404, 'Post not found.');
            }

            const isDeleted = await Like.findOneAndDelete({
                post: postId,
                user: user,
            }).session(session);

            if (!isDeleted) {
                throw new ApiError(
                    400,
                    "You haven't liked this post."
                );
            }

            await Post.updateOne(
                {
                    _id: postId,
                },
                {
                    $inc: { likeCount: -1 },
                }
            ).session(session);
        });
    } catch (error) {
        throw new ApiError(
            error?.statusCode || 400,
            error?.message ||
                'Something went wrong when unliking the post.'
        );
    } finally {
        await session.endSession();
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                'Post unliked successfully.'
            )
        );
});

const createComment = asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user?.id;
    const { comment, parentComment } = req.body;

    if (!postId) {
        throw new ApiError(400, 'Post ID is required.');
    }

    if (!userId) {
        throw new ApiError(401, 'Please login first.');
    }

    // Check whether the post exists
    const post = await Post.findById(postId);

    if (!post) {
        throw new ApiError(404, 'Post cannot be found.');
    }

    // Check whether the user exists and is not blocked
    const userData = await User.findById(userId);

    if (!userData || userData.isBlocked) {
        throw new ApiError(
            403,
            'You cannot post comments.'
        );
    }

    // Validate comment content
    const content = validateComment(comment);

    // Validate parent comment if this is a reply
    if (parentComment) {
        const parent = await Comment.findOne({
            _id: parentComment,
            post: postId,
            parentComment: null,
        });

        if (!parent) {
            throw new ApiError(
                404,
                'Parent comment cannot be found.'
            );
        }
    }

    // Create comment
    const newComment = await Comment.create({
        post: postId,
        user: userId,
        content,
        parentComment: parentComment || null,
    });

    if (!newComment) {
        throw new ApiError(
            400,
            'Something went wrong while posting comment.'
        );
    }

    await Post.findByIdAndUpdate(postId, {
        $inc: { commentCount: 1 },
    });

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                newComment,
                'Comment posted successfully.'
            )
        );
});

export {
    createPost,
    getPosts,
    deletePost,
    likePost,
    unlikePost,
    createComment,
};
