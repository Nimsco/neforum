import {
    FileText,
    MessageSquare,
    Bookmark,
} from 'lucide-react';

/**
 * ProfileTabs
 *
 * Pill-style tab bar to switch between Posts / Comments / Saved.
 * Follows the same pill pattern used in AuthLayout's Login / Register pills.
 *
 * @param {string}   activeTab — 'posts' | 'comments' | 'saved'
 * @param {function} onTabChange — Called with the new tab key when clicked.
 */

const tabs = [
    { key: 'posts', label: 'Posts', Icon: FileText },
    {
        key: 'comments',
        label: 'Comments',
        Icon: MessageSquare,
    },
    { key: 'saved', label: 'Saved', Icon: Bookmark },
];

const ProfileTabs = ({ activeTab, onTabChange }) => {
    return (
        <div className="flex w-full max-w-md gap-1 rounded-full border border-border bg-card/60 p-1 backdrop-blur-sm animate-slide-up">
            {tabs.map(({ key, label, Icon }) => {
                const isActive = activeTab === key;
                return (
                    <button
                        key={key}
                        type="button"
                        onClick={() => onTabChange(key)}
                        className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer outline-none ${
                            isActive
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-muted hover:text-foreground'
                        }`}
                    >
                        <Icon className="h-4 w-4" />
                        <span className="hidden sm:inline">
                            {label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

export default ProfileTabs;
