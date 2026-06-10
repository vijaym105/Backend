import { Router } from "express";
import {regUser} from '../controller/auth.conto.js'
import errHandler from "../middleware/error.middleware.js";

const authRouter = Router()

authRouter.post('/register', regUser)

app.use(errHandler())


export default authRouter