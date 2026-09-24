import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { validatePassword, validateUsername, validateEmail } from "../utils/validators";
import { User } from "../models/User";
import bcrypt from "bcryptjs";

const registerUser = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        validateUsername(username);
        validateEmail(email);
        validatePassword(password, confirmPassword);
        
        const hashedPassword = await bcrypt.hash(password,10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });
        
        await user.save();

        return res.status(201).json(new ApiResponse(201, user, "User registered successfully"));

    } catch (error) {
        throw new ApiError(500, "Internal Server Error", error.message);
    }


};