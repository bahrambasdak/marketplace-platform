import { UserSession } from "@/src/types/auth.types";
import { jwtVerify, SignJWT } from "jose";

const JWT_SECRET = process.env.JWT_SECRET ; 
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
  return payload ;

}
