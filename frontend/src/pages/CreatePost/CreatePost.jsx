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
import { toast } from 'react-toastify';
import getErrorMessage from '../../utils/getErrorMessage';
import { createPost } from '../../api/post.api';
import { useNavigate } from 'react-router-dom';

/**
 * CreatePost — page for creating a new post
 *
 * Uses a semantic <form> container and clean modular subcomponents.
 * Ready for you to attach your submit handler and state logic.
 */
const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPreview, setIsPreview] = useState(false);
    const [isPosting, setIsPosting] = useState(false);

    const { isAuthLoading, user } = useContext(UserContext);

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

            await createPost(
                {
                    title: title.trim(),
                    content: content.trim(),
                },
                user.accessToken
            );

            toast.success('Post created successfully.');

            navigate('/');
        } catch (error) {
            toast.error(
                getErrorMessage(
                    error?.message ||
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
