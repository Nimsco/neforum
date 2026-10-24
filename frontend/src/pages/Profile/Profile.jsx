import { useContext, useEffect, useState } from 'react';
import {
    ProfileHeader,
    ProfileTabs,
    ProfileContentArea,
    ChangePasswordModal,
} from '../../components/Profile';
import UserContext from '../../context/userContext/userContext';
import PostContext from '../../context/postContext/postContext';
import { toast } from 'react-toastify';
import {
    getCurrentUser,
    logoutUser,
} from '../../api/auth.api';
import { LoadingScreen } from '../../components/LoadingScreen';
import getErrorMessage from '../../utils/getErrorMessage';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('posts');
    const [isChangePasswordOpen, setIsChangePasswordOpen] =
        useState(false);

    const { user, isAuthLoading, resetUser } =
        useContext(UserContext);

    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const {
        posts,
        postCount,
        isPostsLoading,
        postError,
        refreshUserPosts,
        resetPost,
    } = useContext(PostContext);

    const comments = [];
    const saved = [];

    useEffect(() => {
        if (isAuthLoading || !user?.accessToken) return;

        const fetchUser = async () => {
            try {
                const response = await getCurrentUser(
                    user.accessToken
                );
                setCurrentUser(response.user);
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                        'Failed to fetch user.'
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [user?.accessToken, isAuthLoading]);

    const handleLogout = async () => {
        if (!user.accessToken) return;

        try {
            await logoutUser(user.accessToken);

            toast.success('Logged out successfully.');

            navigate('/login');
        } catch (error) {
            toast.error(
                getErrorMessage(
                    error?.message || 'Failed to logout.'
                )
            );
        } finally {
            resetUser();
            resetPost();
        }
    };

    const handleChangePasswordSubmit = (formData) => {
        // Ready for your change password logic
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
                    postCount={posts.length}
                    commentCount={comments.length}
                    onChangePassword={() =>
                        setIsChangePasswordOpen(true)
                    }
                    onLogout={handleLogout}
                />

                <ProfileTabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                <div className="w-full">
                    <ProfileContentArea
                        activeTab={activeTab}
                        posts={posts}
                        comments={comments}
                        saved={saved}
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
            />
        </div>
    );
};

export default Profile;
