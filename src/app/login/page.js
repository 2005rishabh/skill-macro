"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { register, handleSubmit } = useForm();
    const router = useRouter();

    async function onSubmit(data) {
        try {
            const res = await axios.post("/api/auth/login", data);
            localStorage.setItem("token", res.data.token);
            router.push("/");
        } catch (err) {
            alert("Login failed");
        }
    }

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    placeholder="Email"
                    type="email"
                    {...register("email", { required: true })}
                />

                <input
                    placeholder="Password"
                    type="password"
                    {...register("password", { required: true })}
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}
