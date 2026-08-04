


import { z } from "zod";

export const SignInSchema  = z.object({
  username: z.string().min(3, { message: "نام کاربری باید حداقل 3 کاراکتر باشد" }),
  password: z.string().min(8, { message: "رمز عبور حداقل باید 8 کاراکتر باشد" }),
  submit:z.boolean()
});