import { UserSession } from "@/src/types/auth.types";
import { SignJWT, JWTPayload } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret"; // Replace with your actual secret
const encodedkey = new TextEncoder().encode(JWT_SECRET);

export async function encryptSession(session: UserSession): Promise<string> {
  return new SignJWT(session as unknown as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .sign(encodedkey);
}
