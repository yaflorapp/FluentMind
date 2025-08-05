export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'pdf';
  content: string;
  description: string;
  isPro: boolean;
}
