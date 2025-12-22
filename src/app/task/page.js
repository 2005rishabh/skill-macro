"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

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

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-xl">Loading task...</div>
        </div>
    );
    if (!task) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-xl">No task found</div>
        </div>
    );

    return (
        <motion.div
            className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-4xl mx-auto">
                <motion.div
                    className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        {skill.charAt(0).toUpperCase() + skill.slice(1)} Task
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{task.prompt}</p>
                    {task.constraints && task.constraints.length > 0 && (
                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Constraints:</h3>
                            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                                {task.constraints.map((c, i) => (
                                    <li key={i}>{c}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </motion.div>

                <motion.div
                    className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Answer</h3>
                    <textarea
                        rows={skill === "coding" ? 12 : 6}
                        placeholder={
                            skill === "communication"
                                ? "Paste your speech transcript here"
                                : "Write your answer here"
                        }
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono"
                    />
                    <div className="mt-6 text-right">
                        <button
                            onClick={handleSubmit}
                            disabled={submitting || !answer.trim()}
                            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {submitting ? "Submitting..." : "Submit Answer"}
                        </button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
