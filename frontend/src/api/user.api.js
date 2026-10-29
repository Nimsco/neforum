import api from './axios';

const fetchUserPosts = async (accessToken) => {
    const response = await api.get('/users/user-posts', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data.data;
};

export { fetchUserPosts };
