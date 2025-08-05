import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Check, BrainCircuit, BookOpen, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: <BrainCircuit className="w-8 h-8 text-primary" />,
    title: 'Personalized Tutoring',
    description: 'Our AI tutor adapts to your learning style, providing customized explanations and practice problems to help you master any subject.',
  },
  {
    icon: <BookOpen className="w-8 h-8 text-primary" />,
    title: 'Interactive Lessons',
    description: 'Engage with dynamic video and PDF lessons, designed to make learning active and effective. Ask questions and get instant feedback.',
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-primary" />,
    title: 'Progress Tracking',
    description: 'Monitor your progress with detailed analytics. Identify your strengths and weaknesses to focus your efforts where they matter most.',
  },
];

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
    cta: 'Start for Free',
    variant: 'secondary' as const,
  },
  {
    name: 'Pro',
    price: '$15',
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

export default function WelcomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 tracking-tight">FluentMind AI Tutor</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Unlock Your Potential with Personalized AI-Powered Learning. Master any subject faster with a tutor that's always available.
            </p>
            <Button asChild size="lg">
              <Link href="/signup">Get Started for Free</Link>
            </Button>
            <div className="mt-16">
              <Image
                src="https://placehold.co/1000x600.png"
                alt="AI Tutor Dashboard"
                width={1000}
                height={600}
                className="rounded-lg shadow-2xl mx-auto"
                data-ai-hint="education dashboard"
              />
            </div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-2">Why FluentMind?</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Discover the features that make our AI tutor the ultimate learning companion.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                      {feature.icon}
                    </div>
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-2">Choose Your Plan</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Simple, transparent pricing. Get started for free, then upgrade when you're ready.
            </p>
            <div className="flex justify-center items-stretch gap-8 max-w-4xl mx-auto flex-col md:flex-row">
              {pricingTiers.map((tier) => (
                <Card key={tier.name} className={`flex flex-col ${tier.highlight ? 'border-primary ring-2 ring-primary' : ''}`}>
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
                    <Button asChild className="w-full" variant={tier.variant}>
                      <Link href="/signup">{tier.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
