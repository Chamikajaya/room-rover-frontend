"use client";

import CardWrapper from "@/components/auth-components/card-wrapper";
import {SignInSchema, signInSchema} from "@/schemas/authValidation";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Lock, Mail} from "lucide-react";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import {useState} from "react";
import axios from "axios";
import {useRouter, useSearchParams} from "next/navigation";
import toast from "react-hot-toast";

export default function SignInForm() {
    const router = useRouter();

    const searchParams = useSearchParams();
    const returnUrl = searchParams.get("returnUrl") || "/";  // if returnUrl is not provided, redirect to the home page else I am taking the user back to the hotel details page which he was trying to book before logging in. 😈😈😈

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrMsg, setFormErrMsg] = useState("");
    const [formSuccessMsg, setFormSuccessMsg] = useState("");

    const form = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSuccessfulSubmit = () => {
        window.location.href = returnUrl;
    };

    const onSubmit = async (formData: SignInSchema) => {
        console.log(formData);

        try {
            setIsSubmitting(true);
            setFormErrMsg("");
            setFormSuccessMsg("");

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/login`,
                formData,
                {
                    withCredentials: true,
                }
            );

            console.log(response);

            if (response.status !== 200) {
                setFormErrMsg(response.data.errorMessage);
            } else {
                setFormSuccessMsg(response.data.successMessage);
                onSuccessfulSubmit();
            }
            console.log(response.data);
        } catch (error) {
            console.error(error);
            // @ts-ignore
            if (error.response.status === 400) {
                setFormErrMsg("Invalid credentials.");
            } else {
                setFormErrMsg("Something went wrong");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const onPasswordForget = async () => {

        try {

            setFormErrMsg("")
            setFormSuccessMsg("")

            const email = form.getValues("email")

            if (!email) {
                setFormErrMsg("Please provide the email address you registered with to send the password reset link.")
                return
            }


            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/request-password-reset`,
                {email},
            );
            console.log(response);

            if (response.status === 200) {
                toast.success("A password reset link has been sent to the provided email address", {duration: 10000});
                setFormSuccessMsg("A password reset link has been sent to your email account.")
            }

        } catch (e) {
            console.error(e)
            setFormErrMsg("We could not send the password reset link. Please try again later.")

        }

    };


    return (
        <CardWrapper
            title="Welcome Back 😊"
            backBtnLabel="Don't have an account ? "
            backBtnLink="/register"
            formTopic={"Login 🔒"}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className={"font-normal flex gap-2"}>
                                        Email
                                        <Mail/>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type={"email"}
                                            placeholder={"your email here"}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className={"font-normal flex gap-2"}>
                                        Password
                                        <Lock/>
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} type={"password"} placeholder={"*****"}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError errMessage={formErrMsg}/>
                    <FormSuccess successMessage={formSuccessMsg}/>
                    <Button
                        type="submit"
                        className="w-full"
                        size={"sm"}
                        disabled={isSubmitting}
                    >
                        Login
                    </Button>
                </form>
            </Form>
            <Button
                size={"sm"}
                variant={"link"}
                className={"font-medium w-full pt-4 text-white"}
                onClick={onPasswordForget}
            >
                Forgot Password ?
            </Button>
        </CardWrapper>
    );
}
