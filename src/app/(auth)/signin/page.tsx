import { Suspense } from "react";
import {  SignInForm } from "./_components/signin-form";

export default async function SignInPage() {

    return <Suspense> <SignInForm /></Suspense>;

}
