import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        title: {
            type: String,
            required: true,
            minlength: 1,
            trim: true,
            maxlength: 100,
        },
        content: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 3000,
        },
        commentCount: {
            type: Number,
            default: 0,
        },
        likeCount: {
            type: Number,
            default: 0,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// compound index
postSchema.index({ createdAt: -1 });

const Post = mongoose.model('Post', postSchema);

export default Post;
