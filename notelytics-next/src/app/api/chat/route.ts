import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { message, documentContent, history } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY not found in environment variables" },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        // Using available model from list
        const modelName = "gemini-2.0-flash";
        console.log(`[Chat API] Using model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });

        // Build context from document and chat history
        console.log(`[Chat API] Document length: ${documentContent.length}`);

        const context = `You are an AI study assistant. You have access to the following document:

${documentContent.substring(0, 30000)}

Previous conversation:
${history.map((msg: any) => `${msg.role}: ${msg.content}`).join('\n')}

User's question: ${message}

Provide a helpful, detailed response. You can:
- Explain concepts from the document
- Create quiz questions
- Generate flashcards
- Summarize sections
- Answer questions about the content

Be conversational and helpful.`;

        const result = await model.generateContent(context);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ response: text });

    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json(
            { error: "Failed to process request", details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
