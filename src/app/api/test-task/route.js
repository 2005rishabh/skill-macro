import { NextResponse } from "next/server";
import { generateTask } from "@/lib/tasks";

export async function GET() {
  const task = generateTask({
    skillType: "coding",
    difficulty: "medium",
  });

  return NextResponse.json(task);
}
