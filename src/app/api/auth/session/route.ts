import { decryptSession } from "@/src/app/utils/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const encryptedSession = cookieStore.get("session")?.value;
  if (!encryptedSession) {
    return  NextResponse.json({ error: "No session cookie found" }, {
      status: 400,
    });
  }
  const session = await decryptSession(encryptedSession as string);
  return NextResponse.json(session);
}
