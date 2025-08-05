import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Forgot Password</CardTitle>
            <CardDescription>
              Enter your email and we'll send you a link to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <form className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
              />
              <Button type="submit" className="w-full mt-2">
                Send Reset Link
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Remember your password?{" "}
              <Link href="/login" className="underline">
                Log in
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
