import api from './axios';

// Get current logged-in user
const getCurrentUser = async (accessToken) => {
    const response = await api.get('/users/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return response.data.data;
};

// Get posts created by the logged-in user
const fetchUserPosts = async (accessToken) => {
    const response = await api.get('/users/me/posts', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return response.data.data;
};

export { getCurrentUser, fetchUserPosts };
