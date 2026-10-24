import { useEffect } from 'react';
import CommentHeader from './CommentHeader';
import CommentList from './CommentList';
import CommentInput from './CommentInput';

/**
 * CommentModal
 *
 * Full-featured popup modal for displaying and adding comments.
 * Incorporates backdrop blur, pop-in animation, and responsive layout.
 *
 * @param {boolean}  isOpen          - Controls visibility of modal
 * @param {function} onClose         - Callback to close the modal
 * @param {object}   post            - The active post object
 * @param {array}    comments        - Array of comment items
 * @param {boolean}  isLoading       - Loading state when fetching comments
 * @param {boolean}  isPosting       - Loading state when creating a comment
 * @param {function} onAddComment    - Callback when new comment is submitted
 * @param {function} onLikeComment   - Callback when a comment is liked
 * @param {function} onReplyComment  - Callback when a comment reply is clicked
 * @param {function} onDeleteComment - Callback when a comment is deleted
 */
const CommentModal = ({
    isOpen,
    onClose,
    post,
    comments = [],
    isLoading = false,
    isPosting = false,
    onAddComment,
    onLikeComment,
    onReplyComment,
    onDeleteComment,
}) => {
    // Close on Escape key press & prevent background scroll
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose?.();
            }
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

    if (!isOpen) return null;

    const commentCount =
        comments.length || post?.commentCount || 0;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 sm:py-6"
            role="dialog"
            aria-modal="true"
        >
            {/* Backdrop with blur & fade */}
            <div
                onClick={onClose}
                className="fixed inset-0 bg-dark/60 backdrop-blur-sm animate-backdrop transition-opacity cursor-pointer"
            />

            {/* Modal Dialog Card */}
            <div className="relative z-10 flex flex-col w-full max-w-lg max-h-[85vh] rounded-2xl border border-border bg-card shadow-2xl overflow-hidden animate-modal-pop">
                {/* Header */}
                <CommentHeader
                    post={post}
                    commentCount={commentCount}
                    onClose={onClose}
                />

                {/* Comment list or empty state */}
                <CommentList
                    comments={comments}
                    isLoading={isLoading}
                    onLikeComment={onLikeComment}
                    onReplyComment={onReplyComment}
                    onDeleteComment={onDeleteComment}
                />

                {/* Input composer */}
                <CommentInput
                    onSubmit={onAddComment}
                    isPosting={isPosting}
                />
            </div>
        </div>
    );
};

export default CommentModal;
