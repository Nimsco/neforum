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

const getPosts = async (accessToken) => {
    const response = await api.get('/posts/get-posts', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data.data;
};

export { createPost, getPosts };
