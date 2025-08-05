"use server";

import { continueConversation as continueConversationFlow } from '@/ai/flows/continue-conversation';
import { generateTalkingHeadVideo as generateTalkingHeadVideoFlow } from '@/ai/flows/generate-talking-head-video';
import { speechToText as speechToTextFlow } from '@/ai/flows/speech-to-text';

export async function continueConversation(message: string, chatHistory: string) {
  try {
    const result = await continueConversationFlow({ message, chatHistory });
    return { response: result.response, feedback: result.feedback };
  } catch (error: any) {
    console.error("Error in continueConversation action:", error);
    return { error: error.message || "Failed to get conversation response." };
  }
}

export async function speechToText(audioDataUri: string) {
  try {
    const result = await speechToTextFlow({ audioDataUri });
    return { text: result.transcription };
  } catch (error: any) {
    console.error("Error in speechToText action:", error);
    return { error: error.message || "Failed to transcribe audio." };
  }
}

export async function generateTalkingHeadVideo(text: string) {
    try {
        const result = await generateTalkingHeadVideoFlow({ text });
        return { videoUrl: result.videoUrl };
    } catch (error: any) {
        console.error("Error in generateTalkingHeadVideo action:", error);
        return { error: error.message || "Failed to generate video." };
    }
}
