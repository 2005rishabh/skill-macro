import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { generateTask } from "@/lib/tasks";

export async function GET(req) {
    try {
        verifyToken(req);

        const { searchParams } = new URL(req.url);
        const skillType = searchParams.get("skillType");
        const difficulty = searchParams.get("difficulty") || "easy";

        if (!skillType) {
            return NextResponse.json(
                { error: "skillType is required" },
                { status: 400 }
            );
        }

        const task = generateTask({ skillType, difficulty });

        return NextResponse.json(task);
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: error.message === "Unauthorized" ? 401 : 500 }
        );
    }
}
