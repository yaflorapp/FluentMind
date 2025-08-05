import { AppLayout } from '@/components/layout/app-layout';
import { VirtualPartnerChat } from '@/components/dashboard/virtual-partner-chat';

export default function DashboardPage() {
  return (
    <AppLayout>
      <VirtualPartnerChat />
    </AppLayout>
  );
}
