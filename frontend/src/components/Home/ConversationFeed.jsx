import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

/**
 * ConversationFeed — the feed, kept quiet
 *
 * Text-only tabs and a plain editorial list separated by hairlines
 * instead of boxed cards. Muted metadata, one hover affordance.
 */

const tabs = ['Trending', 'Latest', 'Unanswered'];

const samplePosts = [
    {
        id: 1,
        topic: 'Nepal & Society',
        title: 'What do you think is the biggest unspoken problem in Nepal right now?',
        upvotes: 342,
        replies: 124,
        time: '2h ago',
    },
    {
        id: 2,
        topic: 'Education',
        title: 'Is going abroad for studies still worth it in 2026?',
        upvotes: 276,
        replies: 89,
        time: '4h ago',
    },
    {
        id: 3,
        topic: 'Careers & Work',
        title: 'How do you deal with toxic work culture without quitting?',
        upvotes: 198,
        replies: 67,
        time: '6h ago',
    },
    {
        id: 4,
        topic: 'Ideas & Innovation',
        title: 'What small business ideas actually work in Nepal?',
        upvotes: 156,
        replies: 45,
        time: '8h ago',
    },
];

const ConversationFeed = () => {
    const [activeTab, setActiveTab] = useState('Trending');

    return (
        <section className="pt-6">
            {/* ── Header + tabs on one quiet row ── */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-5 text-sm">
                    {tabs.map((label) => (
                        <button
                            key={label}
                            onClick={() =>
                                setActiveTab(label)
                            }
                            className={`relative py-1 font-medium transition-colors ${
                                activeTab === label
                                    ? 'text-foreground'
                                    : 'text-muted hover:text-foreground'
                            }`}
                        >
                            {label}
                            {activeTab === label && (
                                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-foreground" />
                            )}
                        </button>
                    ))}
                </div>

                <span className="hidden text-xs text-muted sm:inline">
                    {samplePosts.length} conversations
                </span>
            </div>

            {/* ── Editorial list ── */}
            <ul className="mt-2 divide-y divide-border border-t border-border">
                {samplePosts.map((post) => (
                    <li
                        key={post.id}
                        className="group cursor-pointer py-5 transition-colors"
                    >
                        <div className="flex items-center gap-2 text-xs text-muted">
                            <span className="font-medium">
                                {post.topic}
                            </span>
                            <span className="text-muted/50">
                                ·
                            </span>
                            <span>{post.time}</span>
                        </div>
                        <h3 className="mt-1.5 flex items-start justify-between gap-3 text-[15px] font-medium leading-snug text-foreground transition-colors group-hover:text-foreground/70">
                            {post.title}
                            <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-transparent transition-colors group-hover:text-muted" />
                        </h3>
                        <div className="mt-1.5 text-xs text-muted/80">
                            {post.upvotes} upvotes
                            <span className="mx-1.5 text-muted/40">
                                ·
                            </span>
                            {post.replies} replies
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default ConversationFeed;
