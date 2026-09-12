import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "langchain";

const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GOOGLE_API_KEY
});


export async function generateResp(message) {

    const response = await geminiModel.invoke([
        new HumanMessage(message)
    ]);

    return response.text;
}


export async function AiTitle(message) {

    console.log("🔥 CALLING GEMINI FOR TITLE");

    const response = await geminiModel.invoke([
        new SystemMessage(`
            You generate concise and descriptive titles for chat conversations.

            Rules:
            - Generate only 2-4 words.
            - Keep the title clear and relevant.
            - Do not use quotation marks.
            - Do not explain anything.
            - Return only the title.
        `),

        new HumanMessage(`
            Generate a title for this conversation:

            "${message}"
        `)
    ]);

    console.log("✅ GEMINI TITLE SUCCESS");

    return response.text.trim();
}