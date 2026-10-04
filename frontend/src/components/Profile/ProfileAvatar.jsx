import { User } from 'lucide-react';

/**
 * ProfileAvatar
 *
 * Circular avatar displaying the user's initial letter.
 * Falls back to a generic User icon when no username is provided.
 *
 * @param {string}  [username]  — The username (first char is displayed).
 * @param {string}  [size]      — Tailwind size class token: 'sm' | 'md' | 'lg'. Default 'lg'.
 * @param {string}  [className] — Extra classes forwarded to the wrapper.
 */

const sizeMap = {
    sm: 'h-10 w-10 text-sm',
    md: 'h-16 w-16 text-xl',
    lg: 'h-24 w-24 text-3xl',
};

const iconSizeMap = {
    sm: 'h-5 w-5',
    md: 'h-7 w-7',
    lg: 'h-10 w-10',
};

const ProfileAvatar = ({
    username,
    size = 'lg',
    className = '',
}) => {
    const initial = username?.charAt(0)?.toUpperCase();

    return (
        <div
            className={`flex items-center justify-center rounded-full bg-primary/15 text-primary font-bold select-none ring-4 ring-card shadow-md ${sizeMap[size] || sizeMap.lg} ${className}`}
        >
            {initial ? (
                <span>{initial}</span>
            ) : (
                <User
                    className={
                        iconSizeMap[size] || iconSizeMap.lg
                    }
                />
            )}
        </div>
    );
};

export default ProfileAvatar;
