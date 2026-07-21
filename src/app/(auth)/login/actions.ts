"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/src/lib/supabase/server";

const authSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, { message: "رمز عبور باید حداقل 6 کاراکتر باشد" }),
});

function getRedirectMessage(message: string) {
  return `/login?message=${encodeURIComponent(message)}`;
}

export async function signIn(formData: FormData) {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = authSchema.safeParse(rawData);
  if (!result.success) {
    const firstError =
      result.error.issues[0]?.message ?? "Invalid login details.";
    redirect(getRedirectMessage(firstError));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(result.data);

  if (error) {
    redirect(getRedirectMessage(error.message ?? "Unable to sign in."));
  }

  revalidatePath("/", "layout");
  redirect("/");
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
