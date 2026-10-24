import { MessageCircle } from 'lucide-react';

/**
 * CommentEmptyState
 *
 * Friendly, quiet placeholder when no comments have been posted yet.
 */
const CommentEmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/5 text-muted/60 mb-3">
                <MessageCircle className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold text-foreground">
                No comments yet
            </p>
            <p className="mt-1 max-w-xs text-xs text-muted leading-relaxed">
                Start the conversation! Your thoughts remain
                anonymous.
            </p>
        </div>
    );
};

export default CommentEmptyState;
