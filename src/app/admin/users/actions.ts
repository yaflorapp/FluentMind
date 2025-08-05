
"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/firebase-admin";

export async function updateUserPlan(userId: string, plan: "Free" | "Pro") {
    try {
        await db.collection("users").doc(userId).update({ plan });
        revalidatePath("/admin/users");
        return { success: true };
    } catch (error) {
        console.error("Failed to update user plan:", error);
        return { error: "Failed to update user plan." };
    }
}

export async function toggleAdminStatus(userId: string, currentStatus: boolean) {
    try {
        await db.collection("users").doc(userId).update({ isAdmin: !currentStatus });
        revalidatePath("/admin/users");
        return { success: true };
    } catch (error) {
        console.error("Failed to toggle admin status:", error);
        return { error: "Failed to toggle admin status." };
    }
}
