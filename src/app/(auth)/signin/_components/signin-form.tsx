"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { FC, FormEvent, startTransition, useState } from "react";
import { Icon } from "@/src/features/shared/ui/icon";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SignInModel } from "../_types";
import { SignInSchema } from "../_types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { start } from "node:repl";
import { signInAction } from "../actions";
import { Card, CardContent } from "@/src/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";



type MessageType = "error" | "success" | "info";

export const SignInForm: FC = () => {

  const form = useForm<SignInModel>({
    resolver: zodResolver(SignInSchema),
        defaultValues: {
      username: "",
      password: "",
    },
  }); 

  const onSubmit = async(data: SignInModel) => {
    startTransition(async() => {
      const responce = await signInAction(data);
      console.log(responce);
    });
  }
      



  return (
        <Card className="w-full sm:max-w-md p-5 md:p-10">
        <CardContent>
        <form id="signin-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    نام کاربری
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="نام کاربری خود را وارد کنید"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    رمز عبور
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="رمز عبور خود را وارد کنید"
                    autoComplete="off"
                    type="password"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          <Button type="submit" form="signin-form" className="mt-3" disabled >
            Submit
          </Button>
          </FieldGroup>
        </form>

        </CardContent>
        


    </Card>
  );
}
