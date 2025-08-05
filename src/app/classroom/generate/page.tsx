import { AppLayout } from '@/components/layout/app-layout';
import { CourseGenerator } from '@/components/classroom/course-generator';
import { Separator } from '@/components/ui/separator';

export default function GenerateCoursePage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Course Generator</h1>
          <p className="text-muted-foreground">
            Create a custom course outline on any subject. This is a Pro feature.
          </p>
        </div>
        <Separator />
        <CourseGenerator />
      </div>
    </AppLayout>
  );
}
