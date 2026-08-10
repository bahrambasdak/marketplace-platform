"use client";

import { use, useEffect, useState, useTransition } from "react";
import { UserSession } from "../types/auth.types";
import Image from "next/image";
import { useSessionStore } from "../app/stores/auth.store";
import { signOutAction } from "../app/(auth)/signin/actions";
import { useRouter } from "next/navigation";

export function TopNavigationAccount() {
  const status = useSessionStore((state) => state.status);
  const session = useSessionStore((state) => state.session);
  const [isPending, startTransition] = useTransition();
  const clearSession = useSessionStore.getState().clearSession;
  const router = useRouter();

  const handleSignOut = async () => {
    startTransition(async () => {
      const result = await signOutAction();
      if (result?.isSuccess) {
        clearSession();
        router.push("/");
      }
    });
  };

  if (status === "loading") {
    return <div className="flex items-center gap-2">Loading...</div>;
  }
  return (
    <div className="flex items-center gap-2">
      {status === "authenticated" ? (
        <div className="flex gap-2 items-center">
          <Image
            src={session?.pic || "/default-avatar.png"}
            alt="Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span>{session?.fullName}</span>
          <button className="border p-2" onClick={handleSignOut}>
            {isPending ? "در حال خروج..." : "خروج"}
          </button>
        </div>
      ) : (
        <button onClick={() => router.push("/signin")}>ورود</button>
      )}
    </div>
  );
}
