import { useState } from 'react';
import { Heart, Reply, Trash2, Clock } from 'lucide-react';

const formatCommentTime = (dateStr) => {
    if (!dateStr) return 'Just now';
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        const now = new Date();
        const diffInSeconds = Math.floor(
            (now - date) / 1000
        );

        if (diffInSeconds < 60) return 'Just now';
        const diffInMinutes = Math.floor(
            diffInSeconds / 60
        );
        if (diffInMinutes < 60)
            return `${diffInMinutes}m ago`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}h ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays}d ago`;

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    } catch {
        return '';
    }
};

/**
 * CommentItem
 *
 * Renders a single comment with interactive like animation, reply trigger, and actions.
 */
const CommentItem = ({
    comment,
    onLike,
    onReply,
    onDelete,
    showDelete = false,
}) => {
    const isLiked = Boolean(comment?.isLiked);
    const likeCount = comment?.likeCount ?? 0;
    const [isLiking, setIsLiking] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleLikeClick = async (e) => {
        e.stopPropagation();
        if (isLiking || !onLike) return;
        setIsLiking(true);
        try {
            await onLike(comment, !isLiked);
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 500);
        } catch {
            // The parent displays the API error.
        } finally {
            setIsLiking(false);
        }
    };

    const authorName =
        comment?.user?.username ||
        comment?.author?.username ||
        comment?.authorName ||
        'Anonymous';
    const initial = authorName.charAt(0).toUpperCase();
    const isReply = Boolean(comment?.parentComment);

    return (
        <div
            className={`group flex gap-3 py-3.5 px-4 transition-colors hover:bg-foreground/2 rounded-xl ${isReply ? 'ml-7 border-l border-border' : ''}`}
        >
            {/* Avatar / Initial */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {initial}
            </div>

            {/* Comment Body */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-foreground">
                            {authorName}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-muted/70">
                            <Clock className="h-2.5 w-2.5" />
                            {formatCommentTime(
                                comment?.createdAt
                            )}
                        </span>
                    </div>

                    {showDelete && (
                        <button
                            type="button"
                            onClick={() =>
                                onDelete?.(comment)
                            }
                            className="opacity-0 group-hover:opacity-100 p-1 text-muted transition-all hover:text-error hover:bg-error/10 rounded cursor-pointer"
                            aria-label="Delete comment"
                        >
                            <Trash2 className="h-3 w-3" />
                        </button>
                    )}
                </div>

                {/* Content */}
                <p className="mt-1 text-xs sm:text-sm text-foreground/90 leading-relaxed wrap-break-word whitespace-pre-wrap">
                    {comment?.content}
                </p>

                {/* Action buttons */}
                <div className="mt-2 flex items-center gap-3">
                    {/* Like button with glowing animation */}
                    <button
                        type="button"
                        onClick={handleLikeClick}
                        disabled={isLiking}
                        className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium transition-colors cursor-pointer ${
                            isLiked
                                ? 'text-red-500 bg-red-500/10'
                                : 'text-muted hover:text-red-500 hover:bg-red-500/10'
                        }`}
                        aria-label="Like comment"
                    >
                        <Heart
                            className={`h-3 w-3 transition-transform ${
                                isLiked
                                    ? 'fill-current'
                                    : ''
                            } ${isAnimating ? 'animate-heart-pop like-glow' : ''}`}
                        />
                        <span>{likeCount}</span>
                    </button>

                    {/* Replies can only target top-level comments. */}
                    {!isReply && (
                        <button
                            type="button"
                            onClick={() =>
                                onReply?.(comment)
                            }
                            className="inline-flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-primary cursor-pointer"
                            aria-label="Reply to comment"
                        >
                            <Reply className="h-3 w-3" />
                            <span>Reply</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentItem;
