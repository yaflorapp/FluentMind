'use server';

/**
 * @fileOverview A flow to continue a conversation with an AI English tutor.
 * 
 * - continueConversation - A function that takes the user's message and chat history and returns the AI's response.
 * - ContinueConversationInput - The input type for the continueConversation function.
 * - ContinueConversationOutput - The return type for the continueConversation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ContinueConversationInputSchema = z.object({
  message: z.string().describe('The latest message from the user.'),
  chatHistory: z.string().describe('The history of the conversation so far.'),
});
export type ContinueConversationInput = z.infer<typeof ContinueConversationInputSchema>;

const ContinueConversationOutputSchema = z.object({
  response: z.string().describe("The AI tutor's conversational response."),
  feedback: z.string().optional().describe('Specific feedback on grammar, vocabulary, or pronunciation if necessary.'),
});
export type ContinueConversationOutput = z.infer<typeof ContinueConversationOutputSchema>;

export async function continueConversation(
  input: ContinueConversationInput
): Promise<ContinueConversationOutput> {
  return continueConversationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'continueConversationPrompt',
  input: { schema: ContinueConversationInputSchema },
  output: { schema: ContinueConversationOutputSchema },
  prompt: `You are an expert American English tutor. Your role is to have a natural, encouraging conversation with a student.
  
  Your primary goal is to help the student practice their English. Engage them in conversation, ask questions, and be a friendly partner.
  
  When the student makes a mistake in grammar or vocabulary, or uses an unnatural phrase, you should gently correct them. Provide the correction in the 'feedback' output field. The main 'response' should continue the conversation naturally without explicitly mentioning the mistake. Only provide feedback when there is a clear error to correct. If there are no errors, do not provide feedback.
  
  Here is the conversation history:
  {{{chatHistory}}}
  
  Here is the user's latest message:
  {{{message}}}
  `,
});

const continueConversationFlow = ai.defineFlow(
  {
    name: 'continueConversationFlow',
    inputSchema: ContinueConversationInputSchema,
    outputSchema: ContinueConversationOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
