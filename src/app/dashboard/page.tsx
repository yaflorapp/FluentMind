import Link from 'next/link';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { School, MessageSquare, ArrowRight, BarChart } from 'lucide-react';

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, User!</h1>
          <p className="text-muted-foreground">Here's a snapshot of your learning journey.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Continue Learning</CardTitle>
              <School className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Introduction to Algebra</div>
              <p className="text-xs text-muted-foreground">You are 75% through this lesson.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/classroom">Go to Classroom <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">AI Tutor</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Need Help?</div>
              <p className="text-xs text-muted-foreground">Our AI is here to answer your questions.</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/tutor">Start Chatting <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4/10 Lessons Completed</div>
              <Progress value={40} className="mt-2" />
            </CardContent>
             <CardFooter>
                <p className="text-xs text-muted-foreground">Keep up the great work!</p>
             </CardFooter>
          </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Unlock Your Full Potential</CardTitle>
                <CardDescription>Upgrade to Pro to get unlimited access to all lessons and advanced features.</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button>Upgrade to Pro</Button>
            </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
