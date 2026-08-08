"use server";

import { cookies, headers } from "next/headers";
import { SignInModel } from "./_types";
import { JWT, UserResponse, UserSession } from "@/src/types/auth.types";
import { jwtDecode } from "jwt-decode";
import { access } from "node:fs";
import { decryptSession, encryptSession } from "../../utils/session";

export async function signInAction(model: SignInModel) {
  const headersList = headers();
  const userAgent = (await headersList).get("user-agent");
  const CLASSBON_URL = process.env.NEXT_PUBLIC_CLASSBON_URL;

  try {
    const response = await fetch(`${CLASSBON_URL}/identity/signin`, {
      method: "POST",
      body: JSON.stringify({ ...model, userAgent }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const user = await response.json();
      await setAuthCookieAction(user);
      return { isSuccess: true, response: user };
    }
  } catch {
    return { isSuccess: false };
  }
}

export async function setAuthCookieAction(user: UserResponse) {
  const decoded = jwtDecode<JWT>(user.accessToken);
  const session: UserSession = {
    username: decoded.username,
    fullName: decoded.fullName,
    pic: decoded.pic,
    exp: decoded.exp * 1000,
    accessToken: user.accessToken,
    sessionId: user.sessionId,
    sessionExpiry: user.sessionExpiry,
  };

  const cookieStore = await cookies();
  const encyptedSession = await encryptSession(session)
  
  cookieStore.set("session", encyptedSession, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
}
