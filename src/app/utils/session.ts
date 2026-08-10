import { UserSession } from "@/src/types/auth.types";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/dist/server/request/cookies";

const JWT_SECRET = process.env.JWT_SECRET;
const encodedkey = new TextEncoder().encode(JWT_SECRET);

export async function encryptSession(session: UserSession): Promise<string> {
  return new SignJWT(session)
    .setProtectedHeader({ alg: "HS256" })
    .sign(encodedkey);
}

export async function decryptSession(session: string) {
  const { payload } = await jwtVerify(session, encodedkey, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  const session = sessionCookie ? await decryptSession(sessionCookie) : null;
  return session as UserSession | null;
}
