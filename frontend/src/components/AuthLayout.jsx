import { Link, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';

/**
 * AuthLayout
 *
 * Distinctive two-column editorial split layout for Login / Register:
 * - Left side: Huge aesthetic NEForum logo exhibition with ambient aura & wobble hover
 * - Right side: Authentication form card with smooth route transitions
 * - Background: Floating anonymous visual elements + omnidirectional wandering hood
 */

const AuthLayout = ({ children }) => {
    const { pathname } = useLocation();
    const isLogin = pathname === '/login';

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-background px-4 sm:px-6 lg:px-12 py-10 selection:bg-primary/20 overflow-x-hidden">
            {/* Animated background */}
            <AnimatedBackground />

            {/* ── Content Container (Split Layout) ── */}
            <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10 lg:gap-16 xl:gap-24">
                {/* ── Left Side: Huge NEForum Logo Exhibition ── */}
                <div className="flex flex-col items-center justify-center flex-1 text-center animate-slide-down">
                    <Link
                        to="/"
                        className="logo-hover group relative flex items-center justify-center outline-none transition-transform duration-300 hover:scale-105"
                        aria-label="NEForum Home"
                    >
                        {/* Subtle ambient aura behind logo */}
                        <div className="absolute -inset-6 sm:-inset-10 rounded-full bg-primary/10 blur-3xl -z-10 animate-pulse-dot" />

                        <img
                            src="/logo.svg"
                            alt="NEForum logo"
                            className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-96 lg:h-96 xl:w-[420px] xl:h-[420px] object-contain drop-shadow-2xl select-none"
                        />
                    </Link>

                    <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-widest text-muted font-medium">
                        <Shield className="h-4 w-4 text-primary" strokeWidth={2} />
                        <span>Speak freely · Stay anonymous</span>
                    </div>
                </div>

                {/* ── Right Side: Form Card ── */}
                <div className="w-full max-w-[420px] sm:max-w-[440px] flex flex-col items-center flex-shrink-0">
                    {/* ── Navigation pills ── */}
                    <div
                        className="mb-6 flex w-full max-w-xs justify-center gap-1 rounded-full border border-border bg-card/60 p-1 backdrop-blur-sm animate-slide-down"
                        style={{ animationDelay: '0.05s' }}
                    >
                        <Link
                            to="/login"
                            className={`flex-1 text-center rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                                isLogin
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'text-muted hover:text-foreground'
                            }`}
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className={`flex-1 text-center rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                                !isLogin
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'text-muted hover:text-foreground'
                            }`}
                        >
                            Register
                        </Link>
                    </div>

                    {/* ── Form card ── */}
                    <div
                        key={pathname}
                        className="w-full animate-slide-up rounded-2xl border border-border bg-card p-7 sm:p-9 shadow-sm"
                        style={{ animationDelay: '0.1s' }}
                    >
                        {children}
                    </div>

                    {/* ── Footer ── */}
                    <p
                        className="mt-6 text-center text-[11px] text-muted/60 animate-slide-up"
                        style={{ animationDelay: '0.2s' }}
                    >
                        By continuing you agree to NEForum&apos;s community
                        guidelines.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
