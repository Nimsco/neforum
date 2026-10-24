const CreatePostPreview = ({
    title = '',
    content = '',
}) => {
    return (
        <div className="min-h-70 rounded-xl border border-border bg-background/40 p-6">
            {title || content ? (
                <>
                    {title && (
                        <h2 className="text-lg font-semibold text-foreground wrap-break-word">
                            {title}
                        </h2>
                    )}
                    {content && (
                        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground/80 wrap-break-word">
                            {content}
                        </p>
                    )}
                </>
            ) : (
                <div className="flex h-full min-h-60 items-center justify-center">
                    <p className="text-sm text-muted/60">
                        Nothing to preview yet — start
                        writing!
                    </p>
                </div>
            )}
        </div>
    );
};

export default CreatePostPreview;
