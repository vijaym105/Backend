import userModel from '../models/user.model.js';
import { sendEmail } from '../services/mail.service.js';

export const register = async (req, res) => {

    const { username, email, password } = req.body

    const isUserExists = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserExists) {
        return res.status(400).json({
            message: `Username or email already exists`,
            success: false
        })
    }

    const user = await userModel.create({
        username,
        email,
        password
    })

    await sendEmail(email, 'Welcome to Perplexity', 
        `Hello ${username},\n\nThank you for registering with Perplexity! We're excited to have you on board.\n\nBest regards,\nThe Perplexity Team`);

    res.status(201).json({
        message: 'User created successfully',
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

