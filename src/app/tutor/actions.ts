"use server";

import { answerUserQuestion } from "@/ai/flows/answer-user-question";

export async function askAiTutorAction(question: string, lessonContent: string) {
  try {
    const result = await answerUserQuestion({ question, lessonContent });
    return { answer: result.answer };
  } catch (error) {
    console.error(error);
    return { error: "I am having trouble responding right now. Please try again in a moment." };
  }
}
