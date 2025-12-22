import connectDB from "@/lib/db";
import SkillAttempt from "@/models/SkillAttempt";
import { verifyToken } from "@/lib/auth";
import mongoose from "mongoose";

export async function GET(req) {
  await connectDB();

  const user = verifyToken(req);
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const attempts = await SkillAttempt.find({
    userId: new mongoose.Types.ObjectId(user.userId),
  }).sort({ createdAt: 1 });

  return Response.json({ attempts });
}
