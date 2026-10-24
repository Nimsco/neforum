import Post from '../models/post.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validatePost } from '../utils/validators.js';
import User from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';

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

    const posts = await Post.find().limit(10);

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

export { createPost, getPosts };
