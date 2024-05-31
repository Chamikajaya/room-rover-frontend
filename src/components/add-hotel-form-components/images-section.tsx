"use client";

import { ImageUp, Trash} from "lucide-react";
import {useFormContext} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {HotelFormData} from "@/components/add-hotel-form-components/add-hotel-form";
import {Separator} from "@/components/ui/separator";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import React from "react";

export default function ImagesSection() {
    const {control, register, setValue, watch, formState: {errors}} = useFormContext<HotelFormData>();

    const alreadyExistingImgUrls = watch("imageURLs");

    const removeImage = async ( e:React.MouseEvent<HTMLButtonElement, MouseEvent>, imgUrl:string ) => {

        e.preventDefault();  // The default action of a button click event inside a form is to submit the form. Since we don't want that to happen, we prevent the default action of the button click event. 😊

        setValue("imageURLs", alreadyExistingImgUrls.filter((url) => url !== imgUrl));  // remove the image from the list of already existing images


    }

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
                                <>
                                    {alreadyExistingImgUrls && (
                                        <div className={"grid grid-cols-5 gap-4 "}>{
                                            alreadyExistingImgUrls.map((imgUrl, idx) => (
                                                <div key={idx} className={"relative group"}>
                                                    <Image
                                                        src={imgUrl}
                                                        alt={`Image ${idx}`}
                                                        layout="responsive"
                                                        width={400}
                                                        height={400}
                                                        className="object-cover"
                                                    />
                                                    <div
                                                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                        <Button
                                                            variant={"outline"}
                                                            size={"icon"}
                                                            onClick={(e) => removeImage(e, imgUrl)}
                                                        >
                                                            <Trash size={20}/>
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))
                                        }</div>
                                    )}
                                    <Input
                                        type={"file"}
                                        multiple
                                        accept={"image/*"}
                                        className={"mt-10"}
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
                                </>

                            </FormControl>
                            {errors.imageFiles && <FormMessage
                                className="text-red-400 font-normal">{errors.imageFiles.message}</FormMessage>}
                        </FormItem>
                    )}/>
            </div>
            <Separator className={"bg-primary my-4"}/>
        </>
    );
}
