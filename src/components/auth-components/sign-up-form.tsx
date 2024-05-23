"use client";

import CardWrapper from "@/components/auth-components/card-wrapper";
import {SignUpSchema, signUpSchema} from "@/schemas/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
// import FormError from "@/components/FormError";
// import FormSuccess from "@/components/FormSuccess";
import {useState} from "react";
// import axios from "axios";
import toast from "react-hot-toast";  // ! do not remove this - onsubmit function uses it later
import {Lock, Mail, User} from "lucide-react";


export default function SignUpForm() {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formErrMsg, setFormErrMsg] = useState("")
    const [formSuccessMsg, setFormSuccessMsg] = useState("")

    const form = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: ""
        }
    })

    // TODO: Implement onSubmit function

    const onSubmit = async (formData: SignUpSchema) => {
        // try {
        //     setIsSubmitting(true)
        //     setFormErrMsg("")
        //     setFormErrMsg("")
        //     const response = await axios.post("/api/auth/sign-up", formData);
        //
        //     if (response.data.errorMessage) {
        //         setFormErrMsg(response.data.errorMessage)
        //     } else if (response.data.successMessage) {
        //         setFormSuccessMsg(response.data.successMessage)
        //     }
        //
        // } catch (e) {
        //     console.error(e)
        //     toast.error("Something went wrong")
        // } finally {
        //     setIsSubmitting(false)
        // }


    }

    return (
        <CardWrapper
            title="Fist step in finding your dream stay 🏡"
            backBtnLabel="Already have an account ? "
            backBtnLink="/sign-in"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                            name="firstName"
                            render={({field}) => (
                                <FormItem className={""}>
                                    <FormLabel className={"font-normal flex gap-2 items-center"}>
                                        First Name
                                        <User className={"h-4 w-4"}/>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type={"text"}
                                            placeholder={"your username here"}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({field}) => (
                                <FormItem className={""}>
                                    <FormLabel className={"font-normal flex gap-2 items-center"}>
                                        Last Name
                                        <User className={"h-4 w-4"}/>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type={"text"}
                                            placeholder={"your username here"}
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
                                        <Input
                                            {...field}
                                            type={"password"}
                                            placeholder={"*****"}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className={"font-normal flex gap-2"}>
                                        Confirm Password
                                        <Lock/>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type={"password"}
                                            placeholder={"*****"}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    {/*<FormError errMessage={formErrMsg}/>*/}
                    {/*<FormSuccess successMessage={formSuccessMsg}/>*/}
                    <Button type="submit" className="w-full" size={"sm"} disabled={isSubmitting}>
                        Create an account
                    </Button>

                </form>


            </Form>
        </CardWrapper>
    )
}