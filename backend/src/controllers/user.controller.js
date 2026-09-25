import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import {
    validatePassword,
    validateUsername,
} from '../utils/validators.js';
import {
    generateAccessToken,
    generateRefreshToken,
} from '../utils/generateTokens.js';
import User from '../models/user.model.js';

const registerUser = async (req, res) => {
    try {
        const { username, password, confirmPassword } =
            req.body;

        await validateUsername(username);

        await validatePassword(password, confirmPassword);

        const user = new User({
            username,
            password,
        });

        await user.save();

        const refreshToken = generateRefreshToken(user);
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        const accessToken = generateAccessToken(user);

        return res
            .status(201)
            .cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure:
                    process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            })
            .json(
                new ApiResponse(
                    201,
                    {
                        user: {
                            id: user._id,
                            username: user.username,
                        },
                        accessToken,
                    },
                    'User registered successfully'
                )
            );
    } catch (error) {
        throw new ApiError(
            error.statusCode || 500,
            error.message || 'Internal Server Error'
        );
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            throw new ApiError(
                400,
                'Username and password are required'
            );
        }

        const user = await User.findOne({ username });

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        if (user.isBlocked) {
            throw new ApiError(
                403,
                'User is blocked. Please contact support.'
            );
        }

        const isMatch =
            await user.comparePassword(password);

        if (!isMatch) {
            throw new ApiError(401, 'Invalid credentials');
        }

        const refreshToken = generateRefreshToken(user);
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        const accessToken = generateAccessToken(user);

        return res
            .status(200)
            .cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure:
                    process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            })
            .json(
                new ApiResponse(
                    200,
                    {
                        user: {
                            id: user._id,
                            username: user.username,
                        },
                        accessToken,
                    },
                    'User logged in successfully'
                )
            );
    } catch (error) {
        throw new ApiError(
            error.statusCode || 500,
            error.message || 'Internal Server Error'
        );
    }
};

export { registerUser, loginUser };
