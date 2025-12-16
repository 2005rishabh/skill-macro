import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "models/gemini-pro",
});

export async function generateJSON(prompt) {
    const result = await model.generateContent({
        contents: [
            {
                role: "user",
                parts: [{ text: prompt }],
            },
        ],
    });

    const text = result.response.text();

    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
        throw new Error("Gemini did not return valid JSON");
    }

    return JSON.parse(match[0]);
}
