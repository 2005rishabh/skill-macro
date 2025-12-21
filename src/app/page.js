"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SkillSelectionPage() {
  const router = useRouter();

  // Basic auth check (frontend only)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div>
      <h2>Select a Skill</h2>

      <button onClick={() => router.push("/task?skill=coding")}>
        Coding
      </button>

      <button onClick={() => router.push("/task?skill=communication")}>
        Communication
      </button>

      <button onClick={() => router.push("/task?skill=creativity")}>
        Creativity
      </button>
    </div>
  );
}
