'use server';
/**
 * @fileOverview An AI flow to generate a course outline based on a subject.
 *
 * - generateCourse - A function that takes a subject and returns a course plan.
 * - GenerateCourseInput - The input type for the function.
 * - GenerateCourseOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateCourseInputSchema = z.object({
  subject: z.string().describe('The subject for which to generate a course.'),
});
export type GenerateCourseInput = z.infer<typeof GenerateCourseInputSchema>;

const GenerateCourseOutputSchema = z.object({
  coursePlan: z.string().describe('The detailed, structured course plan, formatted as plain text with markdown for structure.'),
});
export type GenerateCourseOutput = z.infer<typeof GenerateCourseOutputSchema>;

export async function generateCourse(input: GenerateCourseInput): Promise<GenerateCourseOutput> {
  return generateCourseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCoursePrompt',
  input: { schema: GenerateCourseInputSchema },
  output: { schema: GenerateCourseOutputSchema },
  prompt: `You are an expert curriculum designer for an online learning platform.
  
  A user wants to learn about the following subject: {{{subject}}}

  Please generate a detailed, well-structured course outline for them. The outline should include:
  1. A course title.
  2. A brief course description.
  3. A list of modules (at least 4).
  4. For each module, a list of 3-5 specific lesson topics.
  
  Present the output as clean, readable text. Use markdown for headings and lists.
  `,
});

const generateCourseFlow = ai.defineFlow(
  {
    name: 'generateCourseFlow',
    inputSchema: GenerateCourseInputSchema,
    outputSchema: GenerateCourseOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
