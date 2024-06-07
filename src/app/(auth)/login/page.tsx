import SignInForm from "@/components/auth-components/sign-in-form";
import { Suspense } from "react";


export default function SignInPage() {
    return (
        <div className="flex m-4 items-center justify-center">
            <Suspense fallback={<div>Loading...</div>}>
                <SignInForm />
            </Suspense>
        </div>
    );
}
