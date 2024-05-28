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
} from "@/components/ui/select"

export default function MainDetailsSection() {

    const {register, control} = useFormContext();

    return (

        <div className="flex flex-col gap-3">
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
                                type={"text"}
                                placeholder={"hotel name here"}
                            />
                        </FormControl>
                        <FormMessage className={"text-red-400 font-normal"}/>
                    </FormItem>
                )}
            />

            <div className={"flex flex-col gap-3 md:flex-row md:gap-x-6"}>
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
                                    type={"text"}
                                    placeholder={"city name here"}
                                />
                            </FormControl>
                            <FormMessage className={"text-red-400 font-normal"}/>
                        </FormItem>
                    )}
                />

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
                                    type={"text"}
                                    placeholder={"country name here"}
                                />
                            </FormControl>
                            <FormMessage className={"text-red-400 font-normal"}/>
                        </FormItem>
                    )}
                />
            </div>

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
                            <Textarea placeholder={"describe about your hotel here"}/>
                        </FormControl>
                        <FormMessage className={"text-red-400 font-normal"}/>
                    </FormItem>
                )}
            />

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
                                type={"number"}
                                placeholder={"price per night"}
                                className={"max-w-[50%]"}
                            />
                        </FormControl>
                        <FormMessage className={"text-red-400 font-normal"}/>
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="rating"
                render={({field}) => (
                    <FormItem>
                        <FormLabel className={"font-normal flex gap-2 items-center"}>
                            Rating
                            <Star/>
                        </FormLabel>
                        <FormControl>
                            <Select>
                                <SelectTrigger className="max-w-[50%]">
                                    <SelectValue placeholder="Select the rating"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Ratings</SelectLabel>

                                        <SelectItem value="1">1</SelectItem>
                                        <SelectItem value="2">2</SelectItem>
                                        <SelectItem value="3">3</SelectItem>
                                        <SelectItem value="4">4</SelectItem>
                                        <SelectItem value="5">5</SelectItem>

                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage className={"text-red-400 font-normal"}/>
                    </FormItem>
                )}
            />


        </div>
    )
}