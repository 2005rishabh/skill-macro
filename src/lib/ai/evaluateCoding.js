import { generateJSON } from "./client";

export async function evaluateCoding({ taskPrompt, userCode }) {
    const prompt = `
You are a strict coding evaluator.

TASK:
${taskPrompt}

USER CODE:
${userCode}

Evaluate on a scale of 0–10:
- correctness
- timeComplexity
- readability

Return ONLY valid JSON:
{
  "score": number,
  "criteria": {
    "correctness": number,
    "timeComplexity": number,
    "readability": number
  },
  "weaknesses": [string],
  "improvementPlan": [string]
}
`;

    return await generateJSON(prompt);
}
