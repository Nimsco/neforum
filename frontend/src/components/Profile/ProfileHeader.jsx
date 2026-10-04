import { CalendarDays, Shield } from 'lucide-react';
import ProfileAvatar from './ProfileAvatar';

/**
 * ProfileHeader
 *
 * Top section of the profile page — avatar, username, join date, and quick stats.
 *
 * @param {object}  user        — User object (expects at least { username, createdAt }).
 * @param {number}  [postCount]    — Total posts by the user.
 * @param {number}  [commentCount] — Total comments by the user.
 */

const StatBadge = ({ label, value }) => (
    <div className="flex flex-col items-center gap-0.5">
        <span className="text-lg font-bold text-foreground">
            {value ?? '—'}
        </span>
        <span className="text-[11px] uppercase tracking-wider text-muted font-medium">
            {label}
        </span>
    </div>
);

const ProfileHeader = ({
    user,
    postCount,
    commentCount,
}) => {
    const joinDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString(
              'en-US',
              {
                  month: 'short',
                  year: 'numeric',
              }
          )
        : null;

    return (
        <div className="w-full rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm animate-slide-up">
            {/* Top row: avatar + identity */}
            <div className="flex flex-col sm:flex-row items-center gap-5">
                <ProfileAvatar
                    username={user?.username}
                    size="lg"
                />

                <div className="flex flex-col items-center sm:items-start gap-1.5">
                    {/* Username */}
                    <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                        {user?.username ?? 'Anonymous'}
                    </h1>

                    {/* Anonymous badge */}
                    <div className="flex items-center gap-1.5 text-xs text-muted">
                        <Shield
                            className="h-3.5 w-3.5 text-primary"
                            strokeWidth={2}
                        />
                        <span>Anonymous identity</span>
                    </div>

                    {/* Joined date */}
                    {joinDate && (
                        <div className="flex items-center gap-1.5 text-xs text-muted">
                            <CalendarDays className="h-3.5 w-3.5" />
                            <span>Joined {joinDate}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Stats row */}
            <div className="mt-6 flex items-center justify-center sm:justify-start gap-8 border-t border-border pt-5">
                <StatBadge
                    label="Posts"
                    value={postCount}
                />
                <div className="h-8 w-px bg-border" />
                <StatBadge
                    label="Comments"
                    value={commentCount}
                />
            </div>
        </div>
    );
};

export default ProfileHeader;
