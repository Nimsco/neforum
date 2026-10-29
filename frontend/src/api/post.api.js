import api from './axios';

const createPost = async (postData, accessToken) => {
    const response = await api.post(
        '/post/create-post',
        postData,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return response.data.data;
};

const fetchAllPosts = async (accessToken) => {
    const response = await api.get('/post/get-posts', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data.data;
};

const deletePost = async (postId, accessToken) => {
    const response = await api.post(
        '/post/delete-post',
        { postId },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return response.data.data;
};

export { createPost, fetchAllPosts, deletePost };
