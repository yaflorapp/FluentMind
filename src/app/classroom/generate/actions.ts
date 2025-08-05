"use server";

import { generateCourse } from "@/ai/flows/generate-course";

export async function generateCourseAction(subject: string): Promise<{ coursePlan?: string; error?: string }> {
    try {
        const result = await generateCourse({ subject });
        return { coursePlan: result.coursePlan };
    } catch (error) {
        console.error("Error generating course:", error);
        return { error: "Failed to generate course. Please try again later." };
    }
}
