import Link from "next/link";
import { SubmitButton } from "./submit-button";
import { signIn, signUp } from "./actions";
import { Icon } from "@/shared/ui/icon";

export default async function Login({
  searchParams,
}: {
  searchParams: { message?: string };
}) {

  const {message} = await searchParams;
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-6">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <Icon name="back"  className="text-amber-700 "/>
        Back
      </Link>

      <div className="text-center">
        <h1 className="text-3xl font-semibold">Welcome back { message || ''}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to access your marketplace dashboard.
        </p>
      </div>

      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-4 text-foreground">
        <div className="grid gap-2">
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="rounded-md px-4 py-2 bg-inherit border border-foreground/10"
            type="email"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
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
        <SubmitButton
          formAction={signIn}
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing In..."
        >
          Sign In
        </SubmitButton>
        <SubmitButton
          formAction={signUp}
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton>
        {message ? (
          <p className="mt-4 rounded-md border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm text-foreground text-center">
            {message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
