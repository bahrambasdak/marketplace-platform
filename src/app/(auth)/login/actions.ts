"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { log } from "console";

const authSchema = z.object({
  username: z.string(),
  password: z
    .string()
    .min(6, { message: "رمز عبور باید حداقل 6 کاراکتر باشد" }),
});

function getRedirectMessage(message: string) {
  return `/login?message=${encodeURIComponent(message)}`;
}

export async function signIn(formData: FormData) {
  console.log("kghjhgjhg");
  console.log(formData);

  const rawData = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  console.log("rawData", rawData);

  // const result = authSchema.safeParse(rawData);
  // if (!result.success) {
  //   const firstError =
  //     result.error.issues[0]?.message ?? "Invalid login details.";
  //   redirect(getRedirectMessage(firstError));
  // }

  // const supabase = await createClient();
  // const { error } = await supabase.auth.signInWithPassword(result.data);

  // if (error) {
  //   redirect(getRedirectMessage(error.message ?? "Unable to sign in."));
  // }

  const headersList = headers();
  const userAgent = (await headersList).get("user-agent");
  console.log("userAgent", userAgent);

  // try {
  //     const response = await fetch(`https://general-api.classbon.com/api/identity/signin`, {
  //         method: 'POST',
  //         body: JSON.stringify({ "username":'dcfzxc',"password":'jhghsfd', userAgent }),
  //         headers: {
  //             'Content-Type': 'application/json'
  //         }
  //     });
  //     if (response.ok) {
  //       console.log(await response.json());
  //         revalidatePath("/", "layout");
  //         redirect("/");
  //         // return { isSuccess: true, response: await response.json() }
  //     }
  // } catch {
  //             console.log('errorrrrrr');

  //     // return { isSuccess: false }
  //          redirect(getRedirectMessage( "Unable to sign in."));

  // }
}

export async function signUp(formData: FormData) {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = authSchema.safeParse(rawData);
  if (!result.success) {
    const firstError =
      result.error.issues[0]?.message ?? "Invalid signup details.";
    redirect(getRedirectMessage(firstError));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp(result.data);

  if (error) {
    redirect(getRedirectMessage(error.message ?? "Unable to sign up."));
  }

  revalidatePath("/", "layout");
  redirect("/");
}
