import userModel from '../models/user.model.js';

export const register = async (req, res) => {
    
    const {username, email, password} = req.body

    const isUserExists = await userModel.findOne({
        $or: [{username}, {email}]
    })

    if(isUserExists) {
        return res.status(400).json({
            message:  `Username or email already exists`,
            success: false
        })
    }

    const user = await userModel.create({
        username,
        email,
        password
    })
    
    res.status(201).json({
        message: 'User created successfully',
        success: true,
        user:{
            username: user.username,
            email: user.email
        }
    })
}

