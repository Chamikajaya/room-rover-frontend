"use client"

import CardWrapper from "@/components/auth-components/card-wrapper"
import { hotelCreationSchema, HotelCreationSchema } from "@/schemas/hotelValidation"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import MainDetailsSection from "@/components/add-hotel-form-components/main-details-section"
import HotelTypeSection from "@/components/add-hotel-form-components/hotel-type-section"
import FacilitiesSection from "@/components/add-hotel-form-components/facilities-section";
import {Button} from "@/components/ui/button";
import {useState} from "react";

export default function SignUpForm() {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formErrMsg, setFormErrMsg] = useState("")
    const [formSuccessMsg, setFormSuccessMsg] = useState("")


    const formMethods = useForm<HotelCreationSchema>({
        resolver: zodResolver(hotelCreationSchema)
    })

    const onSubmit = async (formData: HotelCreationSchema) => {
        // Handle form submission - later do this
    }

    return (
        <CardWrapper
            formTopic="Add Hotel ➕"
            title="Let the world know about your hotel 🏠"
        >
            {/*We have to use FormProvider since we have broken down the form into multiple components*/}
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                    <MainDetailsSection />
                    <HotelTypeSection />
                    <FacilitiesSection/>
                    <Button type="submit" className="w-full" size={"sm"} disabled={isSubmitting}>
                        Create an account
                    </Button>
                </form>
            </FormProvider>
        </CardWrapper>
    )
}
