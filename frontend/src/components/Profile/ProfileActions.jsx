import { KeyRound, LogOut } from 'lucide-react';

/**
 * ProfileActions
 *
 * Action buttons for user profile (Change Password, Logout, etc.).
 *
 * @param {function} onChangePassword - Callback to trigger change password flow
 * @param {function} onLogout         - Callback to trigger user logout
 */
const ProfileActions = ({ onChangePassword, onLogout }) => {
    return (
        <div className="flex flex-wrap items-center gap-2.5 sm:self-start">
            {/* Change Password button */}
            <button
                type="button"
                onClick={onChangePassword}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/80 px-3.5 py-2 text-xs font-medium text-foreground transition-all hover:bg-card hover:border-foreground/20 hover:shadow-sm cursor-pointer"
                aria-label="Change Password"
            >
                <KeyRound className="h-3.5 w-3.5 text-muted" />
                <span>Change Password</span>
            </button>

            {/* Logout button */}
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
    );
};

export default ProfileActions;
