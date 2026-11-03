import {
    Heart,
    MessageSquare,
    Clock,
    ArrowUpRight,
} from 'lucide-react';

/**
 * ProfileCommentCard
 *
 * Displays a single comment authored by the profile user.
 *
 * @param {object} comment — A user's comment with populated post and parent context.
 */

const ProfileCommentCard = ({ comment, onClick }) => {
    const timeAgo = comment?.createdAt
        ? new Date(comment.createdAt).toLocaleDateString(
              'en-US',
              {
                  month: 'short',
                  day: 'numeric',
              }
          )
        : '';

    const postTitle =
        comment?.post && typeof comment.post === 'object'
            ? comment.post.title
            : null;
    const parentContent =
        comment?.parentComment &&
        typeof comment.parentComment === 'object'
            ? comment.parentComment.content
            : null;
    const postCommentCount =
        comment?.post && typeof comment.post === 'object'
            ? comment.post.commentCount
            : undefined;

    return (
        <div
            onClick={onClick}
            onKeyDown={(event) => {
                if (
                    event.key === 'Enter' ||
                    event.key === ' '
                ) {
                    event.preventDefault();
                    onClick?.();
                }
            }}
            role={onClick ? 'link' : undefined}
            tabIndex={onClick ? 0 : undefined}
            className={`w-full rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md ${onClick ? 'cursor-pointer hover:border-primary/30' : ''}`}
        >
            {/* Reference to parent post */}
            <div className="mb-3 flex items-center gap-1 text-xs text-primary font-medium">
                <ArrowUpRight className="h-3 w-3 shrink-0" />
                <span className="line-clamp-1">
                    {postTitle || 'A post you commented on'}
                </span>
            </div>

            {parentContent && (
                <div className="mb-3 rounded-lg border-l-2 border-primary/40 bg-background/70 px-3 py-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                        Replying to
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-muted">
                        {parentContent}
                    </p>
                </div>
            )}

            {/* Comment body */}
            <p className="text-sm text-foreground whitespace-pre-wrap wrap-break-word">
                {comment?.content}
            </p>

            {/* Meta row */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
                <span
                    className="flex items-center gap-1"
                    title="Likes on your comment"
                >
                    <Heart className="h-3.5 w-3.5" />
                    {comment?.likeCount ?? 0}
                    <span>likes</span>
                </span>
                <span
                    className="flex items-center gap-1"
                    title="Comments on the post"
                >
                    <MessageSquare className="h-3.5 w-3.5" />
                    {postCommentCount ?? '—'}
                    <span>post comments</span>
                </span>
                <span className="ml-auto flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {timeAgo}
                </span>
            </div>
        </div>
    );
};

export default ProfileCommentCard;
