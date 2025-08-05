import { AppLayout } from '@/components/layout/app-layout';
import { PerformanceDashboard } from '@/components/performance/performance-dashboard';
import { Separator } from '@/components/ui/separator';
import { HistoricalFeedback } from '@/components/performance/historical-feedback';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function PerformancePage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Performance</h1>
          <p className="text-muted-foreground">
            Assess your skills and track your progress over time.
          </p>
        </div>
        <Separator />
        <Tabs defaultValue="assessment">
          <TabsList>
            <TabsTrigger value="assessment">Proficiency Assessment</TabsTrigger>
            <TabsTrigger value="feedback">Historical Feedback</TabsTrigger>
          </TabsList>
          <TabsContent value="assessment">
             <PerformanceDashboard />
          </TabsContent>
          <TabsContent value="feedback">
            <HistoricalFeedback />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
