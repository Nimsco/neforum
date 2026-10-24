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

const validateNewPassword = (password) => {
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

const validatePost = (postTitle, postContent) => {
    const title = postTitle.trim();
    const content = postContent.trim();

    if (!title || !content) {
        throw new ApiError(401, 'Title or post missing.');
    }

    if (title.length < 1 || content.length < 1) {
        throw new ApiError(
            401,
            'Title or content must have at least 1 character.'
        );
    }

    if (title.length > 100) {
        throw new ApiError(
            401,
            'Title length must be below 100 characters.'
        );
    }

    if (content.length > 3000) {
        throw new ApiError(
            401,
            'Content length must be below 3000 characters.'
        );
    }
};

export {
    validatePassword,
    validateUsername,
    validateNewPassword,
    validatePost,
};
