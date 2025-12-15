"use client";

import { clearSessionServer } from "@/actions/debug";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ClearSessionPage() {
    const router = useRouter();
    const [status, setStatus] = useState("Click to Clear Session");

    const handleClear = async () => {
        setStatus("Clearing server cookies...");
        await clearSessionServer();

        // Also clear client cookies just in case
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }

        setStatus("Cleared! Redirecting...");
        setTimeout(() => {
            router.push("/admin-login");
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
            <button
                onClick={handleClear}
                className="px-8 py-4 bg-red-600 hover:bg-red-700 rounded-xl font-bold text-xl transition-colors"
            >
                {status}
            </button>
        </div>
    );
}
