import { config } from 'dotenv';
config();

import '@/ai/flows/generate-practice-questions.ts';
import '@/ai/flows/generate-lesson-summary.ts';
import '@/ai/flows/answer-user-question.ts';
import '@/ai/flows/continue-conversation.ts';
import '@/ai/flows/speech-to-text.ts';
import '@/ai/flows/generate-talking-head-video.ts';
import '@/ai/flows/assess-english-proficiency.ts';
import '@/ai/flows/generate-course.ts';
