"use client"

import CardWrapper from "@/components/auth-components/card-wrapper"
import { hotelCreationSchema, HotelCreationSchema } from "@/schemas/hotelValidation"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import MainDetailsSection from "@/components/add-hotel-form-components/main-details-section"
import HotelTypeSection from "@/components/add-hotel-form-components/hotel-type-section"

export default function SignUpForm() {
    const formMethods = useForm<HotelCreationSchema>({
        resolver: zodResolver(hotelCreationSchema)
    })

    const onSubmit = async (formData: HotelCreationSchema) => {
        // Handle form submission
    }

    return (
        <CardWrapper
            title="Let the world know about your hotel 🏠"
            backBtnLabel="Already have an account?"
            backBtnLink="/login"
            formTopic="Add Hotel ➕"
        >
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                    <MainDetailsSection />
                    <HotelTypeSection />
                    {/* Include other form sections here */}
                </form>
            </FormProvider>
        </CardWrapper>
    )
}
