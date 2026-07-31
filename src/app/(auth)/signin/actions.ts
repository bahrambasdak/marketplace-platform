"use server";


import { headers } from "next/headers";
import { SignInModel } from "./_types";

export async function signInAction(model: SignInModel) {
  const headersList = headers();
  const userAgent = (await headersList).get("user-agent");

  try {
    const response = await fetch(
      `https://general-api.classbon.com/api/identity/signin`,
      {
        method: "POST",
        body: JSON.stringify({ ...model, userAgent }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response.ok) {
      return { isSuccess: true, response: await response.json() };
    }
  } catch {
    return { isSuccess: false };
  }
}

