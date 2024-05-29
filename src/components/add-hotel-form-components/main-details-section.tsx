import {useFormContext} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
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
import {HotelCreationSchema} from "@/schemas/hotelValidation";

export default function MainDetailsSection() {

    const {register, control, setValue, formState: {errors}} = useFormContext<HotelCreationSchema>();

    return (
        <div className="flex flex-col gap-3">
            {/* NAME */}
            <FormField
                control={control}
                name="name"
                render={({field}) => (
                    <FormItem>
                        <FormLabel className={"font-normal flex gap-2 items-center"}>
                            Name
                            <Home/>
                        </FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                {...register("name")}
                                type="text"
                                placeholder="hotel name here"
                            />
                        </FormControl>
                        {errors.name &&
                            <FormMessage className="text-red-400 font-normal">{errors.name.message}</FormMessage>}
                    </FormItem>
                )}
            />

            <div className="flex flex-col gap-3 md:flex-row md:gap-x-6">
                {/* CITY */}
                <FormField
                    control={control}
                    name="city"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className={"font-normal flex gap-2 items-center"}>
                                City
                                <Map/>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    {...register("city")}
                                    type="text"
                                    placeholder="city name here"
                                />
                            </FormControl>
                            {errors.city &&
                                <FormMessage className="text-red-400 font-normal">{errors.city.message}</FormMessage>}
                        </FormItem>
                    )}
                />

                {/*COUNTRY*/}
                <FormField
                    control={control}
                    name="country"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className={"font-normal flex gap-2 items-center"}>
                                Country
                                <MapPin/>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    {...register("country")}
                                    type="text"
                                    placeholder="country name here"
                                />
                            </FormControl>
                            {errors.country && <FormMessage
                                className="text-red-400 font-normal">{errors.country.message}</FormMessage>}
                        </FormItem>
                    )}
                />
            </div>

            {/* DESCRIPTION */}
            <FormField
                control={control}
                name="description"
                render={({field}) => (
                    <FormItem>
                        <FormLabel className={"font-normal flex gap-2 items-center"}>
                            Description
                            <NotepadText/>
                        </FormLabel>
                        <FormControl>
                            <Textarea
                                rows={8}
                                {...field}
                                {...register("description")}
                                placeholder="describe about your hotel here"
                            />
                        </FormControl>
                        {errors.description && <FormMessage
                            className="text-red-400 font-normal">{errors.description.message}</FormMessage>}
                    </FormItem>
                )}
            />

            {/* PRICE PER NIGHT */}
            <FormField
                control={control}
                name="pricePerNight"
                render={({field}) => (
                    <FormItem>
                        <FormLabel className={"font-normal flex gap-2 items-center"}>
                            Price Per Night
                            <DollarSign/>
                        </FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                {...register("pricePerNight", {valueAsNumber: true})}
                                type="number"
                                placeholder="price per night"
                                className="max-w-[50%]"
                            />
                        </FormControl>
                        {errors.pricePerNight && <FormMessage
                            className="text-red-400 font-normal">{errors.pricePerNight.message}</FormMessage>}
                    </FormItem>
                )}
            />

            {/* RATING */}
            <FormField
                control={control}
                name="rating"
                render={() => (
                    <FormItem>
                        <FormLabel className={"font-normal flex gap-2 items-center"}>
                            Rating
                            <Star/>
                        </FormLabel>
                        <FormControl>
                            <Select
                                onValueChange={(value) => setValue("rating", parseInt(value))}
                                defaultValue=""

                            >
                                <SelectTrigger className="max-w-[50%]">
                                    <SelectValue placeholder="Select the rating"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Ratings</SelectLabel>
                                        {[0, 1, 2, 3, 4, 5].map((rating) => (
                                            <SelectItem key={rating} value={rating.toString()}>{rating}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        {errors.rating &&
                            <FormMessage className="text-red-400 font-normal">{errors.rating.message}</FormMessage>}
                    </FormItem>
                )}
            />

            <Separator className="bg-primary"/>
        </div>
    );
}
