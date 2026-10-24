import api from './axios';

// Register a user
const registerUser = async (userData) => {
    const response = await api.post(
        '/users/register',
        userData
    );
    return response.data.data;
};

const loginUser = async (credentials) => {
    const response = await api.post(
        '/users/login',
        credentials
    );
    return response.data.data;
};

const getCurrentUser = async (accessToken) => {
    const response = await api.get('/users/current-user', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data.data;
};

const refreshAccessToken = async () => {
    const response = await api.post(
        '/users/refresh-access-token'
    );

    return response.data.data;
};

const logoutUser = async (accessToken) => {
    const response = await api.get('/users/logout', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data.data;
};

export {
    registerUser,
    loginUser,
    getCurrentUser,
    refreshAccessToken,
    logoutUser,
};
