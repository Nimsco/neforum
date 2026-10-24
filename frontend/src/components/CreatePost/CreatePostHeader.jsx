import { Link } from 'react-router-dom';
import { ArrowLeft, PenLine } from 'lucide-react';

const CreatePostHeader = () => {
    return (
        <div className="mb-8">
            {/* ── Back link ── */}
            <Link
                to="/"
                className="group mb-6 inline-flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
            >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                Back to feed
            </Link>

            {/* ── Page title & icon ── */}
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground">
                    <PenLine className="h-5 w-5 text-background" />
                </div>
                <div>
                    <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                        Create a post
                    </h1>
                    <p className="mt-0.5 text-sm text-muted">
                        Share your thoughts anonymously
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CreatePostHeader;
