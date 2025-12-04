import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { text, subject, fileType } = await req.json();
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
      You are an AI study assistant. Analyze the following ${fileType} content for the subject "${subject}".
      
      Provide a JSON response with:
      1. "summary": A concise 2-3 sentence summary of the main concepts
      2. "keyPoints": An array of 5-7 key points or important facts
      3. "quiz": An array of 3 multiple choice questions with "question", "options" (4 choices), and "answer"
      4. "flashcards": An array of 5 flashcards with "front" (question) and "back" (answer)

      Content: "${text.substring(0, 8000)}"
      
      Return ONLY valid JSON, no markdown formatting.
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
            // Return a fallback response
            return NextResponse.json({
                summary: "Content processed successfully. Unable to parse detailed analysis.",
                keyPoints: ["Content uploaded", "Ready for review"],
                quiz: [],
                flashcards: []
            });
        }

    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
