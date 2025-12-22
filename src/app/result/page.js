"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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

    if (!data) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-xl">Loading result...</div>
        </div>
    );

    const evalData = data.evaluation;

    return (
        <motion.div
            className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-4xl mx-auto">
                <motion.div
                    className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mb-8 text-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Your Score
                    </h2>
                    <div className="text-6xl font-bold text-blue-600 mb-4">
                        {evalData.score}/100
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                        Great job! Keep practicing to improve.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        Criteria Breakdown
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(evalData.criteria).map(([key, value]) => (
                            <div key={key} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                                <h4 className="font-medium text-gray-900 dark:text-white capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300">{value}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        Areas for Improvement
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                        {evalData.weaknesses.map((w, i) => (
                            <li key={i}>{w}</li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        Improvement Plan
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                        {evalData.improvementPlan.map((p, i) => (
                            <li key={i}>{p}</li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    className="text-center space-x-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
                    >
                        View Dashboard
                    </button>
                    <button
                        onClick={() => router.push("/")}
                        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Try Another Task
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
}
