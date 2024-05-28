"use client";

import CardWrapper from "@/components/auth-components/card-wrapper";
import {SignUpSchema, signUpSchema} from "@/schemas/authValidation";

import {zodResolver} from "@hookform/resolvers/zod";
import {FormProvider, useForm} from "react-hook-form";
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
import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {Lock, Mail, User} from "lucide-react";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import {useRouter} from "next/navigation";
import {hotelCreationSchema, HotelCreationSchema} from "@/schemas/hotelValidation";
import MainDetailsSection from "@/components/add-hotel-form-components/main-details-section";


export default function SignUpForm() {

    const formMethods = useForm<HotelCreationSchema>({
        resolver:zodResolver(hotelCreationSchema)
    })

    // const router = useRouter();
    //
    // const [isSubmitting, setIsSubmitting] = useState(false)
    // const [formErrMsg, setFormErrMsg] = useState("")
    // const [formSuccessMsg, setFormSuccessMsg] = useState("")

    // const form = useForm<SignUpSchema>({
    //     resolver: zodResolver(signUpSchema),
    //     defaultValues: {
    //         email: "",
    //         password: "",
    //         firstName: "",
    //         lastName: ""
    //     }
    // })

    // const onSuccessfulSubmit = () => {
    //     router.push("/")
    //     router.refresh();
    //
    // };


    const onSubmit = async (formData: SignUpSchema) => {

        // try {
        //
        //     setIsSubmitting(true)
        //     setFormErrMsg("")
        //     setFormSuccessMsg("")
        //
        //     const response = await axios.post(
        //         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/register`,
        //         formData,
        //         {
        //             withCredentials: true
        //         }
        //     );
        //
        //     console.log(response);
        //
        //     if (response.status === 201) {
        //         toast.success("Account created successfully" ,{duration:300000})
        //         onSuccessfulSubmit();
        //     } else {
        //         toast.error("Something went wrong");
        //     }
        //
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
            title="Let the world know about your hotel 🏠"
            backBtnLabel="Already have an account ? "
            backBtnLink="/login"
            formTopic={"Add Hotel ➕"}
        >
            <FormProvider {...formMethods}>
                <form >
                    <MainDetailsSection/>

                </form>
            </FormProvider>


        </CardWrapper>
    )
}

// "use client";
// import {useContext} from "react";
// import AuthContext from "../../../context/auth-context";
//
//
//
// export default function AddHotelForm() {
//     const {isAuthenticated} = useContext(AuthContext);
//
//
//     return (
//         <>
//             {isAuthenticated && <h1>Hello World</h1>}
//         </>
//     )
// }