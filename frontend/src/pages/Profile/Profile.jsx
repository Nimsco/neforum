import { useContext, useEffect, useState } from 'react';
import {
    ProfileHeader,
    ProfileTabs,
    ProfileContentArea,
} from '../../components/Profile';
import UserContext from '../../context/userContext';
import { toast } from 'react-toastify';
import { getCurrentUser } from '../../api/auth.api';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('posts');

    const { user, isAuthLoading } = useContext(UserContext);

    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const posts = [];
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

    if (isAuthLoading || isLoading) {
        return <h2>Loading...</h2>;
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
        </div>
    );
};

export default Profile;
