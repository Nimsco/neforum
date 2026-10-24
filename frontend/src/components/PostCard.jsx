import { useState } from 'react';
import {
    Heart,
    MessageSquare,
    Bookmark,
    Share2,
    Trash2,
    Clock,
    ArrowUpRight,
} from 'lucide-react';

/**
 * Helper to display relative or localized post timestamp
 */
const formatPostTime = (dateStr) => {
    if (!dateStr) return '';
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
 * Unified PostCard Component
 *
 * Features glowing like animations, interactive save UI, comment triggers,
 * and modular prop callbacks.
 *
 * @param {object}   post       - The post data object
 * @param {boolean}  showDelete - Control visibility of the delete button (e.g. post.author === user?.id)
 * @param {function} onLike     - Callback when like button is clicked
 * @param {function} onComment  - Callback when comment button is clicked
 * @param {function} onSave     - Callback when save button is clicked
 * @param {function} onShare    - Callback when share button is clicked
 * @param {function} onDelete   - Callback when delete button is clicked
 * @param {function} onClick    - Callback when post card is clicked
 * @param {string}   className  - Extra styling classes
 */
const PostCard = ({
    post,
    showDelete = true,
    onLike,
    onComment,
    onSave,
    onShare,
    onDelete,
    onClick,
    className = '',
}) => {
    // Interactive local states for animations (falls back to post data if provided)
    const [isLiked, setIsLiked] = useState(
        post?.isLiked || false
    );
    const [likeCount, setLikeCount] = useState(
        post?.likeCount ?? post?.upvotes ?? 0
    );
    const [isLikeAnimating, setIsLikeAnimating] =
        useState(false);

    const [isSaved, setIsSaved] = useState(
        post?.isSaved || false
    );
    const [isSaveAnimating, setIsSaveAnimating] =
        useState(false);

    const handleLikeClick = (e) => {
        e.stopPropagation();
        const nextLiked = !isLiked;
        setIsLiked(nextLiked);
        setLikeCount((prev) =>
            nextLiked ? prev + 1 : Math.max(0, prev - 1)
        );
        setIsLikeAnimating(true);
        setTimeout(() => setIsLikeAnimating(false), 500);

        onLike?.({ ...post, isLiked: nextLiked });
    };

    const handleSaveClick = (e) => {
        e.stopPropagation();
        const nextSaved = !isSaved;
        setIsSaved(nextSaved);
        setIsSaveAnimating(true);
        setTimeout(() => setIsSaveAnimating(false), 500);

        onSave?.({ ...post, isSaved: nextSaved });
    };

    const timeDisplay =
        post?.time || formatPostTime(post?.createdAt);

    return (
        <div
            onClick={() => onClick?.(post)}
            className={`w-full rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md ${
                onClick ? 'cursor-pointer' : ''
            } ${className}`}
        >
            {/* ── Metadata row ── */}
            <div className="flex items-center justify-between gap-2 text-xs text-muted mb-2">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground/80">
                        {post?.topic || 'General'}
                    </span>
                    {post?.author?.username && (
                        <>
                            <span className="text-muted/40">
                                ·
                            </span>
                            <span>
                                @{post.author.username}
                            </span>
                        </>
                    )}
                </div>

                {timeDisplay && (
                    <span className="flex items-center gap-1 text-muted/70">
                        <Clock className="h-3 w-3" />
                        {timeDisplay}
                    </span>
                )}
            </div>

            {/* ── Title ── */}
            <h3 className="group flex items-start justify-between gap-3 text-base font-semibold leading-snug text-foreground transition-colors">
                <span className="wrap-break-word">
                    {post?.title}
                </span>
                <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-transparent transition-colors group-hover:text-muted" />
            </h3>

            {/* ── Content / Excerpt ── */}
            {post?.content && (
                <p className="mt-2 text-sm leading-relaxed text-muted/90 line-clamp-3 wrap-break-word">
                    {post.content}
                </p>
            )}

            {/* ── Actions Row ── */}
            <div className="mt-4 flex flex-wrap items-center gap-1 sm:gap-2 border-t border-border/60 pt-3">
                {/* Like Button with Glowing Heartbeat Animation */}
                <button
                    type="button"
                    onClick={handleLikeClick}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                        isLiked
                            ? 'text-red-500 bg-red-500/10 shadow-sm shadow-red-500/20'
                            : 'text-muted hover:bg-red-500/10 hover:text-red-500'
                    }`}
                    aria-label="Like post"
                >
                    <Heart
                        className={`h-3.5 w-3.5 transition-transform ${
                            isLiked
                                ? 'fill-current like-glow'
                                : ''
                        } ${isLikeAnimating ? 'animate-heart-pop' : ''}`}
                    />
                    <span>{likeCount}</span>
                </button>

                {/* Comment Button (triggers popup) */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onComment?.(post);
                    }}
                    className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-primary/10 hover:text-primary cursor-pointer"
                    aria-label="Comment on post"
                >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>
                        {post?.commentCount ??
                            post?.replies ??
                            0}
                    </span>
                </button>

                {/* Save Button with Bounce Animation */}
                <button
                    type="button"
                    onClick={handleSaveClick}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                        isSaved
                            ? 'text-primary bg-primary/10 shadow-sm shadow-primary/20 font-semibold'
                            : 'text-muted hover:bg-primary/10 hover:text-primary'
                    }`}
                    aria-label="Save post"
                >
                    <Bookmark
                        className={`h-3.5 w-3.5 transition-transform ${
                            isSaved
                                ? 'fill-current save-glow'
                                : ''
                        } ${isSaveAnimating ? 'animate-bookmark-bounce' : ''}`}
                    />
                    <span>
                        {isSaved ? 'Saved' : 'Save'}
                    </span>
                </button>

                {/* Share Button */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onShare?.(post);
                    }}
                    className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-foreground/10 hover:text-foreground cursor-pointer"
                    aria-label="Share post"
                >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Share</span>
                </button>

                {/* Delete Button (Controlled by showDelete) */}
                {showDelete && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete?.(post);
                        }}
                        className="ml-auto flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-error/10 hover:text-error cursor-pointer"
                        aria-label="Delete post"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Delete</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default PostCard;
