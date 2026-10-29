import { useContext, useState } from 'react';
import {
    CreatePostHeader,
    CreatePostTabs,
    CreatePostEditor,
    CreatePostPreview,
    CreatePostActions,
    CreatePostReminder,
} from '../../components/CreatePost';
import UserContext from '../../context/userContext/userContext';
import PostContext from '../../context/postContext/postContext';
import { toast } from 'react-toastify';
import getErrorMessage from '../../utils/getErrorMessage';
import { useNavigate } from 'react-router-dom';

/**
 * CreatePost — page for creating a new post
 *
 * Uses PostContext.createPost so the feed and profile
 * update automatically after publishing.
 */
const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPreview, setIsPreview] = useState(false);
    const [isPosting, setIsPosting] = useState(false);

    const { isAuthLoading, user } = useContext(UserContext);
    const { createPost } = useContext(PostContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isAuthLoading || !user?.accessToken) {
            toast.error(
                'You must be logged in to create a post.'
            );
            return;
        }

        if (isPosting) return;

        try {
            setIsPosting(true);

            await createPost({
                title: title.trim(),
                content: content.trim(),
            });

            toast.success('Post created successfully.');

            navigate('/');
        } catch (error) {
            toast.error(
                getErrorMessage(
                    error,
                    'Post creation failed.'
                )
            );
        } finally {
            setIsPosting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto flex w-full max-w-3xl flex-col px-4 py-8 sm:px-6 lg:py-12"
        >
            {/* ── Page Header & Navigation ── */}
            <CreatePostHeader />

            {/* ── Editor Card ── */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
                {/* Write / Preview Tab Switcher */}
                <CreatePostTabs
                    isPreview={isPreview}
                    setIsPreview={setIsPreview}
                />

                {/* Editor / Preview Content */}
                {!isPreview ? (
                    <CreatePostEditor
                        title={title}
                        setTitle={setTitle}
                        content={content}
                        setContent={setContent}
                    />
                ) : (
                    <CreatePostPreview
                        title={title}
                        content={content}
                    />
                )}

                {/* Divider */}
                <div className="my-6 border-t border-border" />

                {/* Guidelines & Actions (Cancel, Publish) */}
                <CreatePostActions
                    isSubmitting={isPosting}
                />
            </div>

            {/* ── Anonymous Notice ── */}
            <CreatePostReminder />
        </form>
    );
};

export default CreatePost;
