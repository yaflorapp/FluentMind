"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

// This is placeholder data. In a real application, you would fetch this from Firestore.
const feedbackData = [
  {
    date: "2024-07-28",
    feedback: "Good use of past tense, but remember to use 'an' before vowel sounds, e.g., 'an apple'.",
    context: "User: I eated a apple. AI: I ate an apple."
  },
  {
    date: "2024-07-27",
    feedback: "Excellent vocabulary! The phrase 'plethora of options' is very advanced. Keep it up!",
    context: "User: There are a plethora of options."
  },
  {
    date: "2024-07-25",
    feedback: "Be careful with subject-verb agreement. It should be 'He goes' not 'He go'.",
    context: "User: He go to the store."
  },
   {
    date: "2024-07-22",
    feedback: "The pronunciation of 'through' was a little unclear. Try to emphasize the 'th' sound.",
    context: "User audio snippet"
  }
];

export function HistoricalFeedback() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Feedback History</CardTitle>
            <CardDescription>Review feedback from your past practice sessions.</CardDescription>
        </CardHeader>
        <CardContent>
            {feedbackData.length > 0 ? (
                <div className="space-y-4">
                    {feedbackData.map((item, index) => (
                        <Alert key={index}>
                            <AlertTitle className="flex justify-between items-center">
                                <span>Feedback</span>
                                <span className="text-xs font-normal text-muted-foreground">{item.date}</span>
                            </AlertTitle>
                            <AlertDescription>
                                <p className="font-semibold">{item.feedback}</p>
                                <p className="text-xs text-muted-foreground mt-1 italic">Context: "{item.context}"</p>
                            </AlertDescription>
                        </Alert>
                    ))}
                </div>
            ) : (
                <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                    <p>No feedback history yet. Start a conversation with the Virtual Partner to get feedback.</p>
                </div>
            )}
        </CardContent>
    </Card>
  )
}
