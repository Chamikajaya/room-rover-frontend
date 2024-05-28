"use client";

import { hotelType } from "@/constants/hotelType";
import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Castle } from "lucide-react";
import {Separator} from "@/components/ui/separator";

export default function HotelTypeSection() {
    const { control, watch, register } = useFormContext();
    const typeWatch = watch("hotelType");

    return (
        <>
            <div className="my-6">
                <FormField
                    control={control}
                    name="hotelType"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="font-normal flex gap-2 items-center mb-4">
                                Hotel Type
                                <Castle/>
                            </FormLabel>
                            <FormControl>
                                <div className="grid grid-cols-3 gap-2 md:grid-cols-3">
                                    {hotelType.map((type, idx) => (
                                        <label
                                            key={idx}
                                            className={`cursor-pointer text-center text-sm rounded-full px-4 py-2  flex items-center justify-center ${typeWatch === type
                                                ? "bg-purple-400 text-white font-semibold"
                                                : "bg-primary-foreground text-black"}`}
                                        >
                                            <input
                                                type="radio"
                                                value={type}
                                                {...register("hotelType", {
                                                    required: "This field is required",
                                                })}
                                                className="hidden"/>
                                            {type}
                                        </label>
                                    ))}
                                </div>
                            </FormControl>
                            <FormMessage className="text-red-400 font-normal"/>
                        </FormItem>
                    )}/>

            </div>
            <Separator className={"bg-primary"}/>
        </>
    );
}
