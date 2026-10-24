import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';

const CreatePostActions = ({ isSubmitting = false }) => {
    return (
        <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
            {/* Guidelines hint */}
            <p className="text-xs text-muted/60">
                Be respectful. No personal info. Keep it
                real.
            </p>

            {/* Action buttons */}
            <div className="flex w-full items-center gap-3 sm:w-auto">
                <Link
                    to="/"
                    className="flex-1 rounded-xl border border-border px-5 py-2.5 text-center text-sm font-medium text-muted transition-colors hover:border-foreground/20 hover:text-foreground sm:flex-initial"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary flex flex-1 items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-80 disabled:opacity-50 sm:flex-initial cursor-pointer"
                >
                    <Send className="h-4 w-4" />
                    {isSubmitting
                        ? 'Publishing...'
                        : 'Publish'}
                </button>
            </div>
        </div>
    );
};

export default CreatePostActions;
