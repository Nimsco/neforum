import { Heart, MessageSquare, Clock } from 'lucide-react';

/**
 * ProfilePostCard
 *
 * Displays a single post authored by the profile user.
 *
 * @param {object} post — { _id, title, content, likeCount, commentCount, createdAt }
 */

const ProfilePostCard = ({ post }) => {
    const timeAgo = post?.createdAt
        ? new Date(post.createdAt).toLocaleDateString(
              'en-US',
              {
                  month: 'short',
                  day: 'numeric',
              }
          )
        : '';

    return (
        <div className="w-full rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
            {/* Title */}
            <h3 className="text-base font-semibold text-foreground line-clamp-1">
                {post?.title}
            </h3>

            {/* Excerpt */}
            <p className="mt-1.5 text-sm text-muted line-clamp-2">
                {post?.content}
            </p>

            {/* Meta row */}
            <div className="mt-3 flex items-center gap-4 text-xs text-muted">
                <span className="flex items-center gap-1">
                    <Heart className="h-3.5 w-3.5" />
                    {post?.likeCount ?? 0}
                </span>
                <span className="flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" />
                    {post?.commentCount ?? 0}
                </span>
                <span className="ml-auto flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {timeAgo}
                </span>
            </div>
        </div>
    );
};

export default ProfilePostCard;
