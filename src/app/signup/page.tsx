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
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground px-4 transition-colors duration-200">
      <Toaster position="top-right" richColors closeButton />

      <Card className="w-full max-w-md border border-border bg-card text-card-foreground rounded-xl shadow-sm transition-colors">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-2xl font-semibold tracking-tight">
            Create an Account
          </CardTitle>
          <p className="text-center text-muted-foreground text-sm mt-1">
            Fill in your details to sign up.
          </p>
        </CardHeader>

        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 bg-background border border-border text-foreground text-sm rounded-md focus-visible:ring-1 focus-visible:ring-ring transition-all"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 bg-background border border-border text-foreground text-sm rounded-md focus-visible:ring-1 focus-visible:ring-ring transition-all"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-10 text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 rounded-md transition-all"
              disabled={signupMutation.isPending}
            >
              {signupMutation.isPending ? "Signing up..." : "Sign up"}
            </Button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              onClick={() => location.assign("/login")}
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
