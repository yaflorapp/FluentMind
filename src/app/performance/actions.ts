"use server";

import { assessEnglishProficiency } from "@/ai/flows/assess-english-proficiency";
import type { AssessEnglishProficiencyOutput } from "@/ai/flows/assess-english-proficiency";

export async function assessEnglishProficiencyAction(text: string): Promise<{ assessment?: AssessEnglishProficiencyOutput; error?: string }> {
    try {
        const assessment = await assessEnglishProficiency({ text });
        return { assessment };
    } catch (error) {
        console.error("Error assessing proficiency:", error);
        return { error: "Failed to assess proficiency. Please try again later." };
    }
}
