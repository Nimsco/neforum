import {
    useContext,
    useEffect,
    useState,
    useMemo,
} from 'react';
import PostContext from './postContext.js';
import UserContext from '../userContext/userContext.js';
import { fetchUserPosts } from '../../api/user.api';
import {
    fetchAllPosts,
    createPost as createPostApi,
    deletePost as deletePostAPi,
} from '../../api/post.api.js';
import { toast } from 'react-toastify';
import getErrorMessage from '../../utils/getErrorMessage.js';

const PostContextProvider = ({ children }) => {
    const { user, isAuthLoading } = useContext(UserContext);

    // ── All posts (Home feed) ──
    const [allPosts, setAllPosts] = useState([]);
    const [isFeedLoading, setIsFeedLoading] =
        useState(false);
    const [feedError, setFeedError] = useState('');

    // ── Current user's posts (Profile) ──
    const [userPosts, setUserPosts] = useState([]);
    const [userPostCount, setUserPostCount] = useState(0);
    const [isUserPostsLoading, setIsUserPostsLoading] =
        useState(false);
    const [userPostsError, setUserPostsError] =
        useState('');

    // ───────────────────────────────────────
    // Reset state (e.g. on logout)
    // ───────────────────────────────────────
    const resetPost = () => {
        setAllPosts([]);
        setIsFeedLoading(false);
        setFeedError('');
        setUserPosts([]);
        setUserPostCount(0);
        setIsUserPostsLoading(false);
        setUserPostsError('');
    };

    // ───────────────────────────────────────
    // Fetch all posts (Home feed)
    // ───────────────────────────────────────
    const fetchFeedPosts = async () => {
        if (!user?.accessToken) return;

        try {
            setIsFeedLoading(true);
            setFeedError('');

            const data = await fetchAllPosts(
                user.accessToken
            );
            const list = Array.isArray(data)
                ? data
                : (data?.posts ?? []);
            setAllPosts(list);
        } catch (error) {
            setFeedError(
                error.response?.data?.message ||
                    'Failed to fetch posts.'
            );
        } finally {
            setIsFeedLoading(false);
        }
    };

    // ───────────────────────────────────────
    // Fetch logged-in user's posts (Profile)
    // ───────────────────────────────────────
    const fetchMyPosts = async () => {
        if (!user?.accessToken) return;

        try {
            setIsUserPostsLoading(true);
            setUserPostsError('');

            const data = await fetchUserPosts(
                user.accessToken
            );
            const list = Array.isArray(data?.posts)
                ? data.posts
                : Array.isArray(data)
                  ? data
                  : [];
            setUserPosts(list);
            setUserPostCount(
                data?.postCount ?? list.length
            );
        } catch (error) {
            setUserPostsError(
                error.response?.data?.message ||
                    'Failed to fetch your posts.'
            );
        } finally {
            setIsUserPostsLoading(false);
        }
    };

    // ───────────────────────────────────────
    // Auto-fetch on login / session restore
    // ───────────────────────────────────────
    useEffect(() => {
        if (isAuthLoading || !user?.accessToken) return;

        let cancelled = false;

        const loadInitialData = async () => {
            setIsFeedLoading(true);
            setIsUserPostsLoading(true);

            try {
                const [feedRes, userRes] =
                    await Promise.allSettled([
                        fetchAllPosts(user.accessToken),
                        fetchUserPosts(user.accessToken),
                    ]);

                if (cancelled) return;

                if (feedRes.status === 'fulfilled') {
                    const data = feedRes.value;
                    const list = Array.isArray(data)
                        ? data
                        : (data?.posts ?? []);
                    setAllPosts(list);
                } else {
                    setFeedError(
                        feedRes.reason?.response?.data
                            ?.message ||
                            'Failed to fetch posts.'
                    );
                }

                if (userRes.status === 'fulfilled') {
                    const data = userRes.value;
                    const list = Array.isArray(data?.posts)
                        ? data.posts
                        : Array.isArray(data)
                          ? data
                          : [];
                    setUserPosts(list);
                    setUserPostCount(
                        data?.postCount ?? list.length
                    );
                } else {
                    setUserPostsError(
                        userRes.reason?.response?.data
                            ?.message ||
                            'Failed to fetch your posts.'
                    );
                }
            } finally {
                if (!cancelled) {
                    setIsFeedLoading(false);
                    setIsUserPostsLoading(false);
                }
            }
        };

        loadInitialData();

        return () => {
            cancelled = true;
        };
    }, [isAuthLoading, user?.accessToken]);

    // ───────────────────────────────────────
    // Create a new post
    // ───────────────────────────────────────
    const createPost = async (postData) => {
        if (!user?.accessToken) {
            throw new Error(
                'You must be logged in to create a post.'
            );
        }

        const newPost = await createPostApi(
            postData,
            user.accessToken
        );

        // Ensure author object is populated for UI presentation
        const formattedPost = {
            ...newPost,
            author:
                typeof newPost.author === 'object' &&
                newPost.author !== null
                    ? newPost.author
                    : {
                          _id: user._id || user.id,
                          username: user.username,
                      },
        };

        // Add to both feed and user posts lists instantly
        setAllPosts((prev) => [formattedPost, ...prev]);
        setUserPosts((prev) => [formattedPost, ...prev]);
        setUserPostCount((prev) => prev + 1);

        return formattedPost;
    };

    // ───────────────────────────────────────
    // Delete a post
    // ───────────────────────────────────────
    const deletePost = async (postId) => {
        try {
            await deletePostAPi(postId, user?.accessToken);

            setAllPosts((prev) =>
                prev.filter(
                    (p) => (p._id || p.id) !== postId
                )
            );

            setUserPosts((prev) =>
                prev.filter(
                    (p) => (p._id || p.id) !== postId
                )
            );

            setUserPostCount((prev) =>
                Math.max(0, prev - 1)
            );

            return true;
        } catch (error) {
            toast.error(
                getErrorMessage(
                    error,
                    'Post cannot be deleted.'
                )
            );
            return false;
        }
    };
    // ───────────────────────────────────────
    // Like / unlike a post (local toggle)
    // ───────────────────────────────────────
    const likePost = (postId) => {
        const toggle = (list) =>
            list.map((p) => {
                if ((p._id || p.id) !== postId) return p;
                const nowLiked = !p.isLiked;
                return {
                    ...p,
                    isLiked: nowLiked,
                    likeCount: nowLiked
                        ? (p.likeCount ?? p.upvotes ?? 0) +
                          1
                        : Math.max(
                              0,
                              (p.likeCount ??
                                  p.upvotes ??
                                  0) - 1
                          ),
                };
            });

        setAllPosts(toggle);
        setUserPosts(toggle);
    };

    // ───────────────────────────────────────
    // Save / unsave a post (local toggle)
    // ───────────────────────────────────────
    const savePost = (postId) => {
        const toggle = (list) =>
            list.map((p) => {
                if ((p._id || p.id) !== postId) return p;
                return { ...p, isSaved: !p.isSaved };
            });

        setAllPosts(toggle);
        setUserPosts(toggle);
    };

    // ───────────────────────────────────────
    // Derived saved posts for Profile "Saved" tab
    // ───────────────────────────────────────
    const savedPosts = useMemo(() => {
        const map = new Map();
        [...allPosts, ...userPosts].forEach((p) => {
            const id = p._id || p.id;
            if (p.isSaved && id && !map.has(id)) {
                map.set(id, p);
            }
        });
        return Array.from(map.values());
    }, [allPosts, userPosts]);

    const value = {
        // Feed posts
        allPosts,
        isFeedLoading,
        feedError,
        fetchFeedPosts,

        // User posts
        userPosts,
        userPostCount,
        isUserPostsLoading,
        userPostsError,
        fetchMyPosts,

        // Saved posts
        savedPosts,

        // Actions
        createPost,
        deletePost,
        likePost,
        savePost,
        resetPost,

        // Compatibility aliases
        posts: userPosts,
        postCount: userPostCount,
        isPostsLoading: isUserPostsLoading,
        postError: userPostsError,
        refreshUserPosts: fetchMyPosts,
    };

    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
