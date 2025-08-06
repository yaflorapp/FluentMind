"use server";

import { z } from "zod";
import { auth, db } from "@/lib/firebase-admin"; // Using Admin SDK for server-side auth
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
});

export async function signup(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const parsed = signupSchema.safeParse(values);

  if (!parsed.success) {
    return {
      error: parsed.error.flatten().fieldErrors,
    };
  }

  const { email, password, name } = parsed.data;

  try {
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });
    
    // Create a corresponding user document in Firestore
    await db.collection("users").doc(userRecord.uid).set({
        name: name,
        email: email,
        plan: "Free", // Default plan
        isAdmin: false, // Default role
        createdAt: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error("Signup Error:", error);
    if (error.code === 'auth/email-already-exists') {
        return { error: { form: ['Email already in use.'] } };
    }
    return { error: { form: ['Something went wrong. Please try again.'] }};
  }
  
  return { success: "Account created successfully! Please log in." };
}

export async function createSession(idToken: string) {
    try {
        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
        const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
        cookies().set("__session", sessionCookie, {
            maxAge: expiresIn,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
        });
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error("Session creation failed", error);
        return { error: 'Could not create session.' };
    }
}

export async function forgotPassword(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const parsed = forgotPasswordSchema.safeParse(values);

  if (!parsed.success) {
    return {
      error: parsed.error.flatten().fieldErrors,
    };
  }
  
  // This is a placeholder. Firebase Admin SDK doesn't have a method
  // to send password reset emails directly. This must be done client-side.
  // We will adjust this later.
  console.log("Sending password reset for:", parsed.data.email);

  return { success: "If an account with this email exists, a reset link has been sent." };
}

export async function logout() {
  cookies().delete('__session');
  redirect('/login');
}