import { Router } from "express";
import {regUser} from '../controller/auth.conto.js'
import { regValidation } from "../validator/auth.validator.js";

const authRouter = Router()

authRouter.post('/register', regValidation ,regUser)

export default authRouter