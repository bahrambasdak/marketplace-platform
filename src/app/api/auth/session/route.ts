import { decryptSession } from "@/src/app/utils/session";
import { cookies } from "next/headers";


export async function GET() {
  const cookieStore = await cookies();
  const encryptedSession = cookieStore.get("session")?.value;
  const session = await decryptSession(encryptedSession as string);
  return Response.json(session);
} 