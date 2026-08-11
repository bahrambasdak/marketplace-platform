"use server";

import { cookies, headers } from "next/headers";
import { SignInModel } from "./_types";
import { JWT, UserResponse, UserSession } from "@/src/types/auth.types";
import { jwtDecode } from "jwt-decode";
import {  decryptSession, encryptSession } from "../../utils/session";

  const CLASSBON_URL = process.env.NEXT_PUBLIC_CLASSBON_URL;


export async function signInAction(model: SignInModel) {
  const headersList = headers();
  const userAgent = (await headersList).get("user-agent");

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
export async function signOutAction() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  if (!sessionCookie) {
    return null;
  }
  const session = await decryptSession(sessionCookie);


  try {
    const response = await fetch(`${CLASSBON_URL}/identity/signout`, {
      method: "POST",
      body: JSON.stringify({  sessionId: (session as  UserSession).sessionId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      
      cookieStore.delete("session");
      return { isSuccess: true, response: null };
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
    sessionExpiry: user.sessionExpiry * 1000,
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
