import {
    FileText,
    MessageSquare,
    Bookmark,
} from 'lucide-react';
import ProfilePostCard from './ProfilePostCard';
import ProfileCommentCard from './ProfileCommentCard';
import ProfileSavedCard from './ProfileSavedCard';

/**
 * ProfileContentArea
 *
 * Renders the list of items based on the currently active tab.
 * Shows an empty-state placeholder when there's no data.
 *
 * @param {string}  activeTab — 'posts' | 'comments' | 'saved'
 * @param {array}   posts     — Array of post objects.
 * @param {array}   comments  — Array of comment objects.
 * @param {array}   saved     — Array of saved post objects.
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
    posts = [],
    comments = [],
    saved = [],
}) => {
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
            CardComponent = ProfilePostCard;
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
            {items.map((item) => {
                const key =
                    item._id || item.id || Math.random();

                if (activeTab === 'comments') {
                    return (
                        <CardComponent
                            key={key}
                            comment={item}
                        />
                    );
                }
                return (
                    <CardComponent key={key} post={item} />
                );
            })}
        </div>
    );
};

export default ProfileContentArea;
