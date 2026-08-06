import { z } from "zod";
import { SignInSchema  } from "./schema";



export type SignInModel  = z.infer<typeof SignInSchema >;  