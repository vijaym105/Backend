import {body, validationResult} from 'express-validator'


const validate = (res , req , next) => {
    const errors = validationResult(req)

    if(errors.isEmpty()){
        return next()
    }

    res.status(400).json({
        errors: errors.array()
    })
}

export const regValidation = [
    body("username").isString().withMessage("username should be string"),
    body("email").isEmail().withMessage("email address is not valid"),
    body("password").custom((value) => {
        if(value.length < 6){
            throw new error("password should not be more than 6 characters")
        }
         const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/

        if(!passwordRegex.test(value)){
            throw new error("password should contain at least one uppercase letter and one number")
        }
        return true
    }).withMessage("password should be at least 6 characters long and contain at least one uppercase letter and one number"),
    validate
]