"use client";

import {ImageUp} from "lucide-react";
import {useFormContext} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {HotelFormData} from "@/components/add-hotel-form-components/add-hotel-form";
import {Separator} from "@/components/ui/separator";


export default function ImagesSection() {

    const {control, register, formState: {errors}} = useFormContext<HotelFormData>()

    return (
        <>
            <div className="my-6">
                <FormField
                    control={control}
                    name="imageFiles"
                    render={({}) => (
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
                                            const totalLength = imageFiles.length;

                                            if (totalLength === 0) {
                                                return "You must upload at least one image";
                                            } else if (totalLength > 5) {
                                                return "You can upload up to 5 images";
                                            }
                                        }
                                    })} />

                            </FormControl>
                            {errors.imageFiles && <FormMessage
                                className="text-red-400 font-normal">{errors.imageFiles.message}</FormMessage>}
                        </FormItem>
                    )}/>
            </div>
            <Separator className={"bg-primary my-4"}/></>
    )
}