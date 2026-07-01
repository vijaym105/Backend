import userModel from '../models/user.model.js';
import { sendEmail } from '../services/mail.service.js';
import jwt from 'jsonwebtoken';


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

    const emailVerToken = jwt.sign({
        email: user.email
    }, process.env.JWT_SECRET)


    await sendEmail(email, 'Welcome to Perplexity', 
        `Hello ${username},\n\nThank you for registering with Perplexity! We're excited to have you on board.\n\nBest regards,\n
        <p>Verify your email by clicking the link below:</p>
        <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerToken}">Verify Email</a>
        \n\n
         <strong>The Perplexity Team</strong>
         \n\nFor help, please contact us at: vjmalusare10@gmail.com
         
         `);

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

export const login = async (req, res) => {
    const {email, password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message: 'User not found',
            err: "email not found",
            success: false
        })
    }
    
    const isPasswordValid = await user.comparePassword(password)

    if(!isPasswordValid){
        return res.status(400).json({
            message: 'Invalid email or password',
            err: "invalid credentials",
            success: false
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email
    }, process.env.JWT_SECRET)

    res.cookie('token', token)
    
    res.status(200).json({
        message: 'User logged in successfully',
        success: true,
        user:{
            id: user._id,
            username: user.username,
            email: user.email,
        }
    })
}

export const getMe = async (req, res) => {
    const userId = req.user.id

    const user = await userModel.findById(userId).select('-password')
    res.status(200).json({
        message: 'User information retrieved successfully',
        success: true,
        user
    })

    if(!user){
        return res.status(404).json({
            message: 'User not found',
            success: false
        })
    }
}
export const verifyEmail = async (req, res) => {
    const { token } = req.query;
    try{
        let decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findOne({ email: decoded.email})

        if(!user){
            return res.status(400).json({
                message: 'Invalid token',
                success: false
            })
        }

        user.verified = true;
        await user.save();

        const html = `
        <h1>Email Verified</h1>
        <p>Your email has been successfully verified. You can now log in to your account.</p>
        <a href="http://localhost:3000/api/auth/login">Login</a>
        `;

        return res.status(200).send(html);

    }catch(err){
        return res.status(400).json({
            message: 'Invalid token',
            success: false
        })
    }
}

