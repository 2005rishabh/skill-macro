"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TaskPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const skill = searchParams.get("skill");

    const [task, setTask] = useState(null);
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Fetch task when page loads
    useEffect(() => {
        async function fetchTask() {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    router.push("/login");
                    return;
                }

                const res = await axios.get(
                    `/api/task/generate?skillType=${skill}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setTask(res.data);
                setLoading(false);
            } catch (err) {
                alert("Failed to load task");
                setLoading(false);
            }
        }

        if (skill) fetchTask();
    }, [skill, router]);

    // Submit task
    async function handleSubmit() {
        try {
            setSubmitting(true);
            const token = localStorage.getItem("token");

            const res = await axios.post(
                "/api/task/submit",
                {
                    skillType: skill,
                    taskPrompt: task.prompt,
                    userInput: answer,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            localStorage.setItem("result", JSON.stringify(res.data));
            router.push("/result");
        } catch (err) {
            alert("Submission failed");
            setSubmitting(false);
        }
    }

    if (loading) return <p>Loading task...</p>;
    if (!task) return <p>No task found</p>;

    return (
        <div>
            <h2>{task.prompt}</h2>

            {task.constraints && (
                <ul>
                    {task.constraints.map((c, i) => (
                        <li key={i}>{c}</li>
                    ))}
                </ul>
            )}

            {/* Input based on skill */}
            {skill === "coding" || skill === "creativity" ? (
                <textarea
                    rows={8}
                    placeholder="Write your answer here"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
            ) : (
                <textarea
                    rows={5}
                    placeholder="Paste your speech transcript here"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
            )}

            <br />

            <button onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Submitting..." : "Submit"}
            </button>
        </div>
    );
}
