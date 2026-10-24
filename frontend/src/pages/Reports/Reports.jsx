import {
    ShieldCheck,
    Users,
    BarChart2,
} from 'lucide-react';

const currentYear = new Date().getFullYear();

const ReportSection = ({ icon: Icon, title, children }) => (
    <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
        <div className="flex items-center gap-3">
            <Icon className="h-5 w-5 text-primary" />
            <h2 className="text-base font-medium text-foreground">
                {title}
            </h2>
        </div>
        <div className="mt-3 space-y-3 text-sm text-muted not-last:mb-0">
            {children}
        </div>
    </div>
);

/**
 * Reports — transparency page.
 *
 * Reached from the sidebar "Company" section. Explains how NEForum balances
 * anonymity with community responsibility.
 */
const Reports = () => {
    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
            {/* ── Masthead ── */}
            <header className="mb-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                    Transparency
                </p>
                <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
                    Transparency Report
                </h1>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
                    NEForum is built around anonymity and
                    responsibility. This page shares how we
                    keep the space safe while protecting
                    your identity.
                </p>
            </header>

            {/* ── Sections ── */}
            <div className="space-y-6">
                <ReportSection
                    icon={ShieldCheck}
                    title="Moderation"
                >
                    <p>
                        Posts and comments are reviewed
                        against our community guidelines.
                        Action is taken on repeated or
                        serious violations, with appeals
                        handled through support.
                    </p>
                    <p>
                        We do not tie moderation decisions
                        to your real-world identity — flags
                        and actions operate under your forum
                        username only.
                    </p>
                </ReportSection>

                <ReportSection
                    icon={Users}
                    title="Community"
                >
                    <p>
                        NEForum exists to host conversation,
                        not to build personal profiles. We
                        collect no real names, no phone
                        numbers, and no public follower
                        graphs.
                    </p>
                    <p>
                        Read more in our{' '}
                        <a
                            href="/about"
                            className="text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
                        >
                            About
                        </a>{' '}
                        page.
                    </p>
                </ReportSection>

                <ReportSection
                    icon={BarChart2}
                    title="At a glance"
                >
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs uppercase tracking-wider text-muted">
                        <span>Community</span>
                        <span className="text-foreground">
                            Nepal &amp; global
                        </span>
                        <span>Identity model</span>
                        <span className="text-foreground">
                            Pseudonymous
                        </span>
                        <span>Real data collected</span>
                        <span className="text-foreground">
                            None
                        </span>
                        <span>Ads</span>
                        <span className="text-foreground">
                            None
                        </span>
                        <span>Monetisation</span>
                        <span className="text-foreground">
                            None
                        </span>
                    </div>
                </ReportSection>
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

export default Reports;
