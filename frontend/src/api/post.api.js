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

export { createPost };
