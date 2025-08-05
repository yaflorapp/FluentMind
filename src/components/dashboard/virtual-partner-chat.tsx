"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Loader2, Mic, Bot, User, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import { continueConversation, generateTalkingHeadVideo, speechToText } from '@/app/dashboard/actions';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  feedback?: string;
}

export function VirtualPartnerChat() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>('https://placehold.co/1280x720.png?text=Your+AI+Tutor');
  const [videoLoading, setVideoLoading] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (messageContent: string) => {
    if (!messageContent.trim()) return;

    const userMessage: Message = { role: 'user', content: messageContent };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setVideoLoading(true);

    try {
      const chatHistory = messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
      const conversationResult = await continueConversation(messageContent, chatHistory);

      if (conversationResult.error) {
        throw new Error(conversationResult.error);
      }

      const aiMessage: Message = {
        role: 'assistant',
        content: conversationResult.response!,
        feedback: conversationResult.feedback,
      };
      setMessages(prev => [...prev, aiMessage]);

      const videoResult = await generateTalkingHeadVideo(conversationResult.response!);
      if (videoResult.error) {
        toast({
          variant: 'destructive',
          title: 'Video Generation Failed',
          description: videoResult.error,
        });
        setVideoUrl(null);
      } else {
        setVideoUrl(videoResult.videoUrl!);
      }
    } catch (error: any) {
      console.error(error);
      const errorMessage = 'Sorry, I encountered an error. Please try again.';
      setMessages(prev => [...prev, { role: 'assistant', content: errorMessage }]);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'An unexpected error occurred.',
      });
    } finally {
      setIsLoading(false);
      setVideoLoading(false);
    }
  };

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    handleSendMessage(input);
    setInput('');
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result as string;
          setIsLoading(true);
          try {
            const transcriptionResult = await speechToText(base64Audio);
            if (transcriptionResult.error) {
              throw new Error(transcriptionResult.error);
            }
            if (transcriptionResult.text) {
              handleSendMessage(transcriptionResult.text);
            }
          } catch (error: any) {
            toast({
              variant: 'destructive',
              title: 'Transcription Failed',
              description: error.message,
            });
            setIsLoading(false);
          }
        };
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        variant: 'destructive',
        title: 'Microphone Access Denied',
        description: 'Please enable microphone permissions in your browser settings.',
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      // Get the tracks and stop them to turn off the microphone light
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    setIsRecording(false);
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 h-full max-h-[calc(100vh-100px)]">
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Virtual Partner</CardTitle>
          <CardDescription>Your personal AI English tutor.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center bg-muted/40 relative">
          {videoLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-10">
              <Loader2 className="h-16 w-16 animate-spin text-white" />
              <p className="text-white mt-4">Generating video...</p>
            </div>
          )}
          {videoUrl ? (
            <video key={videoUrl} className="w-full aspect-video rounded-md" controls autoPlay>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="w-full aspect-video rounded-md bg-slate-800 flex items-center justify-center">
              <p className="text-white">Video will appear here</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>Chat</CardTitle>
          <CardDescription>Interact with your AI tutor below.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
          <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
            <div className="space-y-6">
              {messages.length === 0 && (
                  <div className="text-center text-muted-foreground p-8">
                      <Bot className="h-12 w-12 mx-auto mb-4"/>
                      <p>Ready to practice! Ask a question or say something to get started.</p>
                  </div>
              )}
              {messages.map((message, index) => (
                <div key={index}>
                  <div
                    className={cn(
                      "flex items-start gap-3",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary text-primary-foreground"><Bot /></AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "p-3 rounded-lg max-w-[80%]",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === "user" && (
                      <Avatar className="h-9 w-9">
                        <AvatarFallback><User /></AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                  {message.role === 'assistant' && message.feedback && (
                    <div className="mt-2 text-sm text-amber-600 border-l-4 border-amber-500 pl-3 py-1 ml-12">
                      <strong>Feedback:</strong> {message.feedback}
                    </div>
                  )}
                </div>
              ))}
               {isLoading && !isRecording && (
                <div className="flex items-start gap-3 justify-start">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary text-primary-foreground"><Bot /></AvatarFallback>
                  </Avatar>
                  <div className="p-3 rounded-lg bg-muted flex items-center">
                      <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <form onSubmit={handleTextSubmit} className="flex items-center gap-2 pt-4 border-t">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message or use the microphone..."
              className="flex-1"
              onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleTextSubmit(e);
                  }
              }}
              disabled={isLoading || isRecording}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim() || isRecording}>
              <Send className="h-4 w-4" />
            </Button>
            <Button type="button" size="icon" variant={isRecording ? 'destructive' : 'outline'} onClick={handleMicClick} disabled={isLoading}>
              {isRecording ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
