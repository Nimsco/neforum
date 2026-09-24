import { ApiError } from "./ApiError";
import { ApiResponse } from "./ApiResponse";

const validatePassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        throw new ApiError(400, "Passwords do not match");
    }

    if (password.length < 6) {
        throw new ApiError(400, "Password must be at least 6 characters long");
    }
    
    if (!/[A-Z]/.test(password)) {
        throw new ApiError(400, "Password must contain at least one uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
        throw new ApiError(400, "Password must contain at least one lowercase letter");
    }

    if (!/[0-9]/.test(password)) {
        throw new ApiError(400, "Password must contain at least one number");
    }
};

const validateUsername = (username) => {
    if (!username || username.trim() === "") {
        throw new ApiError(400, "Username is required");
    }
    
    if (username.length < 3) {
        throw new ApiError(400, "Username must be at least 3 characters long");
    }
};

    const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.trim() === "") {
        throw new ApiError(400, "Email is required");
    }

    if (!emailRegex.test(email)) {
        throw new ApiError(400, "Invalid email format");
    }
};

export { validatePassword, validateUsername, validateEmail };