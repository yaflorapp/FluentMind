import { AppLayout } from '@/components/layout/app-layout';
import { AccountManagement } from '@/components/account/account-management';
import { Separator } from '@/components/ui/separator';

export default function AccountPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
          <p className="text-muted-foreground">
            Manage your account details and subscription plan.
          </p>
        </div>
        <Separator />
        <AccountManagement />
      </div>
    </AppLayout>
  );
}
