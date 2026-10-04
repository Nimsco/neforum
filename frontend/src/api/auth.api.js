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

export { registerUser, loginUser };
