import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, PenLine } from 'lucide-react';
import PostCard from './PostCard';
import { CommentModal } from '../Comments';
import PostContext from '../../context/postContext/postContext';

/**
 * ConversationFeed — post feed on the Home page
 *
 * All static/mock posts removed.
 * Feeds from props or PostContext dynamically.
 * Features tabs, empty state, and popup comment modal with animations.
 */

const tabs = ['Trending', 'Latest', 'Unanswered'];

const ConversationFeed = ({
    posts: propPosts,
    onLike,
    onComment,
    onSave,
    onShare,
    onDelete,
    onPostClick,
}) => {
    const [activeTab, setActiveTab] = useState('Trending');
    const [activeCommentPost, setActiveCommentPost] =
        useState(null);

    // Context fallback if posts aren't passed directly as prop
    const postContext = useContext(PostContext);
    const contextPosts = postContext?.posts;
    const isPostsLoading = postContext?.isPostsLoading;

    const posts =
        propPosts !== undefined
            ? propPosts
            : contextPosts || [];

    const handleComment = (post) => {
        setActiveCommentPost(post);
        onComment?.(post);
    };

    return (
        <section className="pt-6">
            {/* ── Header + tabs on one quiet row ── */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-5 text-sm">
                    {tabs.map((label) => (
                        <button
                            key={label}
                            type="button"
                            onClick={() =>
                                setActiveTab(label)
                            }
                            className={`relative py-1 font-medium transition-colors cursor-pointer ${
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
                    {posts.length}{' '}
                    {posts.length === 1
                        ? 'conversation'
                        : 'conversations'}
                </span>
            </div>

            {/* ── Feed Content ── */}
            {isPostsLoading ? (
                <div className="flex min-h-[200px] items-center justify-center py-12">
                    <span className="block h-7 w-7 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
            ) : posts.length === 0 ? (
                /* Empty state when no posts are available */
                <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-14 px-4 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/5 text-muted mb-3">
                        <MessageSquare className="h-6 w-6" />
                    </div>
                    <h4 className="text-base font-semibold text-foreground">
                        No conversations yet
                    </h4>
                    <p className="mt-1 max-w-sm text-xs text-muted">
                        There are no posts here right now.
                        Be the first to start a conversation
                        in the community.
                    </p>
                    <Link
                        to="/create-post"
                        className="btn-primary mt-4 inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2 text-xs font-semibold text-background transition-opacity hover:opacity-80"
                    >
                        <PenLine className="h-3.5 w-3.5" />
                        Start a post
                    </Link>
                </div>
            ) : (
                /* Post cards list */
                <div className="mt-4 flex flex-col gap-3">
                    {posts.map((post) => (
                        <PostCard
                            key={post._id || post.id}
                            post={post}
                            onLike={onLike}
                            onComment={handleComment}
                            onSave={onSave}
                            onShare={onShare}
                            onDelete={onDelete}
                            onClick={onPostClick}
                        />
                    ))}
                </div>
            )}

            {/* ── Animated Comment Popup Modal ── */}
            <CommentModal
                isOpen={!!activeCommentPost}
                post={activeCommentPost}
                onClose={() => setActiveCommentPost(null)}
            />
        </section>
    );
};

export default ConversationFeed;
