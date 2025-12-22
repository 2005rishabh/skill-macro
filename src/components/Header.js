"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);

        // Check for dark mode preference
        const darkMode = localStorage.getItem("darkMode") === "true";
        setIsDark(darkMode);
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/login");
    };

    const toggleDarkMode = () => {
        const newDark = !isDark;
        setIsDark(newDark);
        localStorage.setItem("darkMode", newDark.toString());
        if (newDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    return (
        <header className="bg-blue-600 dark:bg-blue-800 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    Micro Skill Coach
                </Link>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-900 transition-colors"
                        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                    >
                        {isDark ? "☀️" : "🌙"}
                    </button>
                    <nav className="space-x-4">
                        {isLoggedIn ? (
                            <>
                                <Link href="/" className="hover:underline">
                                    Home
                                </Link>
                                <Link href="/dashboard" className="hover:underline">
                                    Dashboard
                                </Link>
                                <button onClick={handleLogout} className="hover:underline">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="hover:underline">
                                    Login
                                </Link>
                                <Link href="/signup" className="hover:underline">
                                    Signup
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}