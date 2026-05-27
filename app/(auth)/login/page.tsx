"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { create } from "zustand";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

type AuthState = {
  user: { email: string } | null;
  signIn: (values: LoginFormValues) => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  signIn: async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    set({ user: { email: values.email } });
  },
}));

const Login = () => {
  const { user, signIn } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    await signIn(values);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-100 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-lg border border-slate-300 bg-slate-300 shadow-2xl">
        <CardHeader className="px-8 pt-8">
          <CardTitle className="text-3xl">Sign in to Marketplace</CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                {...register("email")}
                className={
                  errors.email ? "border-rose-400" : "border-slate-900"
                }
              />
              {errors.email && (
                <p className="text-sm text-rose-400">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-rose-400">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          {isSubmitSuccessful && user ? (
            <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
              Welcome back,{" "}
              <span className="font-medium text-white">{user.email}</span>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
