"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResultPage() {
    const router = useRouter();
    const [data, setData] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("result");
        if (!stored) {
            router.push("/");
            return;
        }
        setData(JSON.parse(stored));
    }, [router]);

    if (!data) return <p>Loading result...</p>;

    const evalData = data.evaluation;

    return (
        <div>
            <h2>Score: {evalData.score}</h2>

            <h3>Criteria</h3>
            <pre>{JSON.stringify(evalData.criteria, null, 2)}</pre>

            <h3>Weaknesses</h3>
            <ul>
                {evalData.weaknesses.map((w, i) => (
                    <li key={i}>{w}</li>
                ))}
            </ul>

            <h3>Improvement Plan</h3>
            <ul>
                {evalData.improvementPlan.map((p, i) => (
                    <li key={i}>{p}</li>
                ))}
            </ul>

            <button onClick={() => router.push("/")}>
                Try Another Task
            </button>
        </div>
    );
}
