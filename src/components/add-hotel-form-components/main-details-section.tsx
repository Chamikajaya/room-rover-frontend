import {useFormContext} from "react-hook-form";
import {FormControl, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Home, MapPin, Map, NotepadText, DollarSign, Star} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Separator} from "@/components/ui/separator";
import {HotelFormData} from "@/components/add-hotel-form-components/add-hotel-form";


export default function MainDetailsSection() {


    const {
        register,
        formState: {errors},
        setValue
    } = useFormContext<HotelFormData>();


    return (
        <div className="flex flex-col gap-3">

            {/* NAME */}
            <FormItem>
                <FormLabel className={"font-normal flex gap-2 items-center"}>
                    Name
                    <Home/>
                </FormLabel>

                <Input
                    type="text"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("name", {required: "This field is required"})}
                />

                {errors.name && (<FormMessage className="text-red-400 font-normal">{errors.name.message}</FormMessage>)}
            </FormItem>


            <div className="flex flex-col gap-3 md:flex-row md:gap-x-6">

                {/* CITY */}

                <FormItem>
                    <FormLabel className={"font-normal flex gap-2 items-center"}>
                        City
                        <Map/>
                    </FormLabel>
                    <FormControl>
                        <Input

                            {...register("city", {required: "This field is required"})}
                            type="text"
                            placeholder="city name here"
                        />
                    </FormControl>
                    {errors.city &&
                        <FormMessage className="text-red-400 font-normal">{errors.city.message}</FormMessage>}
                </FormItem>

                {/* COUNTRY */}


                <FormItem>
                    <FormLabel className={"font-normal flex gap-2 items-center"}>
                        Country
                        <MapPin/>
                    </FormLabel>
                    <FormControl>
                        <Input

                            {...register("country", {required: "This field is required"})}
                            type="text"
                            placeholder="country name here"
                        />
                    </FormControl>
                    {errors.country && <FormMessage
                        className="text-red-400 font-normal">{errors.country.message}</FormMessage>}
                </FormItem>

            </div>


            {/* DESCRIPTION */}
            <FormItem>
                <FormLabel className={"font-normal flex gap-2 items-center"}>
                    Description
                    <NotepadText/>
                </FormLabel>
                <FormControl>
                    <Textarea
                        rows={8}
                        {...register("description", {
                            required: "This field is required",
                            minLength: { value: 10, message: "Description should be at least 100 characters" },
                            maxLength: { value: 500, message: "Description should not exceed 500 characters" }
                        })}
                        placeholder="describe about your hotel here"
                    />
                </FormControl>
                {errors.description && <FormMessage
                    className="text-red-400 font-normal">{errors.description.message}</FormMessage>}
            </FormItem>

            {/* PRICE PER NIGHT*/}
            <FormItem>
                <FormLabel className={"font-normal flex gap-2 items-center"}>
                    Price Per Night
                    <DollarSign/>
                </FormLabel>
                <FormControl>
                    <Input
                        {...register("pricePerNight", {
                            required: "This field is required",
                            min: { value: 1, message: "Price must be a positive number" },
                        })}
                        type="number"
                        placeholder="price per night"
                        className="max-w-[50%]"
                    />
                </FormControl>
                {errors.pricePerNight && <FormMessage
                    className="text-red-400 font-normal">{errors.pricePerNight.message}</FormMessage>}
            </FormItem>

            {/* RATING */}
            <FormItem>
                <FormLabel className={"font-normal flex gap-2 items-center"}>
                    Rating
                    <Star/>
                </FormLabel>
                <FormControl>
                    <Select
                        onValueChange={(value) => setValue("starRating", parseInt(value))} defaultValue=""
                        {...register("starRating", {
                            required: "This field is required",
                        })}
                    >
                        <SelectTrigger className="max-w-[50%]">
                            <SelectValue placeholder="Select the rating"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Ratings</SelectLabel>
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <SelectItem key={rating} value={rating.toString()}>{rating}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </FormControl>
                {errors.starRating &&
                    <FormMessage className="text-red-400 font-normal">{errors.starRating.message}</FormMessage>}
            </FormItem>


            <Separator className="bg-primary my-4"/>
        </div>
    )
}
