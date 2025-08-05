# **App Name**: FluentMind AI Tutor

## Core Features:

- Welcome Page: A public-facing landing page that introduces the app, its features, and the benefits of the AI tutors. Include a "Sign Up" button.
- Authentication: Implement user authentication with email/password and social login (Google).
- User Dashboard: A personalized dashboard where users can see their progress. This dashboard will have two main sections: ◦ Classroom: A navigation link to the video and PDF lessons. ◦ AI Tutor Chat: A navigation link to the personalized AI-powered tutoring session.
- Backend Authentication: Firebase Authentication to manage user sign-ups and logins.
- Database: Cloud Firestore to store user data (email, name, subscription status) and to structure the lesson content.
- Serverless Functions: Firebase Cloud Functions to handle all backend logic, including API calls to external services.
- Monetization Logic: Implement subscription plans (e.g., "Free" and "Pro"). Integrate a Stripe payments system using a Firebase Extension. The system should allow users to upgrade from the Free to the Pro plan.
- AI: Gemini, Genkit

## Style Guidelines:

- Primary Blue: #1A237E. The dominant color for backgrounds, navigation, and core UI elements. It evokes trust, professionalism, and calmness, which is perfect for an educational app.
- Accent Orange: #FF9100. A vibrant, energetic color for calls-to-action (CTAs), buttons, and highlights. It represents optimism and creativity.
- Accent Red: #D50000. A powerful, arousing color for alerts, warnings, and emphasis. Use it sparingly to draw attention to critical information, like "Pro" features or error messages.
- Secondary Teal: #00BCD4. A fresh, modern secondary color that pairs well with both blue and orange. Use it for secondary buttons, icons, or to break up the dominant blue.
- Text/Surface: #FFFFFF. Pure white for text on dark backgrounds and for card surfaces.
- Dark Text/Icons: #212121. A deep gray for text on light backgrounds. Avoid pure black for a softer, more modern look.