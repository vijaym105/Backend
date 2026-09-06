import { Router } from "express";
import {userAuth} from "../middleware/auth.middleware.js";
import { sendMessage } from "../controller/message.contoller.js";

const chatRouter = Router();

///** @route POST api/chat/send-message
// * @desc Send a message in a chat
 //* @access Private  

chatRouter.post('/send-message', userAuth, sendMessage);

export default chatRouter;  