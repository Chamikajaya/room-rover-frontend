"use client"

import {useFormContext} from "react-hook-form"
import {Checkbox} from "@/components/ui/checkbox"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {hotelFacilities} from "@/constants/hotel-facilities"
import {CheckCheck} from "lucide-react"
import {Separator} from "@/components/ui/separator"
import {HotelCreationSchema} from "@/schemas/hotelValidation";

export default function HotelFacilitiesForm() {
    const {control, register, formState: {errors}} = useFormContext<HotelCreationSchema>()

    return (
        <>
            <div className="my-6">
                <FormField
                    control={control}
                    name="facilities"
                    render={() => (
                        <FormItem>
                            <div className="mb-4">
                                <FormLabel className="font-normal flex gap-2 items-center mb-4">
                                    Facilities
                                    <CheckCheck/>
                                </FormLabel>
                            </div>
                            <FormControl>
                                <div className="grid grid-cols-3 gap-4">
                                    {hotelFacilities.map((facility) => (
                                        <FormField
                                            key={facility.id}
                                            control={control}
                                            name="facilities"
                                            render={({field}) => {
                                                const valueArray: string[] = Array.isArray(field.value) ? field.value : []
                                                return (
                                                    <FormItem className="flex flex-row items-center space-x-3">
                                                        <FormControl>
                                                            <Checkbox
                                                                {...register("facilities", {
                                                                    required: "You must select one or more facilities",
                                                                })}
                                                                checked={valueArray.includes(facility.id)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([...valueArray, facility.id])
                                                                        : field.onChange(valueArray.filter(value => value !== facility.id))
                                                                }}
                                                            />


                                                        </FormControl>


                                                        <FormLabel className="text-sm font-normal">
                                                            {facility.label}
                                                        </FormLabel>

                                                    </FormItem>
                                                )
                                            }}/>
                                    ))}
                                </div>
                            </FormControl>
                            {errors.facilities && <FormMessage
                                className="text-red-400 font-normal">{errors.facilities.message}</FormMessage>}
                        </FormItem>
                    )}/>
            </div>
            <Separator className={"bg-primary my-4"}/>
        </>
    )
}
