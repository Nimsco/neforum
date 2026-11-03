import api from './axios';

// Register a user
const registerUser = async (userData) => {
    const response = await api.post(
        '/auth/register',
        userData
    );
    return response.data.data;
};

const loginUser = async (credentials) => {
    const response = await api.post(
        '/auth/login',
        credentials
    );
    return response.data.data;
};

const refreshAccessToken = async () => {
    const response = await api.post('/auth/refresh');
    return response.data.data;
};

const logoutUser = async (accessToken) => {
    const response = await api.post(
        '/auth/logout',
        {},
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return response.data.data;
};

const changeUserPassword = async (
    accessToken,
    recoveryKey,
    newPassword,
    confirmNewPassword
) => {
    const response = await api.patch(
        '/users/me/password',
        {
            recoveryKey,
            newPassword,
            confirmNewPassword,
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    return response.data.data;
};

export {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
    changeUserPassword,
};
