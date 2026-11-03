import { MessageCircle } from 'lucide-react';
import CommentItem from './CommentItem';

const CommentList = ({
    comments,
    currentUserId,
    isLoading,
    onDelete,
    onLike,
    onReply,
}) => {
    if (isLoading) {
        return (
            <div className="flex flex-1 items-center justify-center py-12">
                <span className="block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
        );
    }

    if (comments.length === 0) {
        return (
            <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-4 py-12 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-foreground/5 text-muted/60">
                    <MessageCircle className="h-6 w-6" />
                </div>
                <p className="text-sm font-semibold text-foreground">
                    No comments yet
                </p>
                <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted">
                    Start the conversation! Your thoughts
                    remain anonymous.
                </p>
            </div>
        );
    }

    const getId = (value) => {
        if (!value) return null;
        if (typeof value === 'object') {
            return value._id || value.id || null;
        }
        return value;
    };

    // Keep the API's flat comment data, but render each reply with its parent.
    const commentsById = new Map(
        comments.map((comment) => [
            String(getId(comment)),
            comment,
        ])
    );
    const repliesByParentId = new Map();
    const topLevelComments = [];

    comments.forEach((comment) => {
        const parentId = getId(comment.parentComment);
        if (
            parentId &&
            commentsById.has(String(parentId))
        ) {
            const key = String(parentId);
            const replies =
                repliesByParentId.get(key) || [];
            replies.push(comment);
            repliesByParentId.set(key, replies);
        } else {
            // If a parent is outside the fetched page, keep the comment visible.
            topLevelComments.push(comment);
        }
    });

    const renderComment = (comment) => {
        const commentId = getId(comment);
        const commentUserId =
            comment.user?._id ||
            comment.user?.id ||
            comment.user ||
            comment.author?._id;
        const isOwnComment =
            currentUserId &&
            String(commentUserId) === String(currentUserId);

        return (
            <CommentItem
                key={
                    commentId ||
                    `${comment.content}-${comment.createdAt}`
                }
                comment={comment}
                showDelete={isOwnComment}
                onDelete={onDelete}
                onLike={onLike}
                onReply={onReply}
            />
        );
    };

    return (
        <div className="flex-1 overflow-y-auto divide-y divide-border/50 px-2 py-2">
            {topLevelComments.map((comment) => {
                const commentId = getId(comment);
                const replies =
                    repliesByParentId.get(
                        String(commentId)
                    ) || [];

                return (
                    <div
                        key={commentId || comment.createdAt}
                    >
                        {renderComment(comment)}
                        {replies.length > 0 && (
                            <div className="ml-5 border-l border-border/70 pl-2 sm:ml-8 sm:pl-3">
                                {replies.map(renderComment)}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default CommentList;
