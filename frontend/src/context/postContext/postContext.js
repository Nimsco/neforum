import { createContext, useContext } from 'react';

const PostContext = createContext(null);

/**
 * Custom hook to easily consume PostContext
 * Usage: const { allPosts, createPost, ... } = usePosts();
 */
export const usePosts = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error(
            'usePosts must be used within a PostContextProvider'
        );
    }
    return context;
};

export default PostContext;
