"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster, toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post("/api/v1/auth/signup", { email, password });
      return res.data;
    },
    onSuccess: (data) => {
      console.log("Signup response:", data);

      const errorMsg = data?.error;
      const userId = data?.data?.id;
      const userEmail = data?.data?.email;

      if (errorMsg) {
        toast.error(errorMsg);
        return;
      }

      if (userId && userEmail) {
        toast.success("Signup successful — you can now log in.");
        router.push("/login");
      } else {
        toast.error("Signup failed — Invalid server response.");
      }
    },
    onError: (err: import("axios").AxiosError<{ error?: string }>) => {
      const message =
        err?.response?.data?.error ||
        err?.message ||
        "Signup failed. Please try again.";
      toast.error(message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning("Please fill in both fields.");
      return;
    }
    signupMutation.mutate();
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Toaster position="top-right" richColors closeButton />
      <Card className="w-full max-w-md p-4 shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Create an Account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={signupMutation.isPending}
            >
              {signupMutation.isPending ? "Signing up..." : "Sign up"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Sign in
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
