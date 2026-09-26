import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import {
    validateNewPassword,
    validatePassword,
    validateUsername,
} from '../utils/validators.js';
import {
    generateAccessToken,
    generateRefreshToken,
} from '../utils/generateTokens.js';
import User from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateRecoveryKey } from '../utils/generateRecoveryKey.js';
import bcrypt from 'bcryptjs';

const registerUser = asyncHandler(async (req, res) => {
    const { username, password, confirmPassword } =
        req.body;

    await validateUsername(username);

    validatePassword(password, confirmPassword);

    const recoveryKey = generateRecoveryKey(8);

    const user = new User({
        username,
        password,
        recoveryKey,
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
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        })
        .json(
            new ApiResponse(
                201,
                {
                    user: {
                        id: user._id,
                        username: user.username,
                        recoveryKey,
                    },
                    accessToken,
                },
                'User registered successfully'
            )
        );
});

const loginUser = asyncHandler(async (req, res) => {
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

    const isMatch = await user.comparePassword(password);

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
            secure: process.env.NODE_ENV === 'production',
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
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: null,
            },
        },
        {
            new: true,
        }
    );

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    };

    return res
        .status(200)
        .clearCookie('refreshToken', options)
        .json(
            new ApiResponse(
                200,
                {},
                'User logged out successfully.'
            )
        );
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { user: req.user },
                'User Fetched Successfully.'
            )
        );
});

const changeUserPassword = asyncHandler(
    async (req, res) => {
        const { recoveryKey, newPassword } = req.body;

        if (!recoveryKey || !newPassword) {
            throw new ApiError(400, 'No Recovery Key.');
        }

        const userId = req.user._id;

        if (!userId) {
            throw new ApiError(400, 'No User Found.');
        }

        const hashedRecoveryKey =
            await User.findById(userId).select(
                'recoveryKey'
            );

        const isMatch = await bcrypt.compare(
            recoveryKey,
            hashedRecoveryKey.recoveryKey
        );

        if (isMatch == false) {
            throw new ApiError(
                404,
                'Rocovery Key does not match.'
            );
        }

        validateNewPassword(newPassword);

        const user = await User.findById(req.user._id);

        user.password = newPassword;

        await user.save();

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {},
                    'Password has been successfully changed.'
                )
            );
    }
);

export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    changeUserPassword,
};
