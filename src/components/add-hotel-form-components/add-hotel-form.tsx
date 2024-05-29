"use client"

import CardWrapper from "@/components/auth-components/card-wrapper"
import {FormProvider, useForm} from "react-hook-form"
import MainDetailsSection from "@/components/add-hotel-form-components/main-details-section"
import HotelTypeSection from "@/components/add-hotel-form-components/hotel-type-section"
import FacilitiesSection from "@/components/add-hotel-form-components/facilities-section";
import {Button} from "@/components/ui/button";
import {useState} from "react";

import ImagesSection from "@/components/add-hotel-form-components/images-section";
import toast from "react-hot-toast";
import axios from "axios";


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

export default function AddHotelForm() {

    const [isSubmitting, setIsSubmitting] = useState(false)

    const formMethods = useForm<HotelFormData>();
    const {handleSubmit, reset} = formMethods;


    // const onSubmit = handleSubmit(async (formData) => {
    //     console.log("Form submitted");
    //     console.log(formData);
    //
    //     try {
    //         setIsSubmitting(true);
    //
    //         const response = await axios.post(
    //             `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/my-hotels`,
    //             formData,
    //             {
    //                 withCredentials: true
    //             }
    //         );
    //
    //         console.log(response)
    //
    //         if (response.status !== 201) {
    //             toast.error("Something went wrong. Please try again later.");
    //
    //         } else {
    //             toast.success("Hotel created successfully");
    //             reset();
    //
    //         }
    //         console.log(response.data)
    //
    //
    //     } catch (e) {
    //         console.log("ERROR - CREATE HOTEL @POST --> " + e);
    //         // modify if necessary
    //         toast.error("Something went wrong");
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    //
    //
    // });

    const onSubmit = handleSubmit(async (formData) => {
        console.log("Form submitted");
        console.log(formData);

        try {
            setIsSubmitting(true);

            const formDataObj = new FormData();
            formDataObj.append("name", formData.name);
            formDataObj.append("city", formData.city);
            formDataObj.append("country", formData.country);
            formDataObj.append("description", formData.description);
            formDataObj.append("pricePerNight", formData.pricePerNight.toString());
            formDataObj.append("starRating", formData.starRating.toString());
            formDataObj.append("type", formData.type);

            formData.facilities.forEach((facility, index) => {
                formDataObj.append(`facilities[${index}]`, facility);
            });

            if (formData.imageUrls) {
                formData.imageUrls.forEach((url, index) => {
                    formDataObj.append(`imageUrls[${index}]`, url);
                });
            }

            Array.from(formData.imageFiles).forEach((imageFile) => {
                formDataObj.append(`imageFiles`, imageFile);
            });


            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/my-hotels`,
                formDataObj,
                {
                    withCredentials: true,
                }
            );

            console.log(response);

            if (response.status !== 201) {
                toast.error("Something went wrong. Please try again later.");
            } else {
                toast.success("Hotel created successfully");
                reset();
            }

        } catch (e) {
            console.log("ERROR - CREATE HOTEL @POST --> " + e);
            toast.error("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
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
                    <ImagesSection/>
                    <div className="flex justify-center">
                        <Button type="submit" className="w-[50%]" size={"sm"} disabled={isSubmitting}>
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
