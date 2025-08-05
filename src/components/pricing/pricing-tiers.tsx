"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Check, Loader2 } from 'lucide-react';
import { createCheckoutSessionAction } from '@/app/pricing/actions';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const pricingTiers = [
  {
    name: 'Free',
    price: '$0',
    period: '/ month',
    description: 'Get started with the basics and experience the power of AI learning.',
    features: [
      'Access to 3 lessons',
      'Limited AI Tutor chat',
      'Basic progress tracking',
    ],
    cta: 'Your Current Plan',
    variant: 'secondary' as const,
    disabled: true,
  },
  {
    name: 'Pro',
    price: '$15',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID, // Placeholder for your actual price ID from Stripe
    period: '/ month',
    description: 'Unlock the full potential of FluentMind with unlimited access and premium features.',
    features: [
      'Unlimited lesson access',
      'Unlimited AI Tutor chat',
      'Advanced progress analytics',
      'Priority support',
    ],
    cta: 'Upgrade to Pro',
    variant: 'default' as const,
    highlight: true,
  },
];

export function PricingTiers() {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleUpgradeClick = async (priceId: string | undefined) => {
        if (!priceId) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Stripe Price ID is not configured. Please contact support.",
            });
            return;
        }

        setIsLoading(true);
        try {
            const result = await createCheckoutSessionAction(priceId);
            if (result.error) {
                throw new Error(result.error);
            }
            if (result.url) {
                // The user will be redirected to Stripe by the browser
                window.location.href = result.url;
            } else {
                 throw new Error("Could not create a checkout session.");
            }
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
            setIsLoading(false);
        }
    };


  return (
    <div className="flex justify-center items-stretch gap-8 max-w-4xl mx-auto flex-col md:flex-row">
      {pricingTiers.map((tier) => (
        <Card key={tier.name} className={`flex flex-col w-full md:w-1/2 ${tier.highlight ? 'border-primary ring-2 ring-primary' : ''}`}>
          <CardHeader>
            <CardTitle className="text-primary">{tier.name}</CardTitle>
            <div className="text-4xl font-bold flex items-baseline">
              {tier.price}
              <span className="text-xl font-normal text-muted-foreground">{tier.period}</span>
            </div>
            <CardDescription>{tier.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
                className="w-full"
                variant={tier.variant}
                disabled={tier.disabled || isLoading}
                onClick={() => handleUpgradeClick(tier.priceId)}
            >
                {isLoading && !tier.disabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {tier.cta}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
