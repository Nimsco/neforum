import { useState } from 'react';
import { Send, Shield } from 'lucide-react';

const CommentComposer = ({
    isPosting,
    onCancelReply,
    onSubmit,
    replyTo,
}) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const text = content.trim();
        if (!text || isPosting) return;

        const posted = await onSubmit(text);
        if (posted) setContent('');
    };

    const replyAuthor =
        replyTo?.user?.username ||
        replyTo?.author?.username ||
        'Anonymous';
    const replyPreview = replyTo?.content?.trim();

    return (
        <form
            onSubmit={handleSubmit}
            className="shrink-0 border-t border-border bg-card/60 p-4"
        >
            {replyTo && (
                <div className="mb-3 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-muted">
                    <div className="flex items-center justify-between gap-3">
                        <span className="font-medium text-primary">
                            Replying to {replyAuthor}
                        </span>
                        <button
                            type="button"
                            onClick={onCancelReply}
                            className="shrink-0 cursor-pointer hover:text-foreground"
                        >
                            Cancel
                        </button>
                    </div>
                    {replyPreview && (
                        <p className="mt-1 line-clamp-2 whitespace-pre-wrap break-words text-foreground/80">
                            {replyPreview}
                        </p>
                    )}
                </div>
            )}

            <div className="relative">
                <textarea
                    value={content}
                    onChange={(event) =>
                        setContent(event.target.value)
                    }
                    placeholder="Write an anonymous comment..."
                    maxLength={1000}
                    rows={2}
                    className="input-focus-effect block w-full resize-none rounded-xl border border-border bg-background/80 px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted/50 outline-none leading-relaxed"
                />

                <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[11px] text-muted">
                        <Shield className="h-3 w-3 text-success" />
                        <span>Posting anonymously</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span
                            className={`text-[11px] ${
                                content.length > 950
                                    ? 'text-error font-medium'
                                    : 'text-muted/60'
                            }`}
                        >
                            {content.length}/1000
                        </span>
                        <button
                            type="submit"
                            disabled={
                                !content.trim() || isPosting
                            }
                            className="btn-primary inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3.5 py-1.5 text-xs font-semibold text-background transition-opacity hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                            <Send className="h-3 w-3" />
                            <span>
                                {isPosting
                                    ? 'Posting...'
                                    : replyTo
                                      ? 'Reply'
                                      : 'Comment'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CommentComposer;
