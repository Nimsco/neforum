import { MessageCircle, User, Hash, AtSign, Eye } from 'lucide-react';

/**
 * AnimatedBackground
 *
 * Renders a fixed, full-viewport layer of slowly drifting anonymous-themed
 * elements: speech bubbles, silhouettes, dots, conversation symbols, and
 * "Anonymous" text.  Plus one hood character that crosses the screen.
 *
 * Everything is pointer-events-none so it never interferes with the form.
 */

/* ── Inline SVG components (keeps bundle small, no extra assets) ── */

const SpeechBubble = ({ className = '' }) => (
    <svg
        viewBox="0 0 48 40"
        fill="none"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M4 4h40v24H18l-8 8v-8H4V4z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill="none"
        />
        <line
            x1="12"
            y1="13"
            x2="36"
            y2="13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.5"
        />
        <line
            x1="12"
            y1="19"
            x2="28"
            y2="19"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.5"
        />
    </svg>
);

const AnonSilhouette = ({ className = '' }) => (
    <svg
        viewBox="0 0 40 52"
        fill="none"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle
            cx="20"
            cy="16"
            r="10"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
        />
        <path
            d="M4 48c0-8.837 7.163-16 16-16s16 7.163 16 16"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
        />
        <text
            x="20"
            y="19"
            textAnchor="middle"
            fill="currentColor"
            fontSize="8"
            fontFamily="sans-serif"
            opacity="0.6"
        >
            ?
        </text>
    </svg>
);

const HoodCharacter = ({ className = '' }) => (
    <svg
        viewBox="0 0 64 72"
        fill="none"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Hood */}
        <path
            d="M12 38C12 20 20 8 32 8s20 12 20 30"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
        />
        {/* Hood rim/shadow */}
        <path
            d="M8 40c0 0 4-4 24-4s24 4 24 4"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
        />
        {/* Face shadow (anonymous darkness) */}
        <ellipse
            cx="32"
            cy="34"
            rx="14"
            ry="10"
            fill="currentColor"
            opacity="0.15"
        />
        {/* Eyes - just two small glowing dots */}
        <circle cx="26" cy="32" r="2" fill="currentColor" opacity="0.7" />
        <circle cx="38" cy="32" r="2" fill="currentColor" opacity="0.7" />
        {/* Shoulders */}
        <path
            d="M10 42c0 0 6 14 22 14s22-14 22-14"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
        />
    </svg>
);

/* ── Floating elements data ───────────────────────────────────────── */
const BUBBLES = [
    {
        top: '8%',
        left: '5%',
        size: 'w-10 h-10',
        delay: '0s',
        duration: '9s',
    },
    {
        top: '22%',
        right: '8%',
        size: 'w-8 h-8',
        delay: '2s',
        duration: '11s',
    },
    {
        top: '65%',
        left: '3%',
        size: 'w-12 h-12',
        delay: '4s',
        duration: '10s',
    },
    {
        top: '78%',
        right: '6%',
        size: 'w-9 h-9',
        delay: '1s',
        duration: '8s',
    },
    {
        top: '40%',
        left: '8%',
        size: 'w-7 h-7',
        delay: '6s',
        duration: '13s',
    },
];

const SILHOUETTES = [
    {
        top: '12%',
        right: '15%',
        size: 'w-8 h-10',
        delay: '3s',
        duration: '14s',
    },
    {
        top: '55%',
        left: '12%',
        size: 'w-7 h-9',
        delay: '7s',
        duration: '11s',
    },
    {
        top: '85%',
        right: '20%',
        size: 'w-6 h-8',
        delay: '1s',
        duration: '12s',
    },
];

const DOTS = [
    { top: '15%', left: '20%', delay: '0s', duration: '5s' },
    { top: '30%', right: '25%', delay: '1.5s', duration: '4s' },
    { top: '50%', left: '85%', delay: '3s', duration: '6s' },
    { top: '70%', left: '15%', delay: '0.5s', duration: '3.5s' },
    { top: '45%', right: '12%', delay: '2s', duration: '5.5s' },
    { top: '88%', left: '45%', delay: '4s', duration: '4.5s' },
    { top: '5%', left: '60%', delay: '1s', duration: '7s' },
    { top: '60%', right: '35%', delay: '3.5s', duration: '5s' },
];

