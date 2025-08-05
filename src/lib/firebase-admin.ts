import admin from 'firebase-admin';
import { lessons } from './placeholder-data';

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
