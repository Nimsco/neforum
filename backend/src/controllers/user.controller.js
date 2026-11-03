import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import {
    validateNewPassword,
    validatePassword,
    validateUsername,
} from '../utils/validators.js';
import {
    generateAccessToken,
    generateRefreshToken,
} from '../utils/generateTokens.js';
import User from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateRecoveryKey } from '../utils/generateRecoveryKey.js';
import bcrypt from 'bcryptjs';
import { verifyRefreshToken } from '../utils/verifyRefreshToken.js';
import Post from '../models/post.model.js';
import Comment from '../models/comment.model.js';
import Like from '../models/like.model.js';
import CommentLike from '../models/commentLike.model.js';
import SavedPost from '../models/savedPost.model.js';

const registerUser = asyncHandler(async (req, res) => {
    const { username, password, confirmPassword } =
        req.body;

    await validateUsername(username);

    validatePassword(password, confirmPassword);

    const recoveryKey = generateRecoveryKey(16);

    const user = new User({
        username,
        password,
        recoveryKey,
    });

    await user.save();

    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    const accessToken = generateAccessToken(user);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite:
            process.env.NODE_ENV === 'production'
                ? 'none'
                : 'strict',
        path: '/',
    }).json(
        new ApiResponse(
            201,
            {
                user: {
                    id: user._id,
                    username: user.username,
                    recoveryKey,
                },
                accessToken,
            },
            'User registered successfully'
        )
    );
});

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new ApiError(
            400,
            'Username and password are required'
        );
    }

    const user = await User.findOne({ username });

    if (!user) {
        throw new ApiError(404, 'Invalid Credentials.');
    }

    if (user.isBlocked) {
        throw new ApiError(
            403,
            'User is blocked. Please contact support.'
        );
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new ApiError(401, 'Invalid credentials');
    }

    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const accessToken = generateAccessToken(user);

    return res
        .status(200)
        .cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        })
        .json(
            new ApiResponse(
                200,
                {
                    user: {
                        id: user._id,
                        username: user.username,
                    },
                    accessToken,
                },
                'User logged in successfully'
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: null,
            },
        },
        {
            new: true,
        }
    );

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    };

    return res
        .status(200)
        .clearCookie('refreshToken', options)
        .json(
            new ApiResponse(
                200,
                {},
                'User logged out successfully.'
            )
        );
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { user: req.user },
                'User Fetched Successfully.'
            )
        );
});

const changeUserPassword = asyncHandler(
    async (req, res) => {
        const {
            recoveryKey,
            newPassword,
            confirmNewPassword,
        } = req.body;

        if (!recoveryKey || !newPassword) {
            throw new ApiError(400, 'No Recovery Key.');
        }

        if (newPassword !== confirmNewPassword) {
            throw new ApiError(
                400,
                'Passwords do not match.'
            );
        }

        const userId = req.user._id;

        if (!userId) {
            throw new ApiError(400, 'No User Found.');
        }

        const hashedRecoveryKey =
            await User.findById(userId).select(
                'recoveryKey'
            );

        const isMatch = await bcrypt.compare(
            recoveryKey,
            hashedRecoveryKey.recoveryKey
        );

        if (isMatch == false) {
            throw new ApiError(
                404,
                'Rocovery Key does not match.'
            );
        }

        validateNewPassword(newPassword);

        const user = await User.findById(req.user._id);

        user.password = newPassword;

        await user.save();

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {},
                    'Password has been successfully changed.'
                )
            );
    }
);

const refreshAccessToken = asyncHandler(
    async (req, res) => {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            throw new ApiError(
                401,
                'Refresh Token Is Required.'
            );
        }

        const decodedToken =
            verifyRefreshToken(refreshToken);

        const user = await User.findById(decodedToken.id);

        if (!user || !(refreshToken == user.refreshToken)) {
            throw new ApiError(
                401,
                'Invalid Refresh Token.'
            );
        }

        if (user.isBlocked) {
            throw new ApiError(401, 'User Is Blocked.');
        }

        const accessToken = generateAccessToken(user);

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    user: {
                        id: user._id,
                        username: user.username,
                    },
                    accessToken,
                },
                'Access Token Refreshed Successfully.'
            )
        );
    }
);

const getUserPosts = asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    const [posts, likes, saved] = await Promise.all([
        Post.find({ author: userId })
            .populate('author', 'username')
            .sort({ createdAt: -1 }),
        Like.find({ user: userId }).select('post'),
        SavedPost.find({ user: userId }).select('post'),
    ]);
    const likedIds = new Set(
        likes.map((like) => String(like.post))
    );
    const savedIds = new Set(
        saved.map((item) => String(item.post))
    );
    const postsWithState = posts.map((post) => ({
        ...post.toObject(),
        isLiked: likedIds.has(String(post._id)),
        isSaved: savedIds.has(String(post._id)),
    }));

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                posts: postsWithState,
                postCount: postsWithState.length,
            },
            'Posts fetched successfully.'
        )
    );
});

const fetchUserStats = asyncHandler(async (req, res) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, 'Please login first.');
    }

    const [postCount, commentCount, likeCount] =
        await Promise.all([
            Post.countDocuments({ author: userId }),
            Comment.countDocuments({ user: userId }),
            Like.countDocuments({ user: userId }),
        ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                postCount,
                commentCount,
                likeCount,
            },
            'Stats fetched successfully.'
        )
    );
});

const fetchUserComments = asyncHandler(async (req, res) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, 'Please login first.');
    }

    const comments = await Comment.find({ user: userId })
        .populate('post', 'title likeCount commentCount')
        .populate('parentComment', 'content')
        .sort({ createdAt: -1 });

    const commentIds = comments.map(
        (comment) => comment._id
    );
    const [counts, likedComments] = await Promise.all([
        CommentLike.aggregate([
            { $match: { comment: { $in: commentIds } } },
            {
                $group: {
                    _id: '$comment',
                    count: { $sum: 1 },
                },
            },
        ]),
        CommentLike.find({
            comment: { $in: commentIds },
            user: userId,
        }).select('comment'),
    ]);

    const countsByCommentId = new Map(
        counts.map((entry) => [
            String(entry._id),
            entry.count,
        ])
    );
    const likedCommentIds = new Set(
        likedComments.map((like) => String(like.comment))
    );
    const commentsWithLikes = comments.map((comment) => {
        const id = String(comment._id);
        return {
            ...comment.toObject(),
            likeCount: countsByCommentId.get(id) || 0,
            isLiked: likedCommentIds.has(id),
        };
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { comments: commentsWithLikes },
                'Comments fetched successfully.'
            )
        );
});

export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    changeUserPassword,
    refreshAccessToken,
    getUserPosts,
    fetchUserComments,
    fetchUserStats,
};
