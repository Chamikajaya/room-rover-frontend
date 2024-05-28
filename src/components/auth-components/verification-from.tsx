"use client";

import CardWrapper from "@/components/auth-components/card-wrapper";
import {ClockLoader} from "react-spinners";
import {useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import toast from "react-hot-toast";
import axios from "axios";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";


export default function VerificationForm() {


    const searchParams = useSearchParams();  // for getting the query params

    const token = searchParams.get("token");  // getting the token from the query params

    const [error, setError] = useState<string | undefined>();

    const [success, setSuccess] = useState<string | undefined>();


    const onSuccessfulVerification = () => {
        window.location.href = "/"
    };


    /*
    What is useCallBack? ==>
    The useCallback hook is used to memoize a function. Memoization means caching the function so that it doesn't get recreated on every render unless its dependencies change. This is useful for performance optimization, especially when passing callback functions to child components that might otherwise trigger unnecessary re-renders.
     */


    const onSubmit = useCallback(async () => {

        console.log(token);

        // If success or error is already set, don't do anything.
        if (success || error) {
            return;
        }

        if (!token) {
            setError("Token not found");
            return;
        }

        try {
            console.log("Inside try block")
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/verify-email`,
                {token},
                {withCredentials:true}
            );

            console.log(response)

            if (response.data.successMessage) {
                setSuccess(response.data.successMessage)
                onSuccessfulVerification()
            }

        } catch (e) {
            console.error(e);
            // @ts-ignore
            if (e.response.status === 400) {
                setError("Invalid or expired token")
            }
            toast.error("Something went wrong")
        }


    }, [token, success, error]); // The dependency array [token] means onSubmit will only be recreated if token changes.


    // This effect calls onSubmit when the component mounts or when onSubmit changes (which indirectly means when token changes).
    useEffect(() => {
        onSubmit();
    }, [onSubmit]);  // This effect runs the onSubmit function whenever onSubmit changes.

    return (
        <CardWrapper
            title={"Confirming your verification"}
            backBtnLabel={"Back to sign in"}
            backBtnLink={"/login"}
            formTopic={"Verification 🔒"}
        >
            <div className="flex items-center w-full justify-center">
                {!error && !success && <ClockLoader color={"white"}/>}
                <FormSuccess successMessage={success as string}/>
                {/*Show the error msg only if there had never been a success msg, otherwise that weird rendering would happen where I could see both success and error messages 🥹*/}
                {!success && <FormError errMessage={error as string}/>}
            </div>

        </CardWrapper>
    )
}