"use client";

import { useState } from 'react';
import Image from 'next/image';
import { lessons } from '@/lib/placeholder-data';
import type { Lesson } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LessonSummary } from './lesson-summary';
import { PracticeQuestions } from './practice-questions';
import { Lock, PlayCircle, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LessonView() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(lessons[0]);

  return (
    <div className="grid md:grid-cols-[300px_1fr] gap-8 h-full">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Course Content</h2>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-2 pr-4">
            {lessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => setSelectedLesson(lesson)}
                className={cn(
                  "w-full text-left p-3 rounded-lg border transition-colors",
                  selectedLesson?.id === lesson.id
                    ? "bg-primary/10 border-primary"
                    : "hover:bg-muted"
                )}
              >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {lesson.type === 'video' ? <PlayCircle className="h-5 w-5 text-primary" /> : <FileText className="h-5 w-5 text-primary" />}
                        <span className="font-medium">{lesson.title}</span>
                    </div>
                  {lesson.isPro && <Lock className="h-4 w-4 text-amber-500" />}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{lesson.description}</p>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="pr-4">
          {selectedLesson ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{selectedLesson.title}</CardTitle>
                    <CardDescription>{selectedLesson.description}</CardDescription>
                  </div>
                  {selectedLesson.isPro && (
                    <Button variant="default" size="sm">
                      <Lock className="mr-2 h-4 w-4" /> Upgrade to Pro
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedLesson.type === 'video' && (
                  <div className="aspect-video bg-slate-800 rounded-lg overflow-hidden">
                    <Image
                      src="https://placehold.co/1600x900.png"
                      alt="Lesson video thumbnail"
                      width={1600}
                      height={900}
                      className="w-full h-full object-cover"
                      data-ai-hint="lesson video"
                    />
                  </div>
                )}
                <div className="prose prose-stone dark:prose-invert max-w-none">
                    <p className="whitespace-pre-wrap">{selectedLesson.content}</p>
                </div>
                
                {selectedLesson.isPro ? (
                  <div className="text-center p-8 border-2 border-dashed rounded-lg">
                    <Lock className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-semibold">This is a Pro lesson</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Upgrade your plan to access interactive AI features for this lesson.</p>
                    <Button className="mt-4">Upgrade to Pro</Button>
                  </div>
                ) : (
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>AI Lesson Summary</AccordionTrigger>
                            <AccordionContent>
                                <LessonSummary lessonContent={selectedLesson.content} />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>AI Practice Questions</AccordionTrigger>
                            <AccordionContent>
                                <PracticeQuestions lessonContent={selectedLesson.content} />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                )}

              </CardContent>
            </Card>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>Select a lesson to get started.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
