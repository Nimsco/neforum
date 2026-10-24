import { useState, useEffect } from 'react';
import {
    X,
    KeyRound,
    Lock,
    ShieldCheck,
    Eye,
    EyeOff,
    ArrowRight,
} from 'lucide-react';

/**
 * ChangePasswordModal
 *
 * Popup dialog to change account password using recovery key.
 *
 * @param {boolean}  isOpen       - Modal visibility
 * @param {function} onClose      - Callback to close the modal
 * @param {function} onSubmit     - Callback when form is submitted e.g. onSubmit(formData)
 * @param {boolean}  isSubmitting - Loading state indicator
 */
const ChangePasswordModal = ({
    isOpen,
    onClose,
    onSubmit,
    isSubmitting = false,
}) => {
    const [formData, setFormData] = useState({
        recoveryKey: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [showNewPassword, setShowNewPassword] =
        useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    // Close on Escape & lock body scrolling
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose?.();
        };

        const originalOverflow =
            document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener(
                'keydown',
                handleKeyDown
            );
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(formData);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
            role="dialog"
            aria-modal="true"
        >
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="fixed inset-0 bg-dark/60 backdrop-blur-sm animate-backdrop transition-opacity cursor-pointer"
            />

            {/* Modal Dialog Card */}
            <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl animate-modal-pop sm:p-8">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <KeyRound className="h-4 w-4" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-foreground">
                                Change Password
                            </h2>
                            <p className="text-xs text-muted">
                                Update your account
                                credentials
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-all hover:bg-foreground/10 hover:text-foreground hover:rotate-90 cursor-pointer"
                        aria-label="Close modal"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="mt-5 space-y-4"
                >
                    {/* Recovery Key */}
                    <div>
                        <label
                            htmlFor="modal-recoveryKey"
                            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
                        >
                            Recovery Key
                        </label>
                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted/50">
                                <KeyRound className="h-4 w-4" />
                            </span>
                            <input
                                id="modal-recoveryKey"
                                name="recoveryKey"
                                type="text"
                                value={formData.recoveryKey}
                                onChange={handleChange}
                                placeholder="16-character recovery key"
                                className="input-focus-effect block w-full rounded-xl border border-border bg-background/60 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-foreground placeholder:text-muted/40 outline-none"
                            />
                        </div>
                        <p className="mt-1 text-[11px] text-muted/65">
                            Required to verify account
                            ownership
                        </p>
                    </div>

                    {/* New Password */}
                    <div>
                        <label
                            htmlFor="modal-newPassword"
                            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
                        >
                            New Password
                        </label>
                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted/50">
                                <Lock className="h-4 w-4" />
                            </span>
                            <input
                                id="modal-newPassword"
                                name="newPassword"
                                type={
                                    showNewPassword
                                        ? 'text'
                                        : 'password'
                                }
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="input-focus-effect block w-full rounded-xl border border-border bg-background/60 py-2.5 pl-10 pr-11 text-xs sm:text-sm text-foreground placeholder:text-muted/40 outline-none"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowNewPassword(
                                        (v) => !v
                                    )
                                }
                                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted/50 hover:text-foreground transition-colors cursor-pointer"
                                aria-label={
                                    showNewPassword
                                        ? 'Hide password'
                                        : 'Show password'
                                }
                            >
                                {showNewPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label
                            htmlFor="modal-confirmPassword"
                            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
                        >
                            Confirm Password
                        </label>
                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted/50">
                                <ShieldCheck className="h-4 w-4" />
                            </span>
                            <input
                                id="modal-confirmPassword"
                                name="confirmPassword"
                                type={
                                    showConfirmPassword
                                        ? 'text'
                                        : 'password'
                                }
                                value={
                                    formData.confirmPassword
                                }
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="input-focus-effect block w-full rounded-xl border border-border bg-background/60 py-2.5 pl-10 pr-11 text-xs sm:text-sm text-foreground placeholder:text-muted/40 outline-none"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        (v) => !v
                                    )
                                }
                                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted/50 hover:text-foreground transition-colors cursor-pointer"
                                aria-label={
                                    showConfirmPassword
                                        ? 'Hide password'
                                        : 'Show password'
                                }
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-border">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-border px-4 py-2 text-xs font-medium text-muted transition-colors hover:text-foreground hover:border-foreground/20 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-primary inline-flex items-center gap-1.5 rounded-xl bg-foreground px-4 py-2 text-xs font-semibold text-background transition-opacity hover:opacity-85 disabled:opacity-50 cursor-pointer"
                        >
                            <span>
                                {isSubmitting
                                    ? 'Updating...'
                                    : 'Update Password'}
                            </span>
                            <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
