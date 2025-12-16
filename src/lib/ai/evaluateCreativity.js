import { generateJSON } from "./client";

export async function evaluateCreativity({ taskPrompt, ideas }) {
    const prompt = `
You are a creativity evaluator.

PROMPT:
${taskPrompt}

USER IDEAS:
${ideas}

Evaluate on 0–10:
- originality
- relevance
- feasibility

Return ONLY valid JSON:
{
  "score": number,
  "criteria": {
    "originality": number,
    "relevance": number,
    "feasibility": number
  },
  "weaknesses": [string],
  "improvementPlan": [string]
}
`;

    return await generateJSON(prompt);
}
