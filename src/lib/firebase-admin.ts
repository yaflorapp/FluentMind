import admin from 'firebase-admin';

// This is temporary, just for seeding.
const lessons = [
    {
      id: '1',
      title: 'Introduction to English Grammar',
      description: 'A comprehensive overview of the basic rules of English grammar.',
      type: 'video' as 'video' | 'pdf',
      isPro: false,
      content: `This lesson covers the fundamental concepts of English grammar. We will explore parts of speech, sentence structure, and basic punctuation. Understanding these building blocks is essential for effective communication. We will cover nouns, verbs, adjectives, adverbs, and more. By the end of this lesson, you will be able to identify the different parts of a sentence and understand how they work together.`
    },
    {
      id: '2',
      title: 'Mastering Verb Tenses',
      description: 'Learn how to use different verb tenses correctly and effectively.',
      type: 'video' as 'video' | 'pdf',
      isPro: false,
      content: `Verb tenses can be tricky, but this lesson simplifies them. We will go through the past, present, and future tenses, including their simple, continuous, and perfect forms. We will use examples and exercises to help you master each tense. Proper use of verb tenses is key to expressing time and sequence accurately in your writing and speech.`
    },
    {
      id: '3',
      title: 'Advanced Sentence Structure',
      description: 'Explore complex sentence structures to make your writing more sophisticated.',
      type: 'pdf' as 'video' | 'pdf',
      isPro: true,
      content: `Take your writing to the next level by learning about advanced sentence structures. This lesson covers compound, complex, and compound-complex sentences. We will also look at different types of clauses and how to use them to create more varied and engaging prose. This is a Pro feature, offering in-depth analysis and advanced exercises.`
    },
    {
      id: '4',
      title: 'The Art of Punctuation',
      description: 'A deep dive into the rules of punctuation, from commas to semicolons.',
      type: 'pdf' as 'video' | 'pdf',
      isPro: false,
      content: `Punctuation is more than just periods and commas. This lesson will teach you how to use a wide range of punctuation marks correctly, including semicolons, colons, apostrophes, and quotation marks. Correct punctuation enhances clarity and adds a professional touch to your writing.`
    },
    {
      id: '5',
      title: 'Business English Essentials',
      description: 'Learn the key vocabulary and phrases for professional communication.',
      type: 'video' as 'video' | 'pdf',
      isPro: true,
      content: `Effective communication is crucial in the business world. This lesson focuses on the essential vocabulary, etiquette, and communication strategies for professional settings. We will cover emails, meetings, presentations, and negotiations. This Pro lesson will give you the confidence to communicate effectively in any business environment.`
    }
];


if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error: any) {
    console.error('Firebase admin initialization error', error.stack);
  }
}

export const auth = admin.auth();
export const db = admin.firestore();

// Seed the database with lessons if it's empty
const seedDatabase = async () => {
    const lessonsCollection = db.collection('lessons');
    const snapshot = await lessonsCollection.limit(1).get();

    if (snapshot.empty) {
        console.log('No lessons found in database, seeding...');
        const batch = db.batch();
        lessons.forEach(lesson => {
            const docRef = lessonsCollection.doc(lesson.id);
            batch.set(docRef, lesson);
        });
        await batch.commit();
        console.log('Database seeded with lessons.');
    }
};

seedDatabase().catch(console.error);
