"use server";

import { auth } from "@/lib/firebase-admin";
import { db } from "@/lib/firebase-admin";
import { Stripe } from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSessionAction(priceId: string): Promise<{ url?: string; error?: string }> {
    const host = headers().get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const redirectUrl = `${protocol}://${host}/dashboard`;
    
    // This is a placeholder for getting the current logged-in user's ID
    // In a real app, you would get this from the session
    const userId = "placeholder-user-id"; 

    if (!userId) {
        return { error: "User is not authenticated." };
    }

    try {
        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: redirectUrl,
            cancel_url: redirectUrl,
            metadata: {
                userId,
            },
        });

        if (!checkoutSession.url) {
            return { error: "Could not create Stripe checkout session." };
        }

        return { url: checkoutSession.url };

    } catch (error: any) {
        console.error("Stripe error:", error.message);
        return { error: "Failed to create checkout session. Please try again." };
    }
}
