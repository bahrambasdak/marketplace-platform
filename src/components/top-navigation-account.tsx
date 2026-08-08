"use client";


import { use, useEffect, useState } from "react";
import { UserSession } from "../types/auth.types";
import Image from "next/image";

export function TopNavigationAccount() {
    const [session, setSession] = useState({} as UserSession);
  useEffect(() => {
    const fetchSession = async () => {
      const response = await fetch("/api/auth/session");
      if (response.ok) {
        const session = await response.json() as UserSession;
        setSession(session);
        console.log("Session data:", session);
      }
    };
    fetchSession();
  }, []);

  return <div className="flex items-center gap-2">
    {session?.pic && (
      <Image src={session.pic} alt="" width={40} height={40} className="rounded-full border" />
    )}
    {session?.fullName && (
      <span className="ml-2">{session.fullName}</span>
    )}
  </div>;
}
