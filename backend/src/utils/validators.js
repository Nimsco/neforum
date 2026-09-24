import { ApiError } from "./ApiError";
import { ApiResponse } from "./ApiResponse";
import User from "../models/user.model";

const validatePassword = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    throw new ApiError(400, "Passwords do not match");
  }

  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters long");
  }

  if (!/[A-Z]/.test(password)) {
    throw new ApiError(
      400,
      "Password must contain at least one uppercase letter",
    );
  }

  if (!/[a-z]/.test(password)) {
    throw new ApiError(
      400,
      "Password must contain at least one lowercase letter",
    );
  }

  if (!/[0-9]/.test(password)) {
    throw new ApiError(400, "Password must contain at least one number");
  }
};

const validateUsername = (username) => {
  const user = User.findOne({ username: username });

  if (user) {
    throw new ApiError(400, "Username already exists");
  }

  if (!username || username.trim() === "") {
    throw new ApiError(400, "Username is required");
  }

  if (username.length < 3) {
    throw new ApiError(400, "Username must be at least 3 characters long");
  }

  if (username.length > 50) {
    throw new ApiError(400, "Username must be less than 50 characters long");
  }
};

const validateEmail = (email) => {
  const email = User.findOne({ email: email });

  if (email) {
    throw new ApiError(400, "Email already exists");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Invalid email format");
  }
};

export { validatePassword, validateUsername, validateEmail };
