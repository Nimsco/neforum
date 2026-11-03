import {
    CalendarDays,
    KeyRound,
    LogOut,
    Shield,
    User,
} from 'lucide-react';

/**
 * ProfileHeader
 *
 * Top section of the profile page — avatar, username, join date, action buttons, and quick stats.
 *
 * @param {object}   user             — User object (expects at least { username, createdAt }).
 * @param {number}   [postCount]      — Total posts by the user.
 * @param {number}   [commentCount]   — Total comments by the user.
 * @param {function} [onChangePassword] — Callback to trigger change password modal
 * @param {function} [onLogout]         — Callback to trigger logout
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
    likeCount,
    savedCount,
    onChangePassword,
    onLogout,
}) => {
    const initial = user?.username
        ?.charAt(0)
        ?.toUpperCase();
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
            {/* Top row: avatar + identity + action buttons */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/15 text-3xl font-bold text-primary select-none ring-4 ring-card shadow-md">
                        {initial ? (
                            <span>{initial}</span>
                        ) : (
                            <User className="h-10 w-10" />
                        )}
                    </div>

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
                                <span>
                                    Joined {joinDate}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Profile Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 sm:self-start">
                    <button
                        type="button"
                        onClick={onChangePassword}
                        className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/80 px-3.5 py-2 text-xs font-medium text-foreground transition-all hover:bg-card hover:border-foreground/20 hover:shadow-sm cursor-pointer"
                        aria-label="Change Password"
                    >
                        <KeyRound className="h-3.5 w-3.5 text-muted" />
                        <span>Change Password</span>
                    </button>

                    <button
                        type="button"
                        onClick={onLogout}
                        className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/80 px-3.5 py-2 text-xs font-medium text-muted transition-all hover:bg-error/10 hover:text-error hover:border-error/20 cursor-pointer"
                        aria-label="Log out"
                    >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Log out</span>
                    </button>
                </div>
            </div>

            {/* Stats row */}
            <div className="mt-6 grid grid-cols-4 items-center border-t border-border pt-5">
                <StatBadge
                    label="Posts"
                    value={postCount}
                />
                <StatBadge
                    label="Comments"
                    value={commentCount}
                />
                <StatBadge
                    label="Likes given"
                    value={likeCount}
                />
                <StatBadge
                    label="Saved"
                    value={savedCount}
                />
            </div>
        </div>
    );
};

export default ProfileHeader;
