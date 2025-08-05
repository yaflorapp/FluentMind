"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Badge } from "../ui/badge";

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
});

const passwordFormSchema = z.object({
    currentPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
    newPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type PasswordFormValues = z.infer<typeof passwordFormSchema>;


// In a real app, this would come from the user's session/db
const userData = {
    name: "AI Student",
    email: "student@example.com",
    plan: "Free", // or "Pro"
};

export function AccountManagement() {
  const { toast } = useToast();
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: userData.name,
      email: userData.email,
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
        currentPassword: "",
        newPassword: "",
    },
  });

  const onProfileSubmit = (values: ProfileFormValues) => {
    setIsProfileLoading(true);
    console.log("Updating profile...", values);
    setTimeout(() => {
        toast({
            title: "Profile Updated",
            description: "Your name has been updated successfully.",
        });
        setIsProfileLoading(false);
    }, 1000);
  };

  const onPasswordSubmit = (values: PasswordFormValues) => {
    setIsPasswordLoading(true);
    console.log("Updating password...", values);
    setTimeout(() => {
        toast({
            title: "Password Updated",
            description: "Your password has been changed successfully.",
        });
        passwordForm.reset();
        setIsPasswordLoading(false);
    }, 1000);
  };


  return (
    <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                    <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="name@example.com" {...field} disabled />
                        </FormControl>
                         <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" disabled={isProfileLoading}>
                        {isProfileLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </form>
                </Form>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password here.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Form {...passwordForm}>
                    <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                        <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" disabled={isPasswordLoading}>
                            {isPasswordLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Update Password
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>

        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>View your current plan and billing options.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <p>Your current plan:</p>
                    <Badge variant={userData.plan === "Pro" ? "default" : "secondary"}>{userData.plan}</Badge>
                </div>
                <Button asChild>
                    <Link href="/pricing">
                        {userData.plan === "Pro" ? "Manage Subscription" : "Upgrade to Pro"}
                    </Link>
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
