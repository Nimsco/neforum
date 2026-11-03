import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    FileText,
    MessageSquare,
    Bookmark,
} from 'lucide-react';
import ProfileCommentCard from './ProfileCommentCard';
import ProfileSavedCard from './ProfileSavedCard';
import PostContext from '../../context/postContext/postContext';
import PostCard from '../PostCard';

/**
 * ProfileContentArea
 *
 * Renders the list of items based on the currently active tab.
 * Shows an empty-state placeholder when there's no data.
 * Consumes PostContext by default to prevent prop-drilling.
 *
 * @param {string}  activeTab — 'posts' | 'comments' | 'saved'
 * @param {array}   [posts]   — Optional override for posts array
 * @param {array}   [comments]— Array of comment objects
 * @param {array}   [saved]   — Optional override for saved posts array
 */

const emptyConfig = {
    posts: {
        Icon: FileText,
        title: 'No posts yet',
        subtitle: 'Posts you create will appear here.',
    },
    comments: {
        Icon: MessageSquare,
        title: 'No comments yet',
        subtitle: "Comments you've made will show up here.",
    },
    saved: {
        Icon: Bookmark,
        title: 'Nothing saved',
        subtitle: 'Bookmark posts to see them here.',
    },
};

const ProfileContentArea = ({
    activeTab,
    posts: propPosts,
    comments = [],
    saved: propSaved,
    onLike,
    onSave,
    onShare,
    onDelete,
    showDelete,
}) => {
    const postContext = useContext(PostContext);
    const navigate = useNavigate();
    const location = useLocation();
    // Fall back to PostContext if not explicitly provided
    const posts = propPosts ?? postContext?.userPosts ?? [];
    const saved =
        propSaved ?? postContext?.savedPosts ?? [];

    const handleOpenCommentPost = (comment) => {
        const commentPost = comment?.post;
        const postId =
            typeof commentPost === 'object'
                ? commentPost?._id || commentPost?.id
                : commentPost;

        if (!postId) return;

        const fullPost = [
            ...(postContext?.allPosts || []),
            ...(postContext?.userPosts || []),
        ].find(
            (post) =>
                String(post?._id || post?.id) ===
                String(postId)
        );

        navigate(`/posts/${postId}`, {
            state: {
                post:
                    fullPost ||
                    (typeof commentPost === 'object'
                        ? commentPost
                        : null),
                from: location.pathname,
            },
        });
    };

    /* ── Decide which list + card to render ── */
    let items, CardComponent;

    switch (activeTab) {
        case 'comments':
            items = comments;
            CardComponent = ProfileCommentCard;
            break;
        case 'saved':
            items = saved;
            CardComponent = ProfileSavedCard;
            break;
        case 'posts':
        default:
            items = posts;
            CardComponent = PostCard;
            break;
    }

    /* ── Empty state ── */
    if (!items || items.length === 0) {
        const { Icon, title, subtitle } =
            emptyConfig[activeTab] || emptyConfig.posts;

        return (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center animate-slide-up">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">
                    {title}
                </p>
                <p className="text-xs text-muted">
                    {subtitle}
                </p>
            </div>
        );
    }

    /* ── Item list ── */
    return (
        <div className="flex flex-col gap-3 animate-slide-up">
            {items.map((item, index) => {
                const key = item._id || item.id || index;

                if (activeTab === 'comments') {
                    return (
                        <CardComponent
                            key={key}
                            comment={item}
                            onClick={() =>
                                handleOpenCommentPost(item)
                            }
                        />
                    );
                }

                return (
                    <CardComponent
                        key={key}
                        post={item}
                        onLike={onLike}
                        onSave={onSave}
                        onShare={onShare}
                        onDelete={onDelete}
                        showDelete={showDelete}
                        onClick={
                            activeTab === 'saved'
                                ? () =>
                                      handleOpenCommentPost(
                                          {
                                              post: item,
                                          }
                                      )
                                : undefined
                        }
                    />
                );
            })}
        </div>
    );
};

export default ProfileContentArea;
