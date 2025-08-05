import { AppLayout } from '@/components/layout/app-layout';
import { PricingTiers } from '@/components/pricing/pricing-tiers';

export default function PricingPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Upgrade Your Plan</h1>
          <p className="text-muted-foreground">
            Unlock powerful AI features and accelerate your learning with a Pro subscription.
          </p>
        </div>
        <div className="pt-8">
            <PricingTiers />
        </div>
      </div>
    </AppLayout>
  );
}
