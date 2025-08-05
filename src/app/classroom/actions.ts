"use server";

import { generateLessonSummary } from "@/ai/flows/generate-lesson-summary";
import { generatePracticeQuestions } from "@/ai/flows/generate-practice-questions";

export async function getLessonSummaryAction(lessonContent: string) {
  try {
    const result = await generateLessonSummary({ lessonContent });
    return { summary: result.summary };
  } catch (error) {
    console.error(error);
    return { error: "Failed to generate summary. Please try again." };
  }
}

export async function getPracticeQuestionsAction(lessonContent: string) {
  try {
    const result = await generatePracticeQuestions({ lessonContent });
    return { questions: result.questions };
  } catch (error) {
    console.error(error);
    return { error: "Failed to generate questions. Please try again." };
  }
}
