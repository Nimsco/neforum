import { ApiError } from './ApiError.js';
import { ApiResponse } from './ApiResponse.js';
import User from '../models/user.model.js';

const validatePassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        throw new ApiError(400, 'Passwords do not match');
    }

    if (password.length < 6) {
        throw new ApiError(
            400,
            'Password must be at least 6 characters long'
        );
    }

    if (!/[A-Z]/.test(password)) {
        throw new ApiError(
            400,
            'Password must contain at least one uppercase letter'
        );
    }

    if (!/[a-z]/.test(password)) {
        throw new ApiError(
            400,
            'Password must contain at least one lowercase letter'
        );
    }

    if (!/[0-9]/.test(password)) {
        throw new ApiError(
            400,
            'Password must contain at least one number'
        );
    }
};

const validateUsername = async (inputUsername) => {
    const user = await User.findOne({
        username: inputUsername,
    });

    if (user) {
        throw new ApiError(400, 'Username already exists');
    }

    if (!inputUsername || inputUsername.trim() === '') {
        throw new ApiError(400, 'Username is required');
    }

    if (inputUsername.length < 3) {
        throw new ApiError(
            400,
            'Username must be at least 3 characters long'
        );
    }

    if (inputUsername.length > 50) {
        throw new ApiError(
            400,
            'Username must be less than 50 characters long'
        );
    }
};

export { validatePassword, validateUsername };
