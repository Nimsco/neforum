import { useContext, useEffect, useState } from 'react';
import PostContext from './postContext.js';
import UserContext from '../userContext/userContext.js';
import { getUserPosts } from '../../api/user.api';

const PostContextProvider = ({ children }) => {
    const context = useContext(UserContext);

    const { user, isAuthLoading } = context;

    const [posts, setPosts] = useState([]);
    const [postCount, setPostCount] = useState(0);
    const [isPostsLoading, setIsPostsLoading] =
        useState(false);
    const [postError, setPostError] = useState('');

    const resetPost = () => {
        setPosts([]);
        setPostCount(0);
        setIsPostsLoading(false);
        setPostError('');
    };

    useEffect(() => {
        if (isAuthLoading || !user?.accessToken) {
            return;
        }

        let cancelled = false;

        const fetchPosts = async () => {
            try {
                setIsPostsLoading(true);
                setPostError('');

                const data = await getUserPosts(
                    user.accessToken
                );

                if (cancelled) return;

                setPosts(data.posts ?? []);
                setPostCount(data.postCount ?? 0);
            } catch (error) {
                if (cancelled) return;

                setPostError(
                    error.response?.data?.message ||
                        'Failed to fetch posts.'
                );
            } finally {
                if (!cancelled) {
                    setIsPostsLoading(false);
                }
            }
        };

        fetchPosts();

        return () => {
            cancelled = true;
        };
    }, [isAuthLoading, user?.accessToken]);

    const refreshUserPosts = async () => {
        if (!user?.accessToken) return;

        try {
            setIsPostsLoading(true);
            setPostError('');

            const data = await getUserPosts(
                user.accessToken
            );

            setPosts(data.posts ?? []);
            setPostCount(data.postCount ?? 0);
        } catch (error) {
            setPostError(
                error.response?.data?.message ||
                    'Failed to fetch posts.'
            );
            throw error;
        } finally {
            setIsPostsLoading(false);
        }
    };

    const value = {
        posts,
        postCount,
        isPostsLoading,
        postError,
        refreshUserPosts,
        resetPost,
    };

    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
