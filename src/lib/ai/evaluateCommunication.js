import { generateJSON } from "./client";

export async function evaluateCommunication({ transcript }) {
    const prompt = `
You are a communication skills evaluator.

TRANSCRIPT:
"${transcript}"

Evaluate on 0–10:
- clarity
- structure
- fluency
- confidence

Return ONLY valid JSON:
{
  "score": number,
  "criteria": {
    "clarity": number,
    "structure": number,
    "fluency": number,
    "confidence": number
  },
  "weaknesses": [string],
  "improvementPlan": [string]
}
`;
    return await generateJSON(prompt);
}
