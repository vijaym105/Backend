import {Router} from 'express';
import { register } from '../controller/auth.controller.js';

const authRouter = Router();


/** @route POST api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post('/register', register);

export default authRouter;