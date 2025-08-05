'use server';

/**
 * @fileOverview Summarizes the current lesson using AI.
 *
 * - generateLessonSummary - A function that generates a summary of the current lesson.
 * - GenerateLessonSummaryInput - The input type for the generateLessonSummary function.
 * - GenerateLessonSummaryOutput - The return type for the generateLessonSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLessonSummaryInputSchema = z.object({
  lessonContent: z.string().describe('The content of the lesson to summarize.'),
});
export type GenerateLessonSummaryInput = z.infer<
  typeof GenerateLessonSummaryInputSchema
>;

const GenerateLessonSummaryOutputSchema = z.object({
  summary: z.string().describe('The AI-generated summary of the lesson.'),
});
export type GenerateLessonSummaryOutput = z.infer<
  typeof GenerateLessonSummaryOutputSchema
>;

export async function generateLessonSummary(
  input: GenerateLessonSummaryInput
): Promise<GenerateLessonSummaryOutput> {
  return generateLessonSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLessonSummaryPrompt',
  input: {schema: GenerateLessonSummaryInputSchema},
  output: {schema: GenerateLessonSummaryOutputSchema},
  prompt: `Summarize the following lesson content. Be concise and focus on the key concepts.\n\nLesson Content:\n{{{lessonContent}}}`,
});

const generateLessonSummaryFlow = ai.defineFlow(
  {
    name: 'generateLessonSummaryFlow',
    inputSchema: GenerateLessonSummaryInputSchema,
    outputSchema: GenerateLessonSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
