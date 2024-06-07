import VerificationForm from "@/components/auth-components/verification-from";
import {Suspense} from "react";

export default function VerificationPage() {
    return (
        <div className="flex m-4 items-center justify-center">
            <Suspense fallback={<div>Loading...</div>}>

                <VerificationForm/>
            </Suspense>
        </div>
    )
}