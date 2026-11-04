import {
    ArrowUpRight,
    Compass,
    Home,
    MessageCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const signalSquares = [
    { x: 80, y: 92, delay: '0s' },
    { x: 476, y: 102, delay: '0.7s' },
    { x: 148, y: 304, delay: '1.4s' },
    { x: 422, y: 260, delay: '2.1s' },
    { x: 288, y: 54, delay: '2.8s' },
    { x: 520, y: 338, delay: '3.5s' },
];

const NotFound = () => {
    return (
        <main className="relative flex min-h-[calc(100vh-3.5rem)] items-center overflow-hidden bg-background px-4 py-12 text-foreground sm:px-6">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
            />

            <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
                <div className="relative isolate flex min-h-[330px] items-center justify-center overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm sm:min-h-[440px]">
                    {/* Animated grid treatment adapted from Magic UI's Animated Grid Pattern. */}
                    <svg
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 h-full w-full text-primary"
                        viewBox="0 0 600 400"
                        preserveAspectRatio="xMidYMid slice"
                    >
                        <defs>
                            <pattern
                                id="not-found-grid"
                                width="40"
                                height="40"
                                patternUnits="userSpaceOnUse"
                            >
                                <path
                                    d="M 40 0 L 0 0 0 40"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeOpacity="0.12"
                                    strokeWidth="1"
                                />
                            </pattern>
                            <radialGradient id="not-found-fade">
                                <stop
                                    offset="0%"
                                    stopColor="white"
                                    stopOpacity="1"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="white"
                                    stopOpacity="0.12"
                                />
                            </radialGradient>
                            <mask id="not-found-grid-mask">
                                <rect
                                    width="600"
                                    height="400"
                                    fill="url(#not-found-fade)"
                                />
                            </mask>
                        </defs>
                        <rect
                            width="600"
                            height="400"
                            fill="url(#not-found-grid)"
                            mask="url(#not-found-grid-mask)"
                        />
                        {signalSquares.map(
                            ({ x, y, delay }) => (
                                <rect
                                    key={`${x}-${y}`}
                                    className="not-found-signal-square"
                                    x={x}
                                    y={y}
                                    width="10"
                                    height="10"
                                    rx="2"
                                    fill="currentColor"
                                    style={{
                                        animationDelay:
                                            delay,
                                    }}
                                />
                            )
                        )}
                    </svg>

                    <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted backdrop-blur sm:left-7 sm:top-7">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Signal lost
                    </span>

                    <div className="absolute right-5 top-5 rotate-6 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-bold tracking-[0.2em] text-primary sm:right-8 sm:top-8">
                        404
                    </div>

                    <div className="relative flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80">
                        <div className="not-found-orbit absolute inset-2 rounded-full border border-dashed border-primary/25" />
                        <div className="absolute inset-9 rounded-full border border-primary/15" />
                        <div className="absolute inset-[4.5rem] rounded-full bg-primary/5 blur-xl" />
                        <div className="relative flex h-28 w-28 items-center justify-center rounded-[2rem] border border-primary/20 bg-card text-primary shadow-[0_18px_60px_-24px_rgba(37,99,235,0.55)] sm:h-32 sm:w-32">
                            <Compass
                                className="h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]"
                                strokeWidth={1.2}
                            />
                            <span className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-background text-foreground shadow-md">
                                <MessageCircle
                                    className="h-5 w-5"
                                    strokeWidth={1.6}
                                />
                            </span>
                        </div>

                        <span className="absolute left-5 top-16 h-2.5 w-2.5 rounded-full bg-primary/60 shadow-[0_0_18px_rgba(37,99,235,0.6)] sm:left-7 sm:top-20" />
                        <span className="absolute bottom-12 right-4 h-3 w-3 rounded-full border-2 border-primary/50 bg-card sm:bottom-16 sm:right-5" />
                        <span className="absolute bottom-6 left-20 h-1.5 w-1.5 rounded-full bg-primary/40 sm:bottom-8 sm:left-24" />
                    </div>

                    <span className="absolute bottom-5 left-5 font-mono text-[10px] tracking-[0.16em] text-muted/60 sm:bottom-7 sm:left-7">
                        COORDINATES: UNKNOWN
                    </span>
                    <ArrowUpRight
                        aria-hidden="true"
                        className="absolute bottom-6 right-6 h-5 w-5 text-muted/40 sm:bottom-8 sm:right-8"
                    />
                </div>

                <section className="max-w-xl md:py-8">
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        <span className="h-px w-7 bg-primary/50" />
                        Page not found
                    </p>
                    <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        Looks like this thread
                        <span className="mt-1 block text-primary">
                            got away.
                        </span>
                    </h1>
                    <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                        The page may have moved, or the link
                        might be off the map. Let’s get you
                        back to the conversation.
                    </p>

                    <Link
                        to="/"
                        className="btn-primary mt-8 inline-flex items-center gap-2.5 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-sm transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                    >
                        <Home className="h-4 w-4" />
                        Back to the forum
                    </Link>

                    <p className="mt-5 text-xs text-muted/70">
                        Lost your way? The home feed is
                        always a good place to start.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default NotFound;
