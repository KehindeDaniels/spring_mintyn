"use client";

import { useState } from "react";
import Topbar from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster, toast } from "sonner";
import { useLogin } from "@/hooks/useLogin";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning("Please fill in both fields.");
      return;
    }
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Topbar />

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-10">
        <Toaster position="top-right" richColors closeButton />

        <Card className="w-full max-w-md border border-border bg-card text-card-foreground rounded-xl shadow-sm transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-center text-2xl font-semibold tracking-tight">
              Welcome Back
            </CardTitle>
            <p className="text-center text-muted-foreground text-sm mt-1">
              Enter your details to log in.
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
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10 bg-background border border-border text-foreground text-sm rounded-md pr-10 focus-visible:ring-1 focus-visible:ring-ring transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 flex items-center justify-center text-muted-foreground hover:text-foreground"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-10 text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 rounded-md transition-all"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Signing in..." : "Login"}
              </Button>
            </form>

            {/* Footer */}
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don’t have an account?{" "}
              <button
                onClick={() => location.assign("/signup")}
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
