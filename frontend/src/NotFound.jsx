import { Link } from 'react-router-dom';
import { SearchX, Home } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-page flex flex-col items-center justify-center p-4">
            <div className="text-center flex flex-col items-center gap-6 max-w-lg">
                
                {/* Animated Icon */}
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
                    <div className="relative bg-card border-2 border-border p-6 rounded-3xl shadow-xl transform transition-transform hover:scale-105">
                        <SearchX size={80} className="text-primary animate-bounce" />
                    </div>
                </div>
                
                {/* Text Content */}
                <div className="space-y-2">
                    <h1 className="text-7xl font-bold text-heading tracking-tighter">404</h1>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-heading">
                        Page Not Found
                    </h2>
                    <p className="text-muted text-base mt-2">
                        Oops! It seems like you've wandered into the unknown. The page you are looking for doesn't exist or has been moved.
                    </p>
                </div>

                {/* Back to Home Button */}
                <div className="mt-8">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary-hover hover:shadow-lg transition-all transform hover:-translate-y-1"
                    >
                        <Home size={20} />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;