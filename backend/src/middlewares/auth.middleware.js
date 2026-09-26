import User from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';

const verifyJWT = asyncHandler(async (req, _, next) => {
    const authHeader = req.headers?.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError(
            401,
            'Access token is required.'
        );
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        throw new ApiError(401, 'Unauthorized access.');
    }

    try {
        const decodedToken = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        const user = await User.findById(
            decodedToken.id
        ).select('-password -refreshToken -recoveryKey');

        if (!user) {
            throw new ApiError(
                401,
                'Invalid access token.'
            );
        }

        req.user = user;

        next();
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        throw new ApiError(
            401,
            'Invalid or expired access token.'
        );
    }
});

export { verifyJWT };
