"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function SkillSelectionPage() {
  const router = useRouter();

  // Basic auth check (frontend only)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const skills = [
    {
      name: "Coding",
      description: "Improve your programming skills with AI feedback.",
      icon: "💻",
      route: "/task?skill=coding",
    },
    {
      name: "Communication",
      description: "Enhance your speaking and presentation abilities.",
      icon: "🎤",
      route: "/task?skill=communication",
    },
    {
      name: "Creativity",
      description: "Boost your innovative thinking and idea generation.",
      icon: "🎨",
      route: "/task?skill=creativity",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-4xl font-bold text-gray-900 dark:text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Choose Your Skill to Practice
        </motion.h1>
        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push(skill.route)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-6xl mb-4">{skill.icon}</div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                {skill.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {skill.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
