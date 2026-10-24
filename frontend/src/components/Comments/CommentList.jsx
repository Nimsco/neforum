import CommentItem from './CommentItem';
import CommentEmptyState from './CommentEmptyState';

/**
 * CommentList
 *
 * Scrollable container rendering comment items or empty state.
 */
const CommentList = ({
    comments = [],
    isLoading = false,
    onLikeComment,
    onReplyComment,
    onDeleteComment,
}) => {
    if (isLoading) {
        return (
            <div className="flex flex-1 items-center justify-center py-12">
                <span className="block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
        );
    }

    if (!comments || comments.length === 0) {
        return (
            <div className="flex-1 overflow-y-auto">
                <CommentEmptyState />
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto divide-y divide-border/50 px-2 py-2">
            {comments.map((comment) => (
                <CommentItem
                    key={
                        comment._id ||
                        comment.id ||
                        Math.random()
                    }
                    comment={comment}
                    onLike={onLikeComment}
                    onReply={onReplyComment}
                    onDelete={onDeleteComment}
                />
            ))}
        </div>
    );
};

export default CommentList;
