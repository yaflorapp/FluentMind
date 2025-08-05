'use server';
/**
 * @fileOverview An AI flow to assess the English proficiency of a user based on a text sample.
 *
 * - assessEnglishProficiency - A function that takes a block of text and returns a proficiency assessment.
 * - AssessEnglishProficiencyInput - The input type for the function.
 * - AssessEnglishProficiencyOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AssessEnglishProficiencyInputSchema = z.object({
  text: z.string().describe('A block of text written by the user to be assessed.'),
});
export type AssessEnglishProficiencyInput = z.infer<typeof AssessEnglishProficiencyInputSchema>;

const AssessEnglishProficiencyOutputSchema = z.object({
  overallProficiency: z.string().describe("The user's overall proficiency level (e.g., 'A1', 'A2', 'B1', 'B2', 'C1', 'C2')."),
  summary: z.string().describe("A brief, one-sentence summary of the user's proficiency."),
  scores: z.object({
      grammar: z.number().int().min(0).max(100).describe("A score from 0-100 for grammar."),
      vocabulary: z.number().int().min(0).max(100).describe("A score from 0-100 for vocabulary usage."),
      fluency: z.number().int().min(0).max(100).describe("A score from 0-100 for conversational fluency and coherence."),
      pronunciation: z.number().int().min(0).max(100).describe("A score from 0-100 for pronunciation, inferred from the text's naturalness. If it's written text, base this on how natural the phrasing is."),
  }),
  strengths: z.array(z.string()).describe('A list of specific strengths observed in the text.'),
  weaknesses: z.array(z.string()).describe('A list of specific areas for improvement.'),
});
export type AssessEnglishProficiencyOutput = z.infer<typeof AssessEnglishProficiencyOutputSchema>;

export async function assessEnglishProficiency(input: AssessEnglishProficiencyInput): Promise<AssessEnglishProficiencyOutput> {
  return assessEnglishProficiencyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assessEnglishProficiencyPrompt',
  input: { schema: AssessEnglishProficiencyInputSchema },
  output: { schema: AssessEnglishProficiencyOutputSchema },
  prompt: `You are an expert English language proficiency assessor, aligned with the CEFR framework.
  
  Analyze the following text provided by a student. Based on the text, provide a detailed assessment of their English skills.
  
  - Determine their overall proficiency level (A1-C2).
  - Provide integer scores from 0 to 100 for grammar, vocabulary, fluency, and pronunciation.
  - Identify specific strengths and weaknesses from the text.
  - Provide a brief, encouraging summary of their level.

  Analyze this text:
  {{{text}}}
  `,
});

const assessEnglishProficiencyFlow = ai.defineFlow(
  {
    name: 'assessEnglishProficiencyFlow',
    inputSchema: AssessEnglishProficiencyInputSchema,
    outputSchema: AssessEnglishProficiencyOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
