import { Type, AlignLeft } from 'lucide-react';

const CreatePostEditor = ({
    title = '',
    setTitle,
    content = '',
    setContent,
    onChange,
}) => {
    const handleTitleChange = (e) => {
        if (onChange) onChange(e);
        if (setTitle) setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        if (onChange) onChange(e);
        if (setContent) setContent(e.target.value);
    };

    return (
        <div className="space-y-5">
            {/* Title field */}
            <div>
                <label
                    htmlFor="post-title"
                    className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted"
                >
                    <Type className="h-3.5 w-3.5" />
                    Title
                </label>
                <input
                    id="post-title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="What's on your mind?"
                    maxLength={100}
                    className="input-focus-effect block w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-[15px] font-medium text-foreground placeholder:text-muted/40 outline-none"
                />
                <div className="mt-1.5 flex justify-end">
                    <span
                        className={`text-xs ${
                            title.length > 90
                                ? 'text-error'
                                : 'text-muted/60'
                        }`}
                    >
                        {title.length}/100
                    </span>
                </div>
            </div>

            {/* Content field */}
            <div>
                <label
                    htmlFor="post-content"
                    className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted"
                >
                    <AlignLeft className="h-3.5 w-3.5" />
                    Content
                </label>
                <textarea
                    id="post-content"
                    name="content"
                    value={content}
                    onChange={handleContentChange}
                    placeholder="Elaborate on your thoughts..."
                    maxLength={3000}
                    rows={10}
                    className="input-focus-effect block w-full resize-none rounded-xl border border-border bg-background/60 px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted/40 outline-none"
                />
                <div className="mt-1.5 flex justify-end">
                    <span
                        className={`text-xs ${
                            content.length > 2900
                                ? 'text-error'
                                : 'text-muted/60'
                        }`}
                    >
                        {content.length}/3000
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CreatePostEditor;
