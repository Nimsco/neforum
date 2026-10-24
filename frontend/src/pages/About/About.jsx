import { Globe, Users, Shield } from 'lucide-react';

const currentYear = new Date().getFullYear();

/**
 * About — company page.
 *
 * Reached from the sidebar "Company" section. Stays understated and
 * matches the Home page aesthetic (kicker, muted body text, card rows).
 */
const About = () => {
    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
            {/* ── Masthead ── */}
            <header className="mb-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                    The common room
                </p>
                <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
                    About{' '}
                    <span className="text-primary">
                        NEForum
                    </span>
                    <span
                        aria-hidden="true"
                        className="text-xs font-normal opacity-80"
                    >
                        ®
                    </span>
                </h1>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
                    NEForum is a completely anonymous
                    discussion forum built for Nepali users.
                    Share thoughts, opinions, questions and
                    experiences without publicly revealing
                    your real identity.
                </p>
            </header>

            {/* ── Pillars ── */}
            <div className="space-y-6">
                <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-primary" />
                        <h2 className="text-base font-medium text-foreground">
                            Our mission
                        </h2>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                        Say the thing you would not say on
                        your name. NEForum focuses on{' '}
                        <strong>
                            content and conversation
                        </strong>{' '}
                        rather than profiles, followers and
                        personal branding.{' '}
                        <strong>
                            Anonymity should encourage
                            conversation, not remove
                            responsibility.
                        </strong>
                    </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-primary" />
                        <h2 className="text-base font-medium text-foreground">
                            Who we serve
                        </h2>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                        A space for Nepali internet users to
                        discuss Nepal-related topics,
                        education, jobs, technology, gaming,
                        movies, relationships, life
                        experiences, memes and more — in
                        English or Nepali, in whichever
                        language they are most comfortable
                        with.
                    </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-primary" />
                        <h2 className="text-base font-medium text-foreground">
                            Privacy by design
                        </h2>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                        Accounts use a username and password
                        only — no real name is required.
                        Your real-world identity stays
                        yours. See our{' '}
                        <a
                            href="/reports"
                            className="text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
                        >
                            transparency report
                        </a>{' '}
                        for how we handle your data.
                    </p>
                </div>
            </div>

            {/* ── Trademark / copyright ── */}
            <div className="mt-10 flex items-center justify-center gap-2 text-xs text-muted">
                <span>
                    © {currentYear} NEForum®. Nepal
                    Anonymous Forum.
                </span>
            </div>
        </div>
    );
};

export default About;
