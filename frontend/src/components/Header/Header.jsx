import { Link } from 'react-router-dom';
import { Search, Command } from 'lucide-react';

/**
 * Header — Top navigation bar
 *
 * Logo + Search bar + "What is NEForum?" link + Login / Join buttons.
 * No theme-switch button — the user will add that later.
 */

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
                {/* ── Left: Logo ── */}
                <Link
                    to="/"
                    className="logo-hover flex shrink-0 items-center gap-2.5 outline-none"
                    aria-label="NEForum Home"
                >
                    <img
                        src="/logo.svg"
                        alt="NEForum logo"
                        className="h-10 w-10 object-contain"
                    />
                    <span className="text-xl font-bold tracking-tight text-foreground">
                        NEForum
                        <span className="text-primary">
                            .
                        </span>
                    </span>
                </Link>

                {/* ── Center: Search Bar ── */}
                <div className="hidden sm:flex flex-1 max-w-md mx-4">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                        <input
                            type="text"
                            placeholder="Find a conversation..."
                            className="input-focus-effect w-full rounded-lg border border-border bg-background py-2 pl-9 pr-12 text-sm text-foreground placeholder:text-muted/60"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-muted/50">
                            <Command className="h-3 w-3" />
                            <span className="text-[11px] font-medium">
                                K
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── Right: Profile ── */}
                <div className="flex items-center gap-3">
                    <Link
                        to="/profile"
                        aria-label="Your profile"
                        className="shrink-0 outline-none"
                    >
                        <img
                            src="/default-profile-picture.webp"
                            alt="Profile"
                            className="h-9 w-9 rounded-full object-cover ring-1 ring-border transition-shadow hover:ring-2 hover:ring-borderHover"
                        />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
