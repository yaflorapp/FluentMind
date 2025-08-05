"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { generateCourseAction } from '@/app/classroom/generate/actions';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const formSchema = z.object({
  subject: z.string().min(3, { message: "Subject must be at least 3 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export function CourseGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [course, setCourse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);
    setCourse(null);

    const result = await generateCourseAction(values.subject);

    if (result.error) {
      setError(result.error);
    } else {
      setCourse(result.coursePlan!);
    }
    setIsLoading(false);
  };

  return (
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Generate a New Course</CardTitle>
                <CardDescription>
                    Enter a subject you want to learn about, and our AI will generate a structured course outline for you.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., 'Advanced English Grammar' or 'Business Negotiations'" {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Generate Course Outline
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Generated Course Plan</CardTitle>
                <CardDescription>
                    The generated course outline will appear below.
                </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-stone dark:prose-invert max-w-none">
                 {error && (
                    <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                {!course && !isLoading && !error && (
                    <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                        <p>Your generated course plan will be displayed here.</p>
                    </div>
                )}
                {isLoading && (
                    <div className="flex justify-center items-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                )}
                {course && (
                    <div className="whitespace-pre-wrap font-sans">{course}</div>
                )}
            </CardContent>
        </Card>
     </div>
  );
}
