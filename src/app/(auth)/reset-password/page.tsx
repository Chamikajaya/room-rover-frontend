import NewPasswordForm from "@/components/auth-components/new-password-form";
import { Suspense } from "react";



export default function PasswordResetPage() {
    return (
        <div className="flex m-4 items-center justify-center">
            <Suspense fallback={<div>Loading...</div>}>
                <NewPasswordForm />
            </Suspense>
        </div>
    );
}