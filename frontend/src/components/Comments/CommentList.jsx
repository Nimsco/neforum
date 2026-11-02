import { MessageCircle } from 'lucide-react';
import CommentItem from './CommentItem';

const CommentList = ({
    comments,
    currentUserId,
    isLoading,
    onDelete,
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

    return (
        <div className="flex-1 overflow-y-auto divide-y divide-border/50 px-2 py-2">
            {comments.map((comment, index) => {
                const commentUserId =
                    comment.user?._id ||
                    comment.user?.id ||
                    comment.user ||
                    comment.author?._id;
                const isOwnComment =
                    currentUserId &&
                    String(commentUserId) ===
                        String(currentUserId);

                return (
                    <CommentItem
                        key={
                            comment._id ||
                            comment.id ||
                            index
                        }
                        comment={comment}
                        showDelete={isOwnComment}
                        onDelete={onDelete}
                        onReply={onReply}
                    />
                );
            })}
        </div>
    );
};

export default CommentList;
