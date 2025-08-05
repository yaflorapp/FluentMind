"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, BarChart } from 'lucide-react';
import { assessEnglishProficiencyAction } from '@/app/performance/actions';
import type { AssessEnglishProficiencyOutput } from '@/ai/flows/assess-english-proficiency';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { Bar, XAxis, YAxis, CartesianGrid, BarChart as RechartsBarChart } from "recharts"

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function PerformanceDashboard() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [assessment, setAssessment] = useState<AssessEnglishProficiencyOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAssess = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    setError(null);
    setAssessment(null);

    const result = await assessEnglishProficiencyAction(text);

    if (result.error) {
      setError(result.error);
    } else {
      setAssessment(result.assessment!);
    }
    setIsLoading(false);
  };
  
  const chartData = assessment ? [
    { category: 'Grammar', score: assessment.scores.grammar },
    { category: 'Vocabulary', score: assessment.scores.vocabulary },
    { category: 'Fluency', score: assessment.scores.fluency },
    { category: 'Pronunciation', score: assessment.scores.pronunciation },
  ] : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Proficiency Assessment</CardTitle>
          <CardDescription>
            Paste in text from a conversation or a piece of writing to get an assessment of your English proficiency.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here..."
            rows={10}
            disabled={isLoading}
          />
          <Button onClick={handleAssess} disabled={isLoading || !text.trim()} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Assess My English
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Assessment Results</CardTitle>
          <CardDescription>
            Your proficiency scores and feedback will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {!assessment && !isLoading && !error && (
             <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                <BarChart className="h-8 w-8 mx-auto mb-2" />
                <p>Your assessment results will be displayed here.</p>
            </div>
          )}
          {isLoading && (
            <div className="flex justify-center items-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {assessment && (
            <div className="space-y-6">
              <div className="text-center">
                  <p className="text-muted-foreground">Overall Proficiency</p>
                  <p className="text-4xl font-bold text-primary">{assessment.overallProficiency}</p>
                  <p className="text-sm text-muted-foreground mt-1">{assessment.summary}</p>
              </div>

              <ChartContainer config={chartConfig} className="w-full h-[250px]">
                <RechartsBarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                   <YAxis domain={[0, 100]} />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Bar dataKey="score" fill="var(--color-score)" radius={4} />
                </RechartsBarChart>
              </ChartContainer>

              <div>
                <h4 className="font-semibold mb-2">Strengths:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {assessment.strengths.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Areas for Improvement:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {assessment.weaknesses.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
