"use client";

import {hotelType} from "@/constants/hotelType";
import {useFormContext} from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Castle} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {HotelCreationSchema} from "@/schemas/hotelValidation";
import {Input} from "@/components/ui/input";

// export default function HotelTypeSection() {
//     const { control, watch, register, formState: { errors } } = useFormContext<HotelCreationSchema>();
//     const typeWatch = watch("hotelType");
//
//     return (
//         <>
//             <div className="my-6">
//                 <FormField
//                     control={control}
//                     name="hotelType"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel className="font-normal flex gap-2 items-center mb-4">
//                                 Hotel Type
//                                 <Castle />
//                             </FormLabel>
//                             <FormControl>
//                                 <div className="grid grid-cols-3 gap-2 md:grid-cols-3">
//                                     {hotelType.map((type, idx) => (
//                                         <label
//                                             key={idx}
//                                             className={`cursor-pointer text-center text-sm rounded-full px-4 py-2 flex items-center justify-center ${typeWatch === type
//                                                 ? "bg-purple-500 text-white font-semibold"
//                                                 : "bg-primary-foreground text-black"}`}
//                                         >
//                                             <input
//                                                 type="radio"
//                                                 value={type}
//                                                 {...register("hotelType", {
//                                                     required: "You must select a hotel type",
//                                                 })}
//                                                 className="hidden"
//                                             />
//                                             {type}
//                                         </label>
//                                     ))}
//                                 </div>
//                             </FormControl>
//                             {errors.hotelType && <FormMessage className="text-red-400 font-normal">{errors.hotelType.message}</FormMessage>}
//                         </FormItem>
//                     )}
//                 />
//             </div>
//             <Separator className={"bg-primary"} />
//         </>
//     );
// }

export default function HotelTypeSection() {
    const {control, watch, register, formState: {errors}} = useFormContext<HotelCreationSchema>();
    const typeWatch = watch("hotelType");

    return (
        <>
            <div className="my-6 ">
                <FormField
                    control={control}
                    name="hotelType"
                    render={() => (
                        <FormItem>
                            <FormLabel className="font-normal flex gap-2 items-center mb-4">
                                Hotel Type
                                <Castle/>
                            </FormLabel>
                            <FormControl>
                                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                                    {hotelType.map((type, idx) => (
                                        <label
                                            key={idx}
                                            className={`cursor-pointer text-center text-sm rounded-full px-4 py-2 flex items-center justify-center    ${typeWatch === type
                                                ? "bg-purple-400 text-white font-semibold"
                                                : "bg-primary-foreground text-black"}`}
                                        >
                                            <Input
                                                type="radio"
                                                value={type}
                                                {...register("hotelType", {
                                                    required: "You must select a hotel type",
                                                })}
                                                className="hidden"
                                            />
                                            <span>{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </FormControl>
                            {errors.hotelType && <FormMessage
                                className="text-red-400 font-normal">{errors.hotelType.message}</FormMessage>}
                        </FormItem>
                    )}
                />
            </div>
            <Separator className={"bg-primary"}/>
        </>
    );
}