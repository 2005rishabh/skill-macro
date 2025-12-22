"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignupPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    async function onSubmit(data) {
        try {
            const res = await axios.post("/api/auth/signup", data);
            localStorage.setItem("token", res.data.token);
            router.push("/");
        } catch (err) {
            alert("Signup failed: " + (err.response?.data?.message || "Unknown error"));
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <motion.div
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
                    Create Account
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input
                            placeholder="Name"
                            {...register("name", { required: "Name is required" })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                        <input
                            placeholder="Email"
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                        <input
                            placeholder="Password"
                            type="password"
                            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Create Account
                    </button>
                </form>
                <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
