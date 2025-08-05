import { config } from 'dotenv';
config();

import '@/ai/flows/generate-practice-questions.ts';
import '@/ai/flows/generate-lesson-summary.ts';
import '@/ai/flows/answer-user-question.ts';