import { useContext, useEffect, useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { toast } from 'react-toastify';
import {
    createComment,
    deleteComment,
    fetchPostsComments,
    likeComment,
    unlikeComment,
} from '../../api/post.api';
import UserContext from '../../context/userContext/userContext';
import PostContext from '../../context/postContext/postContext';
import getErrorMessage from '../../utils/getErrorMessage';
import CommentList from './CommentList';
import CommentComposer from './CommentComposer';

const CommentModal = ({
    isOpen,
    onClose,
    post,
    showPostDetails = false,
}) => {
    const { user } = useContext(UserContext);
    const { changePostCommentCount } =
        useContext(PostContext);
    const [comments, setComments] = useState([]);
    const [commentCount, setCommentCount] = useState(
        post?.commentCount ?? 0
    );
    const [replyTo, setReplyTo] = useState(null);
    const [loadResult, setLoadResult] = useState(null);
    const [isPosting, setIsPosting] = useState(false);

    const postId = post?._id || post?.id;
    const accessToken = user?.accessToken;
    const isLoading = Boolean(
        isOpen &&
        postId &&
        accessToken &&
        (loadResult?.postId !== postId ||
            loadResult.loading)
    );
    const postDate = post?.createdAt
        ? new Date(post.createdAt).toLocaleString('en-US', {
              dateStyle: 'medium',
              timeStyle: 'short',
          })
        : null;

    // Load comments whenever the selected post changes or the modal opens.
    useEffect(() => {
        if (!isOpen || !postId || !accessToken) {
            return;
        }

        let cancelled = false;

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
                        post?.commentCount ?? list.length
                    );
                    setLoadResult({
                        postId,
                        loading: false,
                    });
                }
            } catch (error) {
                if (!cancelled) {
                    setLoadResult({
                        postId,
                        loading: false,
                    });
                    toast.error(
                        getErrorMessage(
                            error,
                            'Could not load comments.'
                        )
                    );
                }
            }
        };

        loadComments();
        return () => {
            cancelled = true;
        };
    }, [accessToken, isOpen, postId, post?.commentCount]);

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
                likeCount: created.likeCount ?? 0,
                isLiked: created.isLiked ?? false,
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
            const removedIds = new Set([String(commentId)]);
            if (!comment.parentComment) {
                comments.forEach((item) => {
                    const parentId =
                        item.parentComment?._id ||
                        item.parentComment?.id ||
                        item.parentComment;
                    if (
                        String(parentId) ===
                        String(commentId)
                    ) {
                        removedIds.add(
                            String(item._id || item.id)
                        );
                    }
                });
            }
            setComments((previous) =>
                previous.filter(
                    (item) =>
                        !removedIds.has(
                            String(item._id || item.id)
                        )
                )
            );
            setCommentCount((count) =>
                Math.max(0, count - removedIds.size)
            );
            changePostCommentCount(
                postId,
                -removedIds.size
            );
        } catch (error) {
            toast.error(
                getErrorMessage(
                    error,
                    'Could not delete comment.'
                )
            );
        }
    };

    const handleLikeComment = async (
        comment,
        shouldLike
    ) => {
        const commentId = comment?._id || comment?.id;
        if (!commentId || !accessToken) return;

        try {
            const result = shouldLike
                ? await likeComment(commentId, accessToken)
                : await unlikeComment(
                      commentId,
                      accessToken
                  );
            setComments((previous) =>
                previous.map((item) =>
                    (item._id || item.id) === commentId
                        ? {
                              ...item,
                              likeCount: result.likeCount,
                              isLiked: result.isLiked,
                          }
                        : item
                )
            );
        } catch (error) {
            toast.error(
                getErrorMessage(
                    error,
                    'Could not update comment like.'
                )
            );
            throw error;
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

            <div
                className={`relative z-10 flex flex-col w-full ${showPostDetails ? 'max-w-2xl' : 'max-w-lg'} max-h-[90vh] rounded-2xl border border-border bg-card shadow-2xl overflow-hidden animate-modal-pop`}
            >
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

                    {showPostDetails ? (
                        <div className="mt-4 max-h-64 overflow-y-auto rounded-xl border border-border/70 bg-background/60 p-4">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
                                <span className="font-semibold text-primary">
                                    {post?.topic ||
                                        'General'}
                                </span>
                                {(post?.author?.username ||
                                    post?.user
                                        ?.username) && (
                                    <span>
                                        · @
                                        {post.author
                                            ?.username ||
                                            post.user
                                                ?.username}
                                    </span>
                                )}
                                {postDate && (
                                    <span>
                                        · {postDate}
                                    </span>
                                )}
                            </div>
                            <h3 className="mt-2 text-lg font-bold leading-snug text-foreground">
                                {post?.title ||
                                    'Untitled post'}
                            </h3>
                            {post?.content && (
                                <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground/85">
                                    {post.content}
                                </p>
                            )}
                            <div className="mt-3 flex items-center gap-4 border-t border-border/60 pt-3 text-xs text-muted">
                                <span>
                                    {post?.likeCount ?? 0}{' '}
                                    likes
                                </span>
                                <span>
                                    {post?.commentCount ??
                                        0}{' '}
                                    comments
                                </span>
                            </div>
                        </div>
                    ) : post?.title ? (
                        <div className="mt-2 text-xs text-muted">
                            <span>On: </span>
                            <span className="font-medium text-foreground/85 line-clamp-1">
                                &ldquo;{post.title}&rdquo;
                            </span>
                        </div>
                    ) : null}
                </div>

                <CommentList
                    comments={comments}
                    currentUserId={user?._id || user?.id}
                    isLoading={isLoading}
                    onDelete={handleDeleteComment}
                    onLike={handleLikeComment}
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
