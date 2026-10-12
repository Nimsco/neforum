import { ApiError } from './ApiError.js';
import jwt from 'jsonwebtoken';

const verifyRefreshToken = (refreshToken) => {
    try {
        const decodedToken = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
        return decodedToken;
    } catch (error) {
        throw new ApiError(
            401,
            'Invalid Or Expired Refresh Token.'
        );
    }
};

export { verifyRefreshToken };
