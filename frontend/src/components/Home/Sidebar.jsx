import { NavLink } from 'react-router-dom';
import {
    Home,
    Bookmark,
    Clock,
    GraduationCap,
    Briefcase,
    Lightbulb,
    Heart,
    Globe,
    Info,
    Mail,
    FileText,
} from 'lucide-react';

/**
 * Sidebar — left-hand navigation
 *
 * Two quiet groups: a few personal shortcuts and a short topic list.
 * Understated labels, no icons-as-decor, no counts shouting for attention.
 *
 * A third, visually separate group holds the company pages (About, Contact,
 * Reports) and closes with the NEForum® trademark.
 *
 * Hover behaviour on every item: darken the background slightly (black/10
 * works in both light & dark modes) while leaving the text colour untouched.
 */

const navItems = [
    { icon: Home, label: 'Home', to: '/', current: true },
    { icon: Bookmark, label: 'Saved', to: '/saved' },
    {
        icon: Clock,
        label: 'Recently viewed',
        to: '/recent',
    },
];

const topics = [
    { icon: GraduationCap, label: 'Education' },
    { icon: Briefcase, label: 'Careers & Work' },
    { icon: Lightbulb, label: 'Ideas' },
    { icon: Heart, label: 'Relationships' },
    { icon: Globe, label: 'Culture & Travel' },
];

// Company / trademark section — sits below the Topics, in its own group.
const companyItems = [
    { icon: Info, label: 'About', to: '/about' },
    { icon: Mail, label: 'Contact', to: '/contact' },
    { icon: FileText, label: 'Reports', to: '/reports' },
];

/** Shared classes for every clickable sidebar row. */
const itemBase =
    'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[0.95rem] transition-colors hover:bg-black/10';

const Sidebar = () => {
    return (
        <aside className="hidden lg:flex w-52 xl:w-56 shrink-0 flex-col gap-8 py-6 pr-6">
            {/* ── For you ── */}
            <div>
                <p className="mb-2.5 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    For you
                </p>
                <nav className="flex flex-col gap-1">
                    {navItems.map(
                        ({
                            icon: Icon,
                            label,
                            to,
                            current,
                        }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end
                                className={({ isActive }) =>
                                    `${itemBase} ${
                                        isActive || current
                                            ? 'text-foreground font-medium'
                                            : 'text-muted'
                                    }`
                                }
                            >
                                <Icon
                                    className="h-[18px] w-[18px] shrink-0"
                                    strokeWidth={1.75}
                                />
                                <span>{label}</span>
                            </NavLink>
                        )
                    )}
                </nav>
            </div>

            {/* ── Topics ── */}
            <div>
                <p className="mb-2.5 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    Topics
                </p>
                <nav className="flex flex-col gap-1">
                    {topics.map(({ icon: Icon, label }) => (
                        <button
                            key={label}
                            className={`${itemBase} text-left text-muted`}
                        >
                            <Icon
                                className="h-[18px] w-[18px] shrink-0"
                                strokeWidth={1.75}
                            />
                            <span className="truncate">
                                {label}
                            </span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* ── Company (separate section, with trademark) ── */}
            <div>
                <p className="mb-2.5 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    Company
                </p>
                <nav className="flex flex-col gap-1">
                    {companyItems.map(
                        ({ icon: Icon, label, to }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end
                                className={({ isActive }) =>
                                    `${itemBase} ${
                                        isActive
                                            ? 'text-foreground font-medium'
                                            : 'text-muted'
                                    }`
                                }
                            >
                                <Icon
                                    className="h-[18px] w-[18px] shrink-0"
                                    strokeWidth={1.75}
                                />
                                <span>{label}</span>
                            </NavLink>
                        )
                    )}
                </nav>

                {/* Trademark / brand mark */}
                <div className="mt-6 flex items-center gap-2 px-3">
                    <img
                        src="/logo.svg"
                        alt="NEForum logo"
                        className="h-4 w-4 object-contain"
                    />
                    <span className="text-xs text-muted">
                        &copy; {new Date().getFullYear()}{' '}
                        NEForum&reg; &middot; Nepal
                        Anonymous Forum
                    </span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
