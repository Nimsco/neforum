import { X, MessageSquare } from 'lucide-react';

/**
 * CommentHeader
 *
 * Header for the comment popup modal.
 * Shows the comment count, related post title, and an animated close button.
 */
const CommentHeader = ({
    post,
    commentCount = 0,
    onClose,
}) => {
    return (
        <div className="flex flex-col border-b border-border px-5 py-4 shrink-0">
            {/* Top row: Icon, heading, and Close button */}
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <MessageSquare className="h-4 w-4" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-base font-semibold text-foreground">
                                Comments
                            </h2>
                            <span className="inline-flex items-center rounded-full bg-foreground/10 px-2 py-0.5 text-xs font-medium text-foreground">
                                {commentCount}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Animated Close button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-all hover:bg-foreground/10 hover:text-foreground hover:rotate-90 cursor-pointer"
                    aria-label="Close comments"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>

            {/* Post title context */}
            {post?.title && (
                <div className="mt-2 text-xs text-muted">
                    <span>On: </span>
                    <span className="font-medium text-foreground/85 line-clamp-1">
                        &ldquo;{post.title}&rdquo;
                    </span>
                </div>
            )}
        </div>
    );
};

export default CommentHeader;
