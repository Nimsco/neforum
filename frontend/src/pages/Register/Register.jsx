import { useState } from 'react';
import {
    User,
    Lock,
    Eye,
    EyeOff,
    ShieldCheck,
    ArrowRight,
} from 'lucide-react';
import AuthLayout from '../../components/AuthLayout';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [formData, setFormData] = useState({
        username : "",
        password : "",
        confirmPassword : ""

    })

    const handleChange = (e) =>{
        const {name,value} = e.target

        setFormData((prevData) =>({
            ...prevData,[name]:value
        }))
    }

    const handleSubmit = () =>{

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
            <form className="space-y-4" onSubmit={handleSubmit}>
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
                        3–50 characters · this is your public identity
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
                            type={showPassword ? 'text' : 'password'}
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
                            type={showConfirm ? 'text' : 'password'}
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
                    Create Account
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
            </form>
        </AuthLayout>
    );
};

export default Register;
