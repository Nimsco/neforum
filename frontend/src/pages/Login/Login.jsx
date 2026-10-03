import { useContext, useState } from 'react';
import {
    User,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
} from 'lucide-react';
import AuthLayout from '../../components/AuthLayout';
import { loginUser } from '../../api/auth.api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import getErrorMessage from '../../utils/getErrorMessage';
import UserContext from '../../context/userContext';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
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

        if (isSubmitting) return;

        const { username, password } = formData;

        try {
            const data = await loginUser({
                username,
                password,
            });

            setUser({ username });

            toast.success(
                data.message ||
                    'User Logged In Successfully.'
            );

            navigate('/');
        } catch (error) {
            console.log('Full error:', error);
            console.log(
                'Backend response:',
                error.response?.data
            );

            toast.error(
                getErrorMessage(error, 'Login failed.')
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthLayout>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-xl font-bold text-foreground">
                    Welcome back
                </h1>
                <p className="mt-1 text-sm text-muted">
                    Your identity remains hidden.
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
                            placeholder="your anonymous alias"
                            className="input-focus-effect block w-full rounded-xl border border-border bg-background/60 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted/40 outline-none"
                        />
                    </div>
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
                            autoComplete="current-password"
                            placeholder="••••••••"
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
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="btn-primary group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                >
                    {isSubmitting
                        ? 'Logging In...'
                        : 'Login'}

                    {!isSubmitting && (
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    )}
                </button>
            </form>
        </AuthLayout>
    );
};

export default Login;
