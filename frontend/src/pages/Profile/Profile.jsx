import { useContext, useEffect, useState } from 'react';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import ProfileTabs from '../../components/Profile/ProfileTabs';
import ProfileContentArea from '../../components/Profile/ProfileContentArea';
import ChangePasswordModal from '../../components/Profile/ChangePasswordModal';
import UserContext from '../../context/userContext/userContext';
import PostContext from '../../context/postContext/postContext';
import { toast } from 'react-toastify';
import {
    logoutUser,
    changeUserPassword,
} from '../../api/auth.api';
import {
    getCurrentUser,
    fetchUserStats,
    fetchUserComments,
} from '../../api/user.api';
import { LoadingScreen } from '../../components/LoadingScreen';
import getErrorMessage from '../../utils/getErrorMessage';
import { useNavigate } from 'react-router-dom';
import { LogOut, Trash2 } from 'lucide-react';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('posts');
    const [isChangePasswordOpen, setIsChangePasswordOpen] =
        useState(false);

    const [postToDelete, setPostToDelete] = useState(null);

    const [showLogoutPopup, setShowLogoutPopup] =
        useState(false);
    const [isChangingPassword, setIsChangingPassword] =
        useState(false);

    const { user, isAuthLoading, resetUser } =
        useContext(UserContext);

    const { userPosts, savedPosts, deletePost, resetPost } =
        useContext(PostContext);

    const [currentUser, setCurrentUser] = useState(null);
    const [stats, setStats] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthLoading || !user?.accessToken) return;

        let cancelled = false;

        const loadProfile = async () => {
            const results = await Promise.allSettled([
                getCurrentUser(user.accessToken),
                fetchUserStats(user.accessToken),
                fetchUserComments(user.accessToken),
            ]);

            if (cancelled) return;

            const [
                userResult,
                statsResult,
                commentsResult,
            ] = results;

            if (userResult.status === 'fulfilled') {
                setCurrentUser(userResult.value.user);
            } else {
                setCurrentUser(null);
                toast.error(
                    getErrorMessage(
                        userResult.reason,
                        'Failed to fetch user.'
                    )
                );
            }

            if (statsResult.status === 'fulfilled') {
                setStats(statsResult.value);
            } else {
                setStats(null);
                toast.error(
                    getErrorMessage(
                        statsResult.reason,
                        'Failed to fetch profile stats.'
                    )
                );
            }

            if (commentsResult.status === 'fulfilled') {
                const list = commentsResult.value?.comments;
                setComments(
                    Array.isArray(list) ? list : []
                );
            } else {
                setComments([]);
                toast.error(
                    getErrorMessage(
                        commentsResult.reason,
                        'Failed to fetch your comments.'
                    )
                );
            }

            setIsLoading(false);
        };

        loadProfile();
        return () => {
            cancelled = true;
        };
    }, [user?.accessToken, isAuthLoading]);

    const handleDeletePost = (post) => {
        setPostToDelete(post);
    };

    const confirmDeletePost = async () => {
        if (!postToDelete) return;

        try {
            const deleted = await deletePost(
                postToDelete._id || postToDelete.id
            );

            if (deleted) {
                toast.success('Post deleted successfully.');
            }
        } catch (error) {
            toast.error(
                getErrorMessage(
                    error,
                    'Failed to delete post.'
                )
            );
        } finally {
            setPostToDelete(null);
        }
    };

    const handleLogout = async () => {
        if (!user.accessToken) return;

        try {
            await logoutUser(user.accessToken);

            toast.success('Logged out successfully.');

            navigate('/login');
        } catch (error) {
            toast.error(
                getErrorMessage(error, 'Failed to logout.')
            );
        } finally {
            resetUser();
            resetPost();
        }
    };

    const handleChangePasswordSubmit = async ({
        recoveryKey,
        newPassword,
        confirmPassword,
    }) => {
        if (isChangingPassword) return false;

        if (newPassword !== confirmPassword) {
            toast.error('New passwords do not match.');
            return false;
        }

        setIsChangingPassword(true);
        try {
            await changeUserPassword(
                user.accessToken,
                recoveryKey.trim(),
                newPassword,
                confirmPassword
            );
            toast.success('Password changed successfully.');
            return true;
        } catch (error) {
            toast.error(
                getErrorMessage(
                    error,
                    'Could not change your password.'
                )
            );
            return false;
        } finally {
            setIsChangingPassword(false);
        }
    };

    if (isAuthLoading || isLoading) {
        return <LoadingScreen />;
    }

    if (!currentUser) {
        return <p>Unable to load profile information.</p>;
    }

    return (
        <div className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6">
                <ProfileHeader
                    user={currentUser}
                    postCount={stats?.postCount}
                    commentCount={stats?.commentCount}
                    likeCount={stats?.likeCount}
                    savedCount={savedPosts.length}
                    onChangePassword={() =>
                        setIsChangePasswordOpen(true)
                    }
                    onLogout={() =>
                        setShowLogoutPopup(true)
                    }
                />

                <ProfileTabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                <div className="w-full">
                    <ProfileContentArea
                        activeTab={activeTab}
                        posts={userPosts}
                        comments={comments}
                        saved={savedPosts}
                        onDelete={handleDeletePost}
                    />
                </div>
            </div>

            {/* Change Password Dialog Modal */}
            <ChangePasswordModal
                isOpen={isChangePasswordOpen}
                onClose={() =>
                    setIsChangePasswordOpen(false)
                }
                onSubmit={handleChangePasswordSubmit}
                isSubmitting={isChangingPassword}
            />

            {postToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                            <Trash2 className="h-6 w-6 text-red-500" />
                        </div>

                        <h2 className="text-lg font-semibold text-foreground">
                            Delete post?
                        </h2>

                        <p className="mt-2 text-sm text-muted">
                            Are you sure you want to delete
                            this post? This action cannot be
                            undone.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() =>
                                    setPostToDelete(null)
                                }
                                className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/10"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmDeletePost}
                                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showLogoutPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                            <LogOut className="h-6 w-6 text-red-500" />
                        </div>

                        <h2 className="text-lg font-semibold text-foreground">
                            Logout?
                        </h2>

                        <p className="mt-2 text-sm text-muted">
                            Are you sure you want to logout?
                            You will need to login again to
                            access your account.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    setShowLogoutPopup(
                                        false
                                    )
                                }
                                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted/10 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    handleLogout()
                                }
                                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
