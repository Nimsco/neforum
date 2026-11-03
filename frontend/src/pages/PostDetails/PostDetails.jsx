import { useContext, useEffect, useState } from 'react';
import {
    useLocation,
    useNavigate,
    useParams,
} from 'react-router-dom';
import CommentModal from '../../components/Comments/CommentModal';
import UserContext from '../../context/userContext/userContext';
import { getPostById } from '../../api/post.api';

const PostDetails = () => {
    const { postId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [result, setResult] = useState(null);
    const isLoading = result?.postId !== postId;
    const post =
        result?.postId === postId ? result.post : null;

    useEffect(() => {
        if (!postId || !user?.accessToken) return;

        let cancelled = false;
        getPostById(user.accessToken, postId)
            .then((loadedPost) => {
                if (!cancelled) {
                    setResult({ postId, post: loadedPost });
                }
            })
            .catch((error) => {
                if (!cancelled) {
                    setResult({ postId, error });
                }
            });

        return () => {
            cancelled = true;
        };
    }, [postId, user?.accessToken]);

    const closeDetails = () => {
        const returnTo = location.state?.from;
        navigate(returnTo || '/', { replace: true });
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/60 p-4 backdrop-blur-sm">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
        );
    }

    if (result?.error || !post) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/60 p-4 backdrop-blur-sm">
                <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 text-center shadow-2xl">
                    <h1 className="text-lg font-semibold text-foreground">
                        Post unavailable
                    </h1>
                    <p className="mt-2 text-sm text-muted">
                        This post could not be loaded. It
                        may have been deleted.
                    </p>
                    <button
                        type="button"
                        onClick={closeDetails}
                        className="mt-5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <CommentModal
            key={postId}
            isOpen
            post={post}
            onClose={closeDetails}
            showPostDetails
        />
    );
};

export default PostDetails;
