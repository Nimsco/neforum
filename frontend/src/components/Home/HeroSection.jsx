import { PenLine } from 'lucide-react';

/**
 * HeroSection — quiet masthead
 *
 * A single understated band: kicker, one-line headline with a single
 * accent word, and a slim "new post" action. The live presence count
 * from the old ActiveUsersBar now lives here so we don't need a whole
 * extra strip.
 */

const HeroSection = () => {
    return (
        <section className="border-b border-border pb-7 pt-8 lg:pt-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                Nepal&apos;s anonymous common room
            </p>

            <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
                Ideas, not{' '}
                <span className="italic text-primary">
                    identities.
                </span>
            </h1>

            <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
                Say the thing you wouldn&apos;t say on your
                name. No logins, no faces — just the
                conversation.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4">
                <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80">
                    <PenLine className="h-4 w-4" />
                    New post
                </button>

                {/* quiet live presence, no pinging */}
                <span className="inline-flex items-center gap-2 text-xs text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    286 minds here right now
                </span>
            </div>
        </section>
    );
};

export default HeroSection;
