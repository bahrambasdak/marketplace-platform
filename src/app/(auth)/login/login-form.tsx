"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Icon } from "@/src/features/shared/ui/icon";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";


const SIGNIN_API_URL =
  process.env.NEXT_PUBLIC_CLASSBON_URL ? 
  process.env.NEXT_PUBLIC_CLASSBON_URL + "/identity/signin" :"https://general-api.classbon.com/api/identity/signin"

type LoginFormProps = {
  initialMessage?: string;
};

type MessageType = "error" | "success" | "info";

export function LoginForm({ initialMessage }: LoginFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState(initialMessage ?? "");
  const [messageType, setMessageType] = useState<MessageType>(
    initialMessage ? "info" : "info",
  );
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") ?? "").trim();
    const password = String(formData.get("password") ?? "").trim();

    if (!username || !password) {
      setMessageType("error");
      setMessage("Please enter your username and password.");
      return;
    }

    if (password.length < 6) {
      setMessageType("error");
      setMessage("Password must be at least 6 characters.");
      return;
    }

    setIsPending(true);
    setMessage("");
    setMessageType("info");

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

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMessage =
          payload?.message ?? payload?.error ?? "Unable to sign in.";
        setMessageType("error");
        setMessage(errorMessage);
        return;
      }

      setMessageType("success");
      setMessage(payload?.message ?? "Signed in successfully.");
      router.push("/");
    } catch {
      setMessageType("error");
      setMessage("Unable to sign in. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="relative flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to access your marketplace dashboard.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full shadow-2xl p-10 rounded-2xl border border-border bg-card"
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              name="username"
              autoComplete="username"
              placeholder="Enter your username"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              aria-invalid={messageType === "error" ? "true" : "false"}
            />
            {message ? (
              <FieldDescription
                role="status"
                aria-live="polite"
                className={
                  messageType === "error"
                    ? "text-sm text-destructive"
                    : "text-sm text-foreground"
                }
              >
                {message}
              </FieldDescription>
            ) : null}
          </Field>

          <Field orientation="horizontal" className="pt-2">
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Signing in..." : "Sign in"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
