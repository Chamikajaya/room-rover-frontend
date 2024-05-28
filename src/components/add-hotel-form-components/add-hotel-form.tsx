"use client"

import CardWrapper from "@/components/auth-components/card-wrapper"
import { hotelCreationSchema, HotelCreationSchema } from "@/schemas/hotelValidation"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import MainDetailsSection from "@/components/add-hotel-form-components/main-details-section"
import HotelTypeSection from "@/components/add-hotel-form-components/hotel-type-section"
import FacilitiesSection from "@/components/add-hotel-form-components/facilities-section";

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
            formTopic="Add Hotel ➕"
        >
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                    <MainDetailsSection />
                    <HotelTypeSection />
                    <FacilitiesSection/>
                </form>
            </FormProvider>
        </CardWrapper>
    )
}
