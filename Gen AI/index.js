import "dotenv/config"
import readline from "readline/promises";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, tool, createAgent } from "langchain";
import { sendEmail } from "./mail.service.js";
import z from "zod"
import { send } from "process";



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


const emailTool = tool(
    async ({ to, subject, html }) => {
        return await sendEmail(
            to,
            subject,
            html
        );
    },
    {
        name: "emailTool",
        description: "A tool to send emails. It takes in the recipient's email address, subject, and body of the email as input.",
        schema: z.object({
            to: z.string().email().describe("The recipient's email address"),
            subject: z.string().describe("The subject of the email"),
            html: z.string().describe("The body of the email")
        })
    }
)

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GOOGLE_API_KEY
})



const agent = createAgent({
    model,
    tools: [emailTool]
})

const messages = []

while (true) {
    const userInput = await rl.question("\x1b[32mYou:\x1b[0m ")
    messages.push(new HumanMessage(userInput))

    const resp = await agent.invoke({
        messages
    })

    messages.push(resp.messages[resp.messages.length - 1])

    console.log(resp.messages[resp.messages.length - 1])
    // console.log(`\x1b[34m[AI]\x1b[0m ${resp.text}`)

}
