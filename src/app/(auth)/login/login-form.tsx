"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Icon } from "@/src/features/shared/ui/icon";

const SIGNIN_API_URL =
  process.env.NEXT_PUBLIC_IDENTITY_SIGNIN_URL ??
  "https://general-api.classbon.com/api/identity/signin";

type LoginFormProps = {
  initialMessage?: string;
};

export function LoginForm({ initialMessage }: LoginFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState(initialMessage ?? "");
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") ?? "").trim();
    const password = String(formData.get("password") ?? "").trim();

    if (!username || !password) {
      setMessage("Please enter your username and password.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    setIsPending(true);
    setMessage("");

    try {
      const response = await fetch(SIGNIN_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          userAgent: navigator.userAgent,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        const errorMessage =
          payload?.message ?? payload?.error ?? "Unable to sign in.";
        setMessage(errorMessage);
        return;
      }

      const payload = await response.json().catch(() => null);
      setMessage(payload?.message ?? "Signed in successfully.");
      router.push("/");
    } catch {
      setMessage("Unable to sign in. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-6">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <Icon name="back" className="text-amber-700" />
        Back
      </Link>

      <div className="text-center">
        <h1 className="text-3xl font-semibold">
          Welcome back{message ? ` ${message}` : ""}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to access your marketplace dashboard.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="animate-in flex-1 flex flex-col w-full justify-center gap-4 text-foreground"
      >
        <div className="grid gap-2">
          <label className="text-md" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            className="rounded-md px-4 py-2 bg-inherit border border-foreground/10"
            type="text"
            name="username"
            placeholder="username"
            autoComplete="username"
            required
          />
        </div>

        <div className="grid gap-2">
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="rounded-md px-4 py-2 bg-inherit border border-foreground/10"
            type="password"
            name="password"
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
          disabled={isPending}
        >
          {isPending ? "Signing In..." : "Sign In"}
        </button>

        <button
          type="button"
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          onClick={() => router.push("/signup")}
        >
          Sign Up
        </button>

        {message ? (
          <p className="mt-4 rounded-md border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm text-foreground text-center">
            {message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
