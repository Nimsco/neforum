import { ApiError } from './ApiError.js';

const generateRecoveryKey = (length) => {
    try {
        let hexString = '';
        while (hexString.length < length) {
            // Generate a random 32-bit integer and convert it to base-16
            hexString += Math.floor(
                Math.random() * 0xffffffff
            ).toString(16);
        }
        // Trim to the precise requested length
        return hexString.substring(0, length);
    } catch (error) {
        throw new ApiError(
            error.statusCode || 500,
            error.message || 'Error generating recovery key'
        );
    }
};

export { generateRecoveryKey };
