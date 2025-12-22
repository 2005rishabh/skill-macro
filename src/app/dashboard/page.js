"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ScoreTimeline from "@/components/charts/ScoreTimeline";
import SkillAverage from "@/components/charts/SkillAverage";
import { motion } from "framer-motion";

export default function DashboardPage() {
    const [attempts, setAttempts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get("/api/dashboard", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setAttempts(res.data.attempts));
    }, []);

    const timelineData = attempts.map((a) => ({
        createdAt: a.createdAt,
        score: a.aiEvaluation.score,
    }));

    const skillMap = {};
    attempts.forEach((a) => {
        if (!skillMap[a.skillType]) {
            skillMap[a.skillType] = [];
        }
        skillMap[a.skillType].push(a.aiEvaluation.score);
    });

    const skillAvgData = Object.entries(skillMap).map(
        ([skillType, scores]) => ({
            skillType,
            avgScore:
                scores.reduce((s, v) => s + v, 0) / scores.length,
        })
    );

    return (
        <motion.div
            className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-6xl mx-auto">
                <motion.h1
                    className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Your Progress Dashboard
                </motion.h1>

                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    <motion.div
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                            Score Progress Over Time
                        </h2>
                        <ScoreTimeline data={timelineData} />
                    </motion.div>

                    <motion.div
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                            Average Scores by Skill
                        </h2>
                        <SkillAverage data={skillAvgData} />
                    </motion.div>
                </div>

                <motion.div
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        Recent Attempts
                    </h2>
                    {attempts.length === 0 ? (
                        <p className="text-gray-600 dark:text-gray-300">No attempts yet. Start practicing!</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <th className="pb-2 text-gray-900 dark:text-white">Skill</th>
                                        <th className="pb-2 text-gray-900 dark:text-white">Score</th>
                                        <th className="pb-2 text-gray-900 dark:text-white">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attempts.slice(0, 10).map((attempt, index) => (
                                        <tr key={index} className="border-b border-gray-100 dark:border-gray-600">
                                            <td className="py-2 text-gray-700 dark:text-gray-300 capitalize">
                                                {attempt.skillType}
                                            </td>
                                            <td className="py-2 text-gray-700 dark:text-gray-300">
                                                {attempt.aiEvaluation.score}/100
                                            </td>
                                            <td className="py-2 text-gray-700 dark:text-gray-300">
                                                {new Date(attempt.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
}
