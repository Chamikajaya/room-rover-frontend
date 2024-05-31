"use client"

import CardWrapper from "@/components/auth-components/card-wrapper"
import {FormProvider, useForm} from "react-hook-form"
import MainDetailsSection from "@/components/add-hotel-form-components/main-details-section"
import HotelTypeSection from "@/components/add-hotel-form-components/hotel-type-section"
import FacilitiesSection from "@/components/add-hotel-form-components/facilities-section";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import ImagesSection from "@/components/add-hotel-form-components/images-section";
import toast from "react-hot-toast";
import axios from "axios";
import {Loader2} from "lucide-react";

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


interface AddHotelFormProps {
    hotel?: HotelFormData;
}


// Designed this component so that I can reuse the same for both adding and updating hotels by passing the hotel object as a prop. 😊😊😊
export default function AddHotelForm({hotel}: AddHotelFormProps) {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const formMethods = useForm<HotelFormData>({
        defaultValues: hotel,  // * If hotel is passed, then the form will be pre-filled with the hotel data
    });
    const {handleSubmit, reset} = formMethods;


    /*
    The useEffect hook is used to watch for changes in the hotel prop. When hotel data changes (i.e., when it's fetched and passed to the component), the reset function from react-hook-form is called to update the form values with the new data.
     */
    useEffect(() => {
        if (hotel) {
            reset(hotel);
        }
    }, [hotel, reset]);

    const onSubmit = handleSubmit(async (formData) => {
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
            <FormProvider {...formMethods}>
                <form onSubmit={onSubmit}>
                    <MainDetailsSection/>
                    <HotelTypeSection/>
                    <FacilitiesSection/>
                    <ImagesSection/>
                    <div className="flex justify-center">
                        <Button type="submit" className="w-[50%]" size={"sm"} disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className={"animate-spin mr-3"}></Loader2>
                                    <span>Submitting</span>
                                </>
                            ) : (
                                <span>Submit</span>
                            )}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </CardWrapper>
    );
}
