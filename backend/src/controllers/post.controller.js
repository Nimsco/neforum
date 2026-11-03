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
import CommentLike from '../models/commentLike.model.js';
import SavedPost from '../models/savedPost.model.js';
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
        .sort({ createdAt: -1 });

    const [likedPosts, savedPosts] = await Promise.all([
        Like.find({ user }).select('post'),
        SavedPost.find({ user }).select('post'),
    ]);

    const likedPostIds = new Set(
        likedPosts.map((like) => like.post.toString())
    );
    const savedPostIds = new Set(
        savedPosts.map((saved) => saved.post.toString())
    );

    const postsWithLikeStatus = posts.map((post) => ({
        ...post.toObject(),
        isLiked: likedPostIds.has(post._id.toString()),
        isSaved: savedPostIds.has(post._id.toString()),
    }));

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { posts: postsWithLikeStatus },
                'Posts fetched successfully'
            )
        );
});

const getPostById = asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    const { postId } = req.params;

    if (!userId) {
        throw new ApiError(
            401,
            'User must be logged in to view posts.'
        );
    }
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new ApiError(400, 'Post ID is invalid.');
    }

    const post = await Post.findById(postId).populate(
        'author',
        'username'
    );
    if (!post) throw new ApiError(404, 'Post not found.');

    const [isLiked, isSaved] = await Promise.all([
        Like.exists({ post: postId, user: userId }),
        SavedPost.exists({ post: postId, user: userId }),
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                post: {
                    ...post.toObject(),
                    isLiked: Boolean(isLiked),
                    isSaved: Boolean(isSaved),
                },
            },
            'Post fetched successfully.'
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

    const comments = await Comment.find({
        post: postId,
    }).select('_id');
    const commentIds = comments.map(
        (comment) => comment._id
    );
    if (commentIds.length) {
        await CommentLike.deleteMany({
            comment: { $in: commentIds },
        });
        await Comment.deleteMany({
            _id: { $in: commentIds },
        });
    }
    await Like.deleteMany({ post: postId });
    await SavedPost.deleteMany({ post: postId });

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

const setPostSaved = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { postId } = req.params;
    const shouldSave = req.method === 'POST';

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new ApiError(400, 'Post ID is invalid.');
    }
    const post = await Post.findById(postId);
    if (!post) throw new ApiError(404, 'Post not found.');

    if (shouldSave) {
        try {
            await SavedPost.create({
                post: postId,
                user: userId,
            });
        } catch (error) {
            if (error?.code === 11000) {
                throw new ApiError(
                    400,
                    'Post already saved.'
                );
            }
            throw error;
        }
    } else {
        const removed = await SavedPost.findOneAndDelete({
            post: postId,
            user: userId,
        });
        if (!removed) {
            throw new ApiError(400, 'Post is not saved.');
        }
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { isSaved: shouldSave },
                shouldSave
                    ? 'Post saved successfully.'
                    : 'Post removed from saved posts.'
            )
        );
});

const setCommentLike = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { commentId } = req.params;
    const shouldLike = req.method === 'POST';

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        throw new ApiError(400, 'Comment ID is invalid.');
    }
    const comment = await Comment.findById(commentId);
    if (!comment)
        throw new ApiError(404, 'Comment not found.');

    if (shouldLike) {
        try {
            await CommentLike.create({
                comment: commentId,
                user: userId,
            });
        } catch (error) {
            if (error?.code === 11000) {
                throw new ApiError(
                    400,
                    'Comment already liked.'
                );
            }
            throw error;
        }
    } else {
        const removed = await CommentLike.findOneAndDelete({
            comment: commentId,
            user: userId,
        });
        if (!removed) {
            throw new ApiError(
                400,
                'Comment is not liked.'
            );
        }
    }

    const [likeCount, isLiked] = await Promise.all([
        CommentLike.countDocuments({ comment: commentId }),
        CommentLike.exists({
            comment: commentId,
            user: userId,
        }),
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { likeCount, isLiked: Boolean(isLiked) },
                shouldLike
                    ? 'Comment liked successfully.'
                    : 'Comment unliked successfully.'
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

const deleteComment = asyncHandler(async (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, 'Please login first.');
    }

    if (!commentId) {
        throw new ApiError(400, 'Comment ID is required.');
    }

    // Find comment and its owner
    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(404, 'Comment not found.');
    }

    // Check ownership
    if (!comment.user.equals(userId)) {
        throw new ApiError(
            403,
            'You cannot delete this comment.'
        );
    }

    // Delete comment
    const childComments = await Comment.find({
        parentComment: commentId,
    }).select('_id');
    const commentIds = [
        comment._id,
        ...childComments.map((child) => child._id),
    ];
    await CommentLike.deleteMany({
        comment: { $in: commentIds },
    });
    const deletedComments = await Comment.deleteMany({
        _id: { $in: commentIds },
    });

    if (!deletedComments.deletedCount) {
        throw new ApiError(
            400,
            'Comment could not be deleted.'
        );
    }

    // Decrease post comment count
    await Post.updateOne(
        { _id: comment.post },
        {
            $inc: {
                commentCount: -deletedComments.deletedCount,
            },
        }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                'Comment deleted successfully.'
            )
        );
});

const updateComment = asyncHandler(async (req, res) => {
    const newComment = req.body?.newComment;

    const userId = req.user?.id;
    const commentId = req.params.commentId;

    if (!userId) {
        throw new ApiError(401, 'Please login first.');
    }

    if (!commentId) {
        throw new ApiError(404, 'Comment not found.');
    }

    const content = validateComment(newComment);

    //find comment and its owner
    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(404, 'Comment not found.');
    }

    //check ownership
    if (!comment.user.equals(userId)) {
        throw new ApiError(
            403,
            'You cannot edit this comment.'
        );
    }

    const isUpdated = await Comment.updateOne(
        { _id: commentId, user: userId },
        { $set: { content: content } }
    );

    if (isUpdated.matchedCount === 0) {
        throw new ApiError(
            400,
            'Comment could not be updated.'
        );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { content },
                'Comment updated successfully.'
            )
        );
});

const fetchPostsComments = asyncHandler(
    async (req, res) => {
        const postId = req.params.postId;
        const userId = req.user?.id;

        if (!userId) {
            throw new ApiError(401, 'Please login first.');
        }

        if (!postId) {
            throw new ApiError(400, 'Post ID is required.');
        }

        const comments = await Comment.find({
            post: postId,
        })
            .populate('user', 'username')
            .sort({ createdAt: -1 });

        const commentIds = comments.map(
            (comment) => comment._id
        );
        const [counts, likedComments] = await Promise.all([
            CommentLike.aggregate([
                {
                    $match: {
                        comment: { $in: commentIds },
                    },
                },
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
            likedComments.map((like) =>
                String(like.comment)
            )
        );
        const commentsWithLikes = comments.map(
            (comment) => {
                const id = String(comment._id);
                return {
                    ...comment.toObject(),
                    likeCount:
                        countsByCommentId.get(id) || 0,
                    isLiked: likedCommentIds.has(id),
                };
            }
        );

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { comments: commentsWithLikes },
                    'Comments fetched successfully.'
                )
            );
    }
);

export {
    createPost,
    getPosts,
    getPostById,
    deletePost,
    likePost,
    unlikePost,
    createComment,
    deleteComment,
    updateComment,
    fetchPostsComments,
    setCommentLike,
    setPostSaved,
};
