const User = require('../models/UserModel.js');
const bcrypt = require('bcryptjs');
const ApiResponse = require('../Utils/ApiResponse.js');
const ApiErrorHandler = require('../Utils/ApiErrorHandler.js');

exports.signUp = async (req, res) => {
    let { username, email, phone, password, name } = req.body;
    const phoneNumberRegex = /^[0-9]{10,15}$/;

    try {
        let findEmail = await User.findOne({ email });
        if (findEmail) {
            throw new ApiErrorHandler(400, "Email already exists");
        }

        if (!phoneNumberRegex.test(phone)) {
            throw new ApiErrorHandler(400, "Please enter a valid phone number");
        }

        let findUsername = await User.findOne({ username });
        if (findUsername) {
            throw new ApiErrorHandler(400, "Username already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        let user = await User.create({
            username,
            email,
            phone,
            password: hash,
            name
        });

        let createdUser = await User.findById(user._id).select("-__v");
        if (!createdUser) {
            throw new ApiErrorHandler(500, "Error retrieving created user");
        }

        res.status(201).json(new ApiResponse(201, createdUser, "User created successfully"));
    } catch (error) {
        if (error instanceof ApiErrorHandler) {
            return res.status(error.statusCode).json({
                statusCode: error.statusCode,
                message: error.message,
                success: false,
                data: null,
                errors: error.errors
            });
        }
        console.error(error);
        return res.status(500).json(new ApiErrorHandler(500, "Error signing up the user"));
    }
};

exports.login = async (req, res) => {
    let { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            throw new ApiErrorHandler(404, "User not found");
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new ApiErrorHandler(400, "Invalid password");
        }

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        };

        res.status(200)
            .cookie("userId", user._id, options)
            .json(new ApiResponse(
                200,
                {
                    fname: user.name,
                    email: user.email,
                    phone: user.phone,
                    id: user._id
                },
                "User logged in successfully"
            ));
    } catch (error) {
        if (error instanceof ApiErrorHandler) {
            return res.status(error.statusCode).json({
                statusCode: error.statusCode,
                message: error.message,
                success: false,
                data: null,
                errors: error.errors
            });
        }
        console.error(error);
        res.status(500).json(new ApiErrorHandler(500, "Error logging in the user"));
    }
};

exports.logout = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            throw new ApiErrorHandler(400, "User ID is required");
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new ApiErrorHandler(404, "User not found");
        }

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        };

        res.clearCookie("userId", options);

        return res.status(200).json(new ApiResponse(
            200,
            null,
            "User logged out successfully"
        ));

    } catch (error) {
        if (error instanceof ApiErrorHandler) {
            return res.status(error.statusCode).json({
                statusCode: error.statusCode,
                message: error.message,
                success: false,
                data: null,
                errors: error.errors
            });
        }
        console.error(error);
        return res.status(500).json(new ApiErrorHandler(500, "Error logging out the user"));
    }
};

exports.verifyAuth = async (req, res) => {
    try {
        const userId = req.cookies.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'No authentication token found'
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid authentication'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Authentication valid'
        });
    } catch (error) {
        console.error('Auth verification error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error verifying authentication'
        });
    }
};