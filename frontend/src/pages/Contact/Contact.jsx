import {
    Mail,
    Clock,
    MapPin,
    Send,
    MessageCircle,
} from 'lucide-react';

const currentYear = new Date().getFullYear();

/**
 * Contact — company page.
 *
 * Reached from the sidebar "Company" section. Provides the public ways to
 * get in touch, styled to match the rest of the forum.
 */
const Contact = () => {
    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
            {/* ── Masthead ── */}
            <header className="mb-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                    Get in touch
                </p>
                <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
                    Contact{' '}
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
                    Have a question about the forum, a bug
                    to report, or an idea to share? Reach
                    out — we would love to hear from you.
                </p>
            </header>

            {/* ── Contact grid ── */}
            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <h2 className="text-base font-medium text-foreground">
                            Email
                        </h2>
                    </div>
                    <p className="mt-3 text-sm text-muted">
                        <a
                            href="mailto:support@neforum.app"
                            className="text-foreground underline decoration-primary/30 underline-offset-2 hover:text-primary hover:decoration-primary"
                        >
                            support@neforum.app
                        </a>
                    </p>
                    <p className="mt-1 text-xs text-muted/70">
                        We aim to respond within 2 business
                        days.
                    </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <h2 className="text-base font-medium text-foreground">
                            Support hours
                        </h2>
                    </div>
                    <p className="mt-3 text-sm text-muted">
                        Mon &ndash; Fri, 09:00 &ndash; 18:00
                        (Nepal Time)
                    </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <h2 className="text-base font-medium text-foreground">
                            Based in
                        </h2>
                    </div>
                    <p className="mt-3 text-sm text-muted">
                        Kathmandu, Nepal
                    </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                        <Send className="h-5 w-5 text-primary" />
                        <h2 className="text-base font-medium text-foreground">
                            Say hello
                        </h2>
                    </div>
                    <p className="mt-3 text-sm text-muted">
                        Community discussion happens on the
                        forum itself — stay anonymous, stay
                        safe.
                    </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-5 sm:p-6 md:col-span-2">
                    <div className="flex items-center gap-3">
                        <MessageCircle className="h-5 w-5 text-primary" />
                        <h2 className="text-base font-medium text-foreground">
                            Report something
                        </h2>
                    </div>
                    <p className="mt-3 text-sm text-muted">
                        Found spam, abuse, or a bug? Open a
                        report from the post menu, or email{' '}
                        <a
                            href="mailto:support@neforum.app"
                            className="text-foreground underline decoration-primary/30 underline-offset-2 hover:text-primary hover:decoration-primary"
                        >
                            support@neforum.app
                        </a>
                        .
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

export default Contact;
