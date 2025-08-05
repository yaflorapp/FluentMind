"use server";

import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function signup(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const parsed = signupSchema.safeParse(values);

  if (!parsed.success) {
    return {
      error: parsed.error.flatten().fieldErrors,
    };
  }

  // In a real app, you'd create a user in Firebase Auth here.
  console.log("Signing up with:", parsed.data);
  
  // This is a placeholder response.
  return { success: "Account created successfully! Please log in." };
}


export async function login(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const parsed = loginSchema.safeParse(values);

  if (!parsed.success) {
    return {
      error: "Invalid email or password.",
    };
  }

  // In a real app, you'd sign in with Firebase Auth here.
  console.log("Logging in with:", parsed.data);
  
  // This is a placeholder. A real implementation would redirect or set a session.
  return { success: true };
}
