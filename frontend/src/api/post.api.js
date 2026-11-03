import api from './axios';

// 1. Get all posts
const getPosts = async (accessToken) => {
    const response = await api.get('/posts', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return response.data.data;
};

const getPostById = async (accessToken, postId) => {
    const response = await api.get(`/posts/${postId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return response.data.data.post;
};

// 2. Create a post
const createPost = async (postData, accessToken) => {
    const response = await api.post('/posts', postData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return response.data.data;
};

// 3. Delete a post
const deletePost = async (postId, accessToken) => {
    const response = await api.delete(`/posts/${postId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return response.data.data;
};

// 4. Like a post
const likePost = async (postId, accessToken) => {
    const response = await api.post(
        `/posts/${postId}/likes`,
        {},
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    return response.data.data;
};

// 5. Unlike a post
const unlikePost = async (postId, accessToken) => {
    const response = await api.delete(
        `/posts/${postId}/likes`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    return response.data.data;
};

const savePost = async (postId, accessToken) => {
    const response = await api.post(
        `/posts/${postId}/saves`,
        {},
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return response.data.data;
};

const unsavePost = async (postId, accessToken) => {
    const response = await api.delete(
        `/posts/${postId}/saves`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return response.data.data;
};

const likeComment = async (commentId, accessToken) => {
    const response = await api.post(
        `/posts/comments/${commentId}/likes`,
        {},
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return response.data.data;
};

const unlikeComment = async (commentId, accessToken) => {
    const response = await api.delete(
        `/posts/comments/${commentId}/likes`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return response.data.data;
};

// 6. Create a comment
const createComment = async (
    postId,
    comment,
    parentComment,
    accessToken
) => {
    const response = await api.post(
        `/posts/${postId}/comments`,
        {
            comment,
            parentComment: parentComment || null,
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    return response.data.data;
};

const deleteComment = async (accessToken, commentId) => {
    const response = await api.delete(
        `/posts/${commentId}/comments`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    return response.data.data;
};

const updateComment = async (
    accessToken,
    commentId,
    newComment
) => {
    const response = await api.patch(
        `/posts/${commentId}/comments`,
        {
            newComment,
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    return response.data.data;
};

const fetchPostsComments = async (accessToken, postId) => {
    const response = await api.get(
        `/posts/${postId}/comments`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    return response.data.data;
};

export {
    getPosts,
    getPostById,
    createPost,
    deletePost,
    likePost,
    unlikePost,
    savePost,
    unsavePost,
    likeComment,
    unlikeComment,
    createComment,
    deleteComment,
    updateComment,
    fetchPostsComments,
};
