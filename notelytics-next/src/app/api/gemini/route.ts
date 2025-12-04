import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { text } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not defined" },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
      Analyze the following text and provide a JSON response with:
      1. "explanation": A concise explanation of the key concepts.
      2. "summary": A brief summary (max 2 sentences).
      3. "quiz": An array of 3 multiple choice questions, each with "question", "options" (array of 4 strings), and "answer" (the correct option string).

      Text: "${text.substring(0, 5000)}" // Limit text length
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const textResponse = response.text();

        // Clean up markdown code blocks if present
        const jsonString = textResponse.replace(/```json\n|\n```/g, "").trim();

        try {
            const data = JSON.parse(jsonString);
            return NextResponse.json(data);
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError);
            return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
        }

    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
