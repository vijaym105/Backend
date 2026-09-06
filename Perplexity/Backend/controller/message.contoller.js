import { generateResp } from "../services/ai.service.js";
import { AiTitle } from "../services/ai.service.js";
export async function sendMessage(req, res) {
    const { message } = req.body;

    const title = await AiTitle(message);

    console.log("Title generated: " + title);

    const result = await generateResp(message);
    
    console.log("🔥 CALLING MISTRAL");
    console.log("Time:", new Date().toISOString());

    res.json({
        aiMessage: result,
        title: title
    });
}