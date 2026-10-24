import { PenLine, Eye } from 'lucide-react';

const CreatePostTabs = ({ isPreview, setIsPreview }) => {
    return (
        <div className="mb-6 flex items-center gap-1 rounded-lg border border-border bg-background p-1">
            <button
                type="button"
                onClick={() => setIsPreview(false)}
                className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    !isPreview
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted hover:text-foreground'
                }`}
            >
                <PenLine className="h-3.5 w-3.5" />
                Write
            </button>
            <button
                type="button"
                onClick={() => setIsPreview(true)}
                className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    isPreview
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted hover:text-foreground'
                }`}
            >
                <Eye className="h-3.5 w-3.5" />
                Preview
            </button>
        </div>
    );
};

export default CreatePostTabs;
