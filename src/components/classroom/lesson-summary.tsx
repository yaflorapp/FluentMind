"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getLessonSummaryAction } from '@/app/classroom/actions';
import { Loader2 } from 'lucide-react';

export function LessonSummary({ lessonContent }: { lessonContent: string }) {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setError('');
    setSummary('');
    const result = await getLessonSummaryAction(lessonContent);
    setIsLoading(false);
    if (result.summary) {
      setSummary(result.summary);
    } else {
      setError(result.error || 'An unexpected error occurred.');
    }
  };

  return (
    <div>
      <Button onClick={handleGenerateSummary} disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Generate Lesson Summary
      </Button>
      {error && <p className="text-destructive mt-4">{error}</p>}
      {summary && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>AI Generated Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap">{summary}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
