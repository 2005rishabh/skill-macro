import connectDB from "@/lib/db";
import SkillAttempt from "@/models/SkillAttempt";
import mongoose from "mongoose";

export async function GET(req, context) {
    try {
        await connectDB();

        const params = await context.params;
        const id = params.id;

        console.log("ATTEMPT ID:", id);
        console.log(
            "VALID ObjectId:",
            mongoose.Types.ObjectId.isValid(id)
        );

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return Response.json(
                { error: "Invalid attempt id" },
                { status: 400 }
            );
        }

        const attempt = await SkillAttempt.findById(id);

        if (!attempt) {
            return Response.json(
                { error: "Attempt not found" },
                { status: 404 }
            );
        }

        return Response.json({ attempt });
    } catch (err) {
        console.error("LOAD ATTEMPT ERROR:", err);
        return Response.json(
            { error: "Failed to load attempt" },
            { status: 500 }
        );
    }
}
