import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    // FIX: Using gemini-2.5-flash for speed and structured output support.
    // NOTE: If gemini-pro was intended, ensure the SDK is latest and retry 'gemini-pro'.
    model: "gemini-2.5-flash",
});
export async function generateJSON(prompt) {
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract JSON safely
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
        throw new Error("Gemini did not return valid JSON");
    }

    return JSON.parse(match[0]);
}
