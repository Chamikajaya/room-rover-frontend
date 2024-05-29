"use client";

import {CheckCheck, ImageUp, MapPin} from "lucide-react";
import {HotelCreationSchema} from "@/schemas/hotelValidation";
import {useFormContext} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {hotelFacilities} from "@/constants/hotel-facilities";
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";


export default function ImagesSection() {

    const {control, register, formState: {errors}} = useFormContext<HotelCreationSchema>()

    return (
        <div className="my-6">
            <FormField
                control={control}
                name="imageFiles"
                render={({field}) => (
                    <FormItem>
                        <FormLabel className={"font-normal flex gap-2 items-center"}>
                            Images
                            <ImageUp/>
                        </FormLabel>
                        <FormControl>
                            <Input
                                type={"file"}
                                multiple
                                accept={"image/*"}
                                {...register(("imageFiles"), {
                                    validate: (imageFiles) => {
                                        const totalLength = imageFiles.length

                                        if (totalLength === 0) {
                                            return "You must upload at least one image"
                                        } else if (totalLength > 5) {
                                            return "You can upload up to 5 images"
                                        }
                                    }
                                })}
                            />

                        </FormControl>
                        {errors.imageFiles && <FormMessage
                            className="text-red-400 font-normal">{errors.imageFiles.message}</FormMessage>}
                    </FormItem>
                )}
            />


        </div>
    )
}