const LABELS = [
    { text: 'Anonymous', top: '18%', left: '70%', delay: '2s', duration: '15s' },
    { text: 'Anon_42', top: '72%', left: '8%', delay: '5s', duration: '13s' },
    { text: 'Unknown', top: '35%', right: '5%', delay: '0s', duration: '16s' },
    { text: '? ? ?', top: '90%', right: '30%', delay: '3s', duration: '12s' },
];

const SYMBOLS = [
    {
        icon: Hash,
        top: '25%',
        left: '92%',
        delay: '1s',
        duration: '10s',
    },
    {
        icon: AtSign,
        top: '60%',
        right: '90%',
        delay: '4s',
        duration: '12s',
    },
    {
        icon: MessageCircle,
        top: '80%',
        left: '75%',
        delay: '2s',
        duration: '9s',
    },
    {
        icon: Eye,
        top: '10%',
        left: '40%',
        delay: '6s',
        duration: '14s',
    },
];

const AnimatedBackground = () => {
    return (
        <div
            className="pointer-events-none fixed inset-0 overflow-hidden"
            aria-hidden="true"
        >
            {/* ── Speech bubbles ── */}
            {BUBBLES.map((b, i) => (
                <div
                    key={`bubble-${i}`}
                    className={`absolute text-foreground/[0.06] animate-drift ${b.size}`}
                    style={{
                        top: b.top,
                        left: b.left,
                        right: b.right,
                        '--drift-delay': b.delay,
                        '--drift-duration': b.duration,
                    }}
                >
                    <SpeechBubble className="w-full h-full" />
                </div>
            ))}

            {/* ── Silhouettes ── */}
            {SILHOUETTES.map((s, i) => (
                <div
                    key={`sil-${i}`}
                    className={`absolute text-foreground/[0.05] animate-drift-slow ${s.size}`}
                    style={{
                        top: s.top,
                        left: s.left,
                        right: s.right,
                        '--drift-delay': s.delay,
                        '--drift-duration': s.duration,
                    }}
                >
                    <AnonSilhouette className="w-full h-full" />
                </div>
            ))}

            {/* ── Dots ── */}
            {DOTS.map((d, i) => (
                <div
                    key={`dot-${i}`}
                    className="absolute h-1.5 w-1.5 rounded-full bg-foreground/20 animate-pulse-dot"
                    style={{
                        top: d.top,
                        left: d.left,
                        right: d.right,
                        '--pulse-delay': d.delay,
                        '--pulse-duration': d.duration,
                    }}
                />
            ))}

            {/* ── Anonymous labels ── */}
            {LABELS.map((l, i) => (
                <span
                    key={`label-${i}`}
                    className="absolute font-mono text-[10px] tracking-widest uppercase text-foreground/[0.06] animate-drift-slow select-none"
                    style={{
                        top: l.top,
                        left: l.left,
                        right: l.right,
                        '--drift-delay': l.delay,
                        '--drift-duration': l.duration,
                    }}
                >
                    {l.text}
                </span>
            ))}

            {/* ── Conversation symbols ── */}
            {SYMBOLS.map((s, i) => {
                const Icon = s.icon;
                return (
                    <div
                        key={`sym-${i}`}
                        className="absolute text-foreground/[0.05] animate-drift"
                        style={{
                            top: s.top,
                            left: s.left,
                            right: s.right,
                            '--drift-delay': s.delay,
                            '--drift-duration': s.duration,
                        }}
                    >
                        <Icon className="h-5 w-5" strokeWidth={1.2} />
                    </div>
                );
            })}

            {/* ── Hood character easter egg ── */}
            <div
                className="absolute animate-hood text-foreground/[0.09] dark:text-foreground/[0.15]"
                style={{ top: 0, left: 0 }}
            >
                <HoodCharacter className="w-14 h-16" />
            </div>
        </div>
    );
};

export default AnimatedBackground;
