import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { validatePassword, validateUsername, validateEmail } from "../utils/validators";

const registerUser = async (req, res) => {
    try {
        const { username, email, password, confirmPassword, gender } = req.body;

        validateUsername(username);
        validateEmail(email);
        validatePassword(password, confirmPassword);


    } catch (error) {
        throw new ApiError(500, "Internal Server Error", error.message);
    }
};