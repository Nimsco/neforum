import {
    Heart,
    Reply,
    Clock,
    ArrowUpRight,
} from 'lucide-react';

/**
 * ProfileCommentCard
 *
 * Displays a single comment authored by the profile user.
 *
 * @param {object} comment — { _id, content, likeCount, replyCount, createdAt, post }
 *                           `post` can be a populated object with { title } or just an id.
 */

const ProfileCommentCard = ({ comment }) => {
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
        typeof comment?.post === 'object'
            ? comment.post.title
            : null;

    return (
        <div className="w-full rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
            {/* Reference to parent post */}
            {postTitle && (
                <div className="mb-2 flex items-center gap-1 text-xs text-primary font-medium">
                    <ArrowUpRight className="h-3 w-3" />
                    <span className="line-clamp-1">
                        {postTitle}
                    </span>
                </div>
            )}

            {/* Comment body */}
            <p className="text-sm text-foreground line-clamp-3">
                {comment?.content}
            </p>

            {/* Meta row */}
            <div className="mt-3 flex items-center gap-4 text-xs text-muted">
                <span className="flex items-center gap-1">
                    <Heart className="h-3.5 w-3.5" />
                    {comment?.likeCount ?? 0}
                </span>
                <span className="flex items-center gap-1">
                    <Reply className="h-3.5 w-3.5" />
                    {comment?.replyCount ?? 0}
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
