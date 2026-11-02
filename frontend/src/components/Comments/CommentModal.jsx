import { useContext, useEffect, useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { toast } from 'react-toastify';
import {
    createComment,
    deleteComment,
    fetchPostsComments,
} from '../../api/post.api';
import UserContext from '../../context/userContext/userContext';
import PostContext from '../../context/postContext/postContext';
import getErrorMessage from '../../utils/getErrorMessage';
import CommentList from './CommentList';
import CommentComposer from './CommentComposer';

const CommentModal = ({ isOpen, onClose, post }) => {
    const { user } = useContext(UserContext);
    const { changePostCommentCount } =
        useContext(PostContext);
    const [comments, setComments] = useState([]);
    const [commentCount, setCommentCount] = useState(0);
    const [replyTo, setReplyTo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isPosting, setIsPosting] = useState(false);

    const postId = post?._id || post?.id;
    const accessToken = user?.accessToken;

    // Load comments whenever the selected post changes or the modal opens.
    useEffect(() => {
        if (!isOpen || !postId || !accessToken) {
            setIsLoading(false);
            if (!isOpen) {
                setComments([]);
                setReplyTo(null);
            }
            return;
        }

        let cancelled = false;
        setComments([]);
        setReplyTo(null);
        setIsLoading(true);

        const loadComments = async () => {
            try {
                const data = await fetchPostsComments(
                    accessToken,
                    postId
                );
                const list = Array.isArray(data?.comments)
                    ? data.comments
                    : Array.isArray(data)
                      ? data
                      : [];

                if (!cancelled) {
                    setComments(list);
                    setCommentCount(
                        (count) => count || list.length
                    );
                }
            } catch (error) {
                if (!cancelled) {
                    toast.error(
                        getErrorMessage(
                            error,
                            'Could not load comments.'
                        )
                    );
                }
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };

        loadComments();
        return () => {
            cancelled = true;
        };
    }, [accessToken, isOpen, postId]);

    // Keep the count in sync with the selected post and local changes.
    useEffect(() => {
        if (isOpen)
            setCommentCount(post?.commentCount ?? 0);
    }, [isOpen, post?.commentCount, postId]);

    // Escape closes the dialog and the page behind it cannot scroll.
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') onClose?.();
        };
        const originalOverflow =
            document.body.style.overflow;

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener(
                'keydown',
                handleKeyDown
            );
        };
    }, [isOpen, onClose]);

    const handleAddComment = async (text) => {
        if (!text || isPosting || !postId || !accessToken) {
            return false;
        }

        try {
            setIsPosting(true);
            const created = await createComment(
                postId,
                text,
                replyTo?._id || replyTo?.id || null,
                accessToken
            );
            const comment = {
                ...created,
                user:
                    typeof created.user === 'object' &&
                    created.user !== null
                        ? created.user
                        : {
                              _id: user?._id || user?.id,
                              username: user?.username,
                          },
            };

            setComments((previous) =>
                replyTo
                    ? [...previous, comment]
                    : [comment, ...previous]
            );
            setReplyTo(null);
            setCommentCount((count) => count + 1);
            changePostCommentCount(postId, 1);
            return true;
        } catch (error) {
            toast.error(
                getErrorMessage(
                    error,
                    'Could not post comment.'
                )
            );
            return false;
        } finally {
            setIsPosting(false);
        }
    };

    const handleDeleteComment = async (comment) => {
        const commentId = comment?._id || comment?.id;
        if (!commentId || !accessToken) return;

        try {
            await deleteComment(accessToken, commentId);
            setComments((previous) =>
                previous.filter(
                    (item) =>
                        (item._id || item.id) !== commentId
                )
            );
            setCommentCount((count) =>
                Math.max(0, count - 1)
            );
            changePostCommentCount(postId, -1);
        } catch (error) {
            toast.error(
                getErrorMessage(
                    error,
                    'Could not delete comment.'
                )
            );
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 sm:py-6"
            role="dialog"
            aria-modal="true"
        >
            <div
                onClick={onClose}
                className="fixed inset-0 bg-dark/60 backdrop-blur-sm animate-backdrop transition-opacity cursor-pointer"
            />

            <div className="relative z-10 flex flex-col w-full max-w-lg max-h-[85vh] rounded-2xl border border-border bg-card shadow-2xl overflow-hidden animate-modal-pop">
                <div className="flex flex-col border-b border-border px-5 py-4 shrink-0">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <MessageSquare className="h-4 w-4" />
                            </div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-base font-semibold text-foreground">
                                    Comments
                                </h2>
                                <span className="inline-flex items-center rounded-full bg-foreground/10 px-2 py-0.5 text-xs font-medium text-foreground">
                                    {commentCount}
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-all hover:bg-foreground/10 hover:text-foreground hover:rotate-90 cursor-pointer"
                            aria-label="Close comments"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    {post?.title && (
                        <div className="mt-2 text-xs text-muted">
                            <span>On: </span>
                            <span className="font-medium text-foreground/85 line-clamp-1">
                                &ldquo;{post.title}&rdquo;
                            </span>
                        </div>
                    )}
                </div>

                <CommentList
                    comments={comments}
                    currentUserId={user?._id || user?.id}
                    isLoading={isLoading}
                    onDelete={handleDeleteComment}
                    onReply={setReplyTo}
                />

                <CommentComposer
                    isPosting={isPosting}
                    onCancelReply={() => setReplyTo(null)}
                    onSubmit={handleAddComment}
                    replyTo={replyTo}
                />
            </div>
        </div>
    );
};

export default CommentModal;
