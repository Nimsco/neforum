/**
 * CommunityCard — a single quiet note in the right rail
 *
 * One small card, no stats, no button. Just a short, warm reminder of
 * what the space is for.
 */

const CommunityCard = () => {
    return (
        <aside className="hidden xl:block w-64 pt-6">
            <div className="rounded-xl border border-border p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                    The common room
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                    A whole country, a little closer. Share
                    what&apos;s on your mind — your name
                    stays yours.
                </p>
            </div>
        </aside>
    );
};

export default CommunityCard;
