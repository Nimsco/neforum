import { randomBytes } from 'node:crypto';
import { ApiError } from './ApiError.js';

const generateRecoveryKey = (length) => {
    try {
        if (!Number.isInteger(length) || length < 1) {
            throw new Error(
                'Recovery key length must be positive.'
            );
        }
        return randomBytes(Math.ceil(length / 2))
            .toString('hex')
            .slice(0, length);
    } catch (error) {
        throw new ApiError(
            error.statusCode || 500,
            error.message || 'Error generating recovery key'
        );
    }
};

export { generateRecoveryKey };
