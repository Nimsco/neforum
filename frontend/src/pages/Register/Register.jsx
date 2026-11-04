import { useState, useContext, useRef } from 'react';
import {
    User,
    Lock,
    Eye,
    EyeOff,
    ShieldCheck,
    ArrowRight,
    Copy,
    Check,
    ShieldAlert,
} from 'lucide-react';
import AuthLayout from '../../components/AuthLayout';
import { toast } from 'react-toastify';
import { useBlocker, useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/auth.api';
import getErrorMessage from '../../utils/getErrorMessage';
import UserContext from '../../context/userContext/userContext';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [recoveryKey, setRecoveryKey] = useState('');
    const [hasCopiedKey, setHasCopiedKey] = useState(false);
    const [showLeaveDialog, setShowLeaveDialog] =
        useState(false);

    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();
    const allowRecoveryKeyExit = useRef(false);
    const blocker = useBlocker(
        () =>
            Boolean(recoveryKey) &&
            !allowRecoveryKeyExit.current
    );

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password, confirmPassword } =
            formData;

        if (password != confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        if (username.includes(' ')) {
            toast.error('Username cannot contain spaces.');
            return;
        }

        if (
            password.includes(' ') ||
            confirmPassword.includes(' ')
        ) {
            toast.error('Passwords cannot contain spaces.');
            return;
        }

        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            const response = await registerUser({
                username: username.trim(),
                password,
                confirmPassword,
            });

            const { recoveryKey: key, ...registeredUser } =
                response.user || {};
            if (!key) {
                throw new Error(
                    'Your account was created, but the recovery key was not returned. Please contact support before leaving this page.'
                );
            }

            setUser({
                ...registeredUser,
                accessToken: response.accessToken,
            });
            setRecoveryKey(key);
        } catch (error) {
            toast.error(
                getErrorMessage(
                    error || 'Registration Failed.'
                )
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const copyRecoveryKey = async () => {
        try {
            if (!navigator.clipboard?.writeText) {
                throw new Error(
                    'Clipboard API unavailable'
                );
            }
            await navigator.clipboard.writeText(
                recoveryKey
            );
            setHasCopiedKey(true);
            toast.success(
                'Recovery key copied. Save it somewhere safe.'
            );
        } catch {
            let textArea;
            try {
                textArea =
                    document.createElement('textarea');
                textArea.value = recoveryKey;
                textArea.setAttribute('readonly', '');
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                textArea.setSelectionRange(
                    0,
                    textArea.value.length
                );

                if (!document.execCommand('copy')) {
                    throw new Error('Copy command failed');
                }

                setHasCopiedKey(true);
                toast.success(
                    'Recovery key copied. Save it somewhere safe.'
                );
            } catch {
                toast.error(
                    'Could not copy automatically. Select the key and copy it manually.'
                );
            } finally {
                textArea?.remove();
            }
        }
    };

    const attemptToLeaveRecoveryKey = (event) => {
        if (!recoveryKey) return false;
        event.preventDefault();
        setShowLeaveDialog(true);
        return true;
    };

    const continueAfterRecoveryKey = () => {
        setShowLeaveDialog(false);
        allowRecoveryKeyExit.current = true;
        if (blocker.state === 'blocked') {
            blocker.reset();
        }
        toast.success('User Registered Successfully.');
        navigate('/', { replace: true });
    };

    if (recoveryKey) {
        return (
            <AuthLayout
                onBeforeNavigate={attemptToLeaveRecoveryKey}
            >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <ShieldCheck className="h-6 w-6" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Account secured
                </p>
                <h1 className="mt-2 text-2xl font-bold text-foreground">
                    Save your recovery key
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                    Use this key to recover your account if
                    you forget your password. It will only
                    be shown here, so keep a private copy.
                </p>

                <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
                        Your recovery key
                    </p>
                    <div className="flex min-h-14 items-center justify-center rounded-xl border border-border bg-background px-3 py-3">
                        <code className="select-all break-all text-center font-mono text-xl font-bold tracking-[0.2em] text-foreground sm:text-2xl">
                            {recoveryKey}
                        </code>
                    </div>
                    <button
                        type="button"
                        onClick={copyRecoveryKey}
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/5 cursor-pointer"
                    >
                        {hasCopiedKey ? (
                            <Check className="h-4 w-4 text-success" />
                        ) : (
                            <Copy className="h-4 w-4" />
                        )}
                        {hasCopiedKey
                            ? 'Copied'
                            : 'Copy recovery key'}
                    </button>
                </div>

                <div className="mt-4 flex gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs leading-relaxed text-muted">
                    <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    <p>
                        Anyone with this key may be able to
                        recover your account. Don’t share it
                        or store it somewhere public.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setShowLeaveDialog(true)}
                    className="btn-primary mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                >
                    I’ve saved my key
                    <ArrowRight className="h-4 w-4" />
                </button>

                {(showLeaveDialog ||
                    blocker.state === 'blocked') && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-dark/60 p-4 backdrop-blur-sm"
                        role="presentation"
                        onMouseDown={(event) => {
                            if (
                                event.target ===
                                event.currentTarget
                            ) {
                                setShowLeaveDialog(false);
                            }
                        }}
                    >
                        <div
                            className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl"
                            role="alertdialog"
                            aria-modal="true"
                            aria-labelledby="recovery-confirm-title"
                            aria-describedby="recovery-confirm-description"
                        >
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                                <ShieldAlert className="h-5 w-5" />
                            </div>
                            <h2
                                id="recovery-confirm-title"
                                className="text-lg font-bold text-foreground"
                            >
                                Have you copied your
                                recovery key?
                            </h2>
                            <p
                                id="recovery-confirm-description"
                                className="mt-2 text-sm leading-relaxed text-muted"
                            >
                                You won’t be able to view it
                                again after leaving this
                                screen. Make sure it’s saved
                                somewhere private.
                            </p>
                            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowLeaveDialog(
                                            false
                                        );
                                        if (
                                            blocker.state ===
                                            'blocked'
                                        ) {
                                            blocker.reset();
                                        }
                                    }}
                                    className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-foreground/5 cursor-pointer"
                                >
                                    Go back to key
                                </button>
                                <button
                                    type="button"
                                    onClick={
                                        continueAfterRecoveryKey
                                    }
                                    className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover cursor-pointer"
                                >
                                    Yes, continue
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </AuthLayout>
        );
    }

    return (
        <AuthLayout>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-xl font-bold text-foreground">
                    Join the community
                </h1>
                <p className="mt-1 text-sm text-muted">
                    No email. No phone. Just pick a name.
                </p>
            </div>

            {/* Form */}
            <form
                className="space-y-4"
                onSubmit={handleSubmit}
            >
                {/* Username */}
                <div>
                    <label
                        htmlFor="username"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
                    >
                        Username
                    </label>
                    <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted/50">
                            <User className="h-4 w-4" />
                        </span>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            autoComplete="username"
                            placeholder="choose your alias"
                            minLength={3}
                            maxLength={50}
                            className="input-focus-effect block w-full rounded-xl border border-border bg-background/60 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted/40 outline-none"
                        />
                    </div>
                    <p className="mt-1 text-[11px] text-muted/70">
                        3–50 characters · this is your
                        public identity
                    </p>
                </div>

                {/* Password */}
                <div>
                    <label
                        htmlFor="password"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted/50">
                            <Lock className="h-4 w-4" />
                        </span>
                        <input
                            id="password"
                            name="password"
                            type={
                                showPassword
                                    ? 'text'
                                    : 'password'
                            }
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                            placeholder="create a password"
                            minLength={6}
                            className="input-focus-effect block w-full rounded-xl border border-border bg-background/60 py-2.5 pl-10 pr-11 text-sm text-foreground placeholder:text-muted/40 outline-none"
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword((v) => !v)
                            }
                            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted/50 hover:text-foreground transition-colors cursor-pointer"
                            aria-label={
                                showPassword
                                    ? 'Hide password'
                                    : 'Show password'
                            }
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                    <p className="mt-1 text-[11px] text-muted/70">
                        Minimum 6 characters
                    </p>
                </div>

                {/* Confirm Password */}
                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
                    >
                        Confirm Password
                    </label>
                    <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted/50">
                            <ShieldCheck className="h-4 w-4" />
                        </span>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={
                                showConfirm
                                    ? 'text'
                                    : 'password'
                            }
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            autoComplete="new-password"
                            placeholder="re-enter password"
                            minLength={6}
                            className="input-focus-effect block w-full rounded-xl border border-border bg-background/60 py-2.5 pl-10 pr-11 text-sm text-foreground placeholder:text-muted/40 outline-none"
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirm((v) => !v)
                            }
                            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted/50 hover:text-foreground transition-colors cursor-pointer"
                            aria-label={
                                showConfirm
                                    ? 'Hide password'
                                    : 'Show password'
                            }
                        >
                            {showConfirm ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="btn-primary group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                >
                    {isSubmitting
                        ? 'Creating Account...'
                        : 'Create Account'}

                    {!isSubmitting && (
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    )}
                </button>
            </form>
        </AuthLayout>
    );
};

export default Register;
