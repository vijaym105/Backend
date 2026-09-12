import { generateResp } from "../services/ai.service.js";
import { AiTitle } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/msg.model.js";


export async function sendMessage(req, res) {

    const { message, chat: chatId } = req.body;

    let title = null, chat = null;

    if (!chatId) {
        title = await generateResp(message);
        chat = await chatModel.create({
            user: req.user.id,
            title
        })
    }

    const userMsg = await messageModel.create({
        chat: chatId || chat._id,
        content: message,
        role: 'user'
    })

    const result = await generateResp(message);

    const Aimsg = await messageModel.create({
        chat: chat._id,
        content: result,
        role: 'ai'
    })

    res.json({
        title,
        chat,
        Aimsg
    });
}

export async function retriveChats(req, res) {
    const user =  req.user ;

    const chats = await chatModel.find({user: user.id});

    res.status(200).json({
        message: "Chats retrieved successfully",
        chats
    })
}

export async function retriveMessages(req, res) {
    const {chatId} = req.params;

    const messages = await messageModel.find({chat: chatId});

    const chats = await chatModel.findById(chatId)

    if(!chats){
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    res.status(200).json({
        message: "Messages retrieved successfully",
        messages
    })
}

export async function deleteChats(req, res){
    const {chatId} = req.params

    const chat = await chatModel.findOneAndDelete({
        _id: chatId,
        user: req.user.id
    })

    await messageModel.deleteMany({
        chat
    }) 

    if(!chat){
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    res.status(200).json({
        message: "Chat deleted successfully"
    })
}