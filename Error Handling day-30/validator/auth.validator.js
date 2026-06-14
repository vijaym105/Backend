import {body, validationResult} from 'express-validator'


const validate = (req, res , next) => {
    
    const errors = validationResult(req)
    
    if(errors.isEmpty()){
        return next()
    }

    res.status(400).json({
        errors: errors.array()
    })
}

const regValidation = [
    body("username").isString().withMessage("username must be in string format"),
    body("email").isEmail().withMessage("Use valid gmail address"),
    body("password").custom((val) => {
        if(val.length < 6){
            throw new error("password should be more or equal to 6 characters")
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/
        if(passwordRegex.test(val)){
            throw new error("Password should contain at least 1 captital letter and 1 number")
        }
        return true
    }).withMessage("Password should be 6 words and should contain at least 1 Capital letter and 1 number."),
    validate
]