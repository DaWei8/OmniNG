"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function clearSessionServer() {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    // Delete all cookies
    allCookies.forEach((cookie) => {
        cookieStore.delete(cookie.name);
    });

    console.log("Server: All cookies cleared.");
}
