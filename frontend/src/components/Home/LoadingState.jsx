/**
 * LoadingState — full-width loader for the Home page
 *
 * A quiet, centered spinner that matches the NEForum aesthetic.
 * Uses the brand primary colour (via CSS variables) so it
 * adapts to light / dark mode automatically.
 */

const LoadingState = () => {
    return (
        <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4">
            <span className="block h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-sm font-medium text-muted">
                Loading…
            </p>
        </div>
    );
};

export default LoadingState;
