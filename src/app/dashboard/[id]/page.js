"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

export default function AttemptDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [attempt, setAttempt] = useState(null);

    useEffect(() => {
        async function loadAttempt() {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/login");
                return;
            }

            const res = await axios.get(`/api/attempt/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setAttempt(res.data.attempt);
        }

        loadAttempt();
    }, [id, router]);

    if (!attempt) return <p>Loading...</p>;

    const evalData = attempt.aiEvaluation;

    return (
        <div>
            <button onClick={() => router.back()}>← Back</button>

            <h2>{attempt.skillType.toUpperCase()} Attempt</h2>

            <h3>Task</h3>
            <p>{attempt.taskPrompt}</p>

            <h3>Your Input</h3>
            <pre>{attempt.userInput}</pre>

            <h3>Score: {evalData.score}</h3>

            <h4>Criteria</h4>
            <pre>{JSON.stringify(evalData.criteria, null, 2)}</pre>

            <h4>Weaknesses</h4>
            <ul>
                {evalData.weaknesses.map((w, i) => (
                    <li key={i}>{w}</li>
                ))}
            </ul>

            <h4>Improvement Plan</h4>
            <ul>
                {evalData.improvementPlan.map((p, i) => (
                    <li key={i}>{p}</li>
                ))}
            </ul>
        </div>
    );
}
