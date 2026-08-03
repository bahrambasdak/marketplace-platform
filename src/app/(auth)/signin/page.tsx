import { Suspense } from "react";
import {  SignInForm } from "./_components/signin-form";

export default async function SignInPage() {

    return <Suspense> <div className="w-full h-full flex items-center justify-center p-5">
        <SignInForm /></div></Suspense>;

}
