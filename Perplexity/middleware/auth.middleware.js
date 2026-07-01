import jwt from 'jsonwebtoken'

export const userAuth = (req, res, next) => {
    console.log("Token from cookies:", req.cookies.token); 
    let token = req.cookies.token
    
    if(!token){
        return res.status(401).json({
            message: 'Unauthorized',
            success: false,
            err: "No token provided"
        })
    }

    try{
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }catch(err){  
        return res.status(401).json({
            message: 'Unauthorized',
            success: false,
            err: "Invalid token"
         })
    }
}