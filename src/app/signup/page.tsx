"use client";

import { useState } from "react";
import { useSignup } from "@/hooks/useSignup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster, toast } from "sonner";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signupMutation = useSignup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning("Please fill in both fields.");
      return;
    }
    signupMutation.mutate({ email, password });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-background text-foreground transition-colors">
      <Toaster position="top-right" richColors closeButton />

      <Card className="w-full max-w-md p-6 bg-card text-card-foreground shadow-md border border-border rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Create an Account
          </CardTitle>
          <p className="text-center text-muted-foreground text-sm mt-1">
            Fill in your details to sign up.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-border text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background border-border text-foreground"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:opacity-90 transition-all"
              disabled={signupMutation.isPending}
            >
              {signupMutation.isPending ? "Signing up..." : "Sign up"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              onClick={() => location.assign("/login")}
              className="text-blue-600 hover:underline font-medium"
            >
              Sign in
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
