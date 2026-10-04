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
} from 'lucide-react';

/**
 * Sidebar — left-hand navigation
 *
 * Two quiet groups: a few personal shortcuts and a short topic list.
 * Understated labels, no icons-as-decor, no counts shouting for attention.
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
                                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-[0.95rem] transition-colors ${
                                        isActive || current
                                            ? 'text-foreground'
                                            : 'text-muted hover:text-foreground'
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
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[0.95rem] text-muted transition-colors hover:text-foreground"
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
        </aside>
    );
};

export default Sidebar;
