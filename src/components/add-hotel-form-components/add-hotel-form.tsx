"use client"

import CardWrapper from "@/components/auth-components/card-wrapper"
import {FormProvider, useForm} from "react-hook-form"
import MainDetailsSection from "@/components/add-hotel-form-components/main-details-section"
import HotelTypeSection from "@/components/add-hotel-form-components/hotel-type-section"
import FacilitiesSection from "@/components/add-hotel-form-components/facilities-section";
import {Button} from "@/components/ui/button";
import {useState} from "react";

import ImagesSection from "@/components/add-hotel-form-components/images-section";


export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    imageUrls: string[];

};

export default function SignUpForm() {

    // const [isSubmitting, setIsSubmitting] = useState(false)


    const formMethods = useForm<HotelFormData>();
    const {handleSubmit, reset} = formMethods;


    const onSubmit = handleSubmit((formData) => {
        console.log("Form submitted");
        console.log(formData);
    });

    return (
        <CardWrapper
            formTopic="Add Hotel ➕"
            title="Let the world know about your hotel 🏠"
        >
            {/*We have to use FormProvider since we have broken down the form into multiple components*/}
            <FormProvider {...formMethods}>
                <form onSubmit={(onSubmit)}>
                    <MainDetailsSection/>
                    <HotelTypeSection/>
                    <FacilitiesSection/>
                    {/*<ImagesSection/>*/}
                    <div className="flex justify-center">
                        <Button type="submit" className="w-[50%]" size={"sm"}>
                            Submit
                        </Button>
                    </div>
                </form>
            </FormProvider>


            {/*<FormProvider {...formMethods}>*/}
            {/*    <form  onSubmit={onSubmit}>*/}

            {/*        <MainDetailsSection />*/}
            {/*        <*/}
            {/*        /!*<Button type="submit" className="w-full" size={"sm"}  >*!/*/}
            {/*        /!*    Submit*!/*/}
            {/*        /!*</Button>*!/*/}

            {/*    </form>*/}


            {/*</FormProvider>*/}

        </CardWrapper>


    )
}
