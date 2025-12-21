import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import SkillAttempt from "@/models/SkillAttempt";

import { evaluateCoding } from "@/lib/ai/evaluateCoding";
import { evaluateCommunication } from "@/lib/ai/evaluateCommunication";
import { evaluateCreativity } from "@/lib/ai/evaluateCreativity";

export async function POST(req) {
    try {
        const decoded = verifyToken(req);
        await connectDB();

        const body = await req.json();
        const { skillType, taskPrompt, userInput } = body;

        if (!skillType || !taskPrompt || !userInput) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        let evaluation;

        switch (skillType) {
            case "coding":
                evaluation = await evaluateCoding({
                    taskPrompt,
                    userCode: userInput,
                });
                break;

            case "communication":
                evaluation = await evaluateCommunication({
                    transcript: userInput,
                });
                break;

            case "creativity":
                evaluation = await evaluateCreativity({
                    taskPrompt,
                    ideas: userInput,
                });
                break;

            default:
                return NextResponse.json(
                    { error: "Invalid skill type" },
                    { status: 400 }
                );
        }

        const attempt = await SkillAttempt.create({
            userId: decoded.userId,
            skillType,
            taskPrompt,
            userInput,
            aiEvaluation: evaluation,
        });

        return NextResponse.json({
            attemptId: attempt._id,
            evaluation,
        });
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: error.message === "Unauthorized" ? 401 : 500 }
        );
    }
}

