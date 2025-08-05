'use server';
/**
 * @fileOverview A flow to generate a talking head video from text.
 *
 * - generateTalkingHeadVideo - A function that takes text and returns a video URL.
 * - GenerateTalkingHeadVideoInput - The input type for the function.
 * - GenerateTalkingHeadVideoOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'zod';
import * as fs from 'fs';
import { Readable } from 'stream';
import { MediaPart } from 'genkit';

const GenerateTalkingHeadVideoInputSchema = z.object({
  text: z.string().describe('The text to be spoken in the video.'),
});
export type GenerateTalkingHeadVideoInput = z.infer<typeof GenerateTalkingHeadVideoInputSchema>;

const GenerateTalkingHeadVideoOutputSchema = z.object({
  videoUrl: z.string().url().describe('The URL of the generated talking head video.'),
});
export type GenerateTalkingHeadVideoOutput = z.infer<typeof GenerateTalkingHeadVideoOutputSchema>;

export async function generateTalkingHeadVideo(
  input: GenerateTalkingHeadVideoInput
): Promise<GenerateTalkingHeadVideoOutput> {
  return generateTalkingHeadVideoFlow(input);
}

const generateTalkingHeadVideoFlow = ai.defineFlow(
  {
    name: 'generateTalkingHeadVideoFlow',
    inputSchema: GenerateTalkingHeadVideoInputSchema,
    outputSchema: GenerateTalkingHeadVideoOutputSchema,
  },
  async (input) => {
    // In a real implementation, you would use a talking head API like D-ID or HeyGen.
    // For this prototype, we will use a placeholder video generation model.
    // The following uses a text-to-video model which is not exactly a talking head,
    // but serves as a placeholder for the functionality.

    let { operation } = await ai.generate({
        model: googleAI.model('veo-2.0-generate-001'),
        prompt: `A close-up of a friendly AI tutor speaking. The tutor should look welcoming and be in a simple, clean environment. The tutor is saying: "${input.text}"`,
        config: {
            durationSeconds: 5,
            aspectRatio: '16:9',
        },
    });

    if (!operation) {
        throw new Error('Expected the model to return an operation');
    }

    // Wait for the operation to complete
    while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.checkOperation(operation);
    }

    if (operation.error) {
        throw new Error('Failed to generate video: ' + operation.error.message);
    }
    
    const video = operation.output?.message?.content.find((p) => !!p.media);
    if (!video || !video.media?.url) {
        throw new Error('Failed to find the generated video in the operation result');
    }

    // The URL returned from Veo is temporary and needs the API key.
    // In a real app, you'd download this and serve it from your own storage (e.g., Firebase Storage).
    // For this prototype, we pass the temporary URL with the key.
    const downloadableUrl = `${video.media.url}&key=${process.env.GEMINI_API_KEY}`;
    
    // For demonstration, we'll return a data URI. In a production app, you'd upload this to a bucket
    // and return the public URL.
    const response = await fetch(downloadableUrl);
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');

    return {
        videoUrl: `data:video/mp4;base64,${base64}`,
    };
  }
);
