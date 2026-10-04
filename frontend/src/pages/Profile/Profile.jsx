import { useContext, useState } from 'react';
import {
    ProfileHeader,
    ProfileTabs,
    ProfileContentArea,
} from '../../components/Profile';
import UserContext from '../../context/userContext';

/**
 * Profile Page
 *
 * Composes the modular profile components.
 *
 * ─── What you need to wire up ───
 *  • Fetch the user, posts, comments, and saved data from your API.
 *  • Pass them as props / replace the placeholder values below.
 *  • The tab switching is already handled via local state.
 */

const Profile = () => {
    const [activeTab, setActiveTab] = useState('posts');

    /* ──────────────────────────────────────────────────
     *  TODO: Replace these with real data from your API.
     * ────────────────────────────────────────────────── */
    const {user} = useContext(UserContext); // e.g. { username, createdAt }
    const posts = []; // array of post objects
    const comments = []; // array of comment objects
    const saved = []; // array of saved post objects
    /* ────────────────────────────────────────────────── */

    return (
        <div className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6">
                {/* ── Header card (avatar + stats) ── */}
                <ProfileHeader
                    user={user.username}
                    postCount={posts.length}
                    commentCount={comments.length}
                />

                {/* ── Tab bar ── */}
                <ProfileTabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                {/* ── Content area ── */}
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
