"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPracticeQuestionsAction } from '@/app/classroom/actions';
import { Loader2 } from 'lucide-react';

export function PracticeQuestions({ lessonContent }: { lessonContent: string }) {
  const [questions, setQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateQuestions = async () => {
    setIsLoading(true);
    setError('');
    setQuestions([]);
    const result = await getPracticeQuestionsAction(lessonContent);
    setIsLoading(false);
    if (result.questions) {
      setQuestions(result.questions);
    } else {
      setError(result.error || 'An unexpected error occurred.');
    }
  };

  return (
    <div>
      <Button onClick={handleGenerateQuestions} disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Generate Practice Questions
      </Button>
      {error && <p className="text-destructive mt-4">{error}</p>}
      {questions.length > 0 && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>AI Generated Practice Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-decimal list-inside space-y-2 text-muted-foreground">
              {questions.map((q, index) => (
                <li key={index}>{q}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
