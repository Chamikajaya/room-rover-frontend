import React, { useContext, useEffect } from "react";
import SearchContext from "../../context/search-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarCheck, Eraser, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem, FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { SearchSchema } from "@/schemas/searchValidation";

export default function SearchBar() {

    const search = useContext(SearchContext);

    const form = useForm<z.infer<typeof SearchSchema>>({
        resolver: zodResolver(SearchSchema),
    });

    const router = useRouter();

    const [checkIn, setCheckIn] = React.useState<Date | null>(null);
    const [checkOut, setCheckOut] = React.useState<Date | null>(null);
    const [numAdults, setNumAdults] = React.useState<number>(1);
    const [numChildren, setNumChildren] = React.useState<number>(0);
    const [destination, setDestination] = React.useState<string>("");

    useEffect(() => {
        if (search) {
            setCheckIn(search.checkIn ? new Date(search.checkIn) : null);
            setCheckOut(search.checkOut ? new Date(search.checkOut) : null);
            setNumAdults(search.numAdults);
            setNumChildren(search.numChildren);
            setDestination(search.destination);
        }
    }, [search]);

    const minDate = new Date();
    const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));  // 1 year from now

    const onSubmit = (formData: z.infer<typeof SearchSchema>) => {

        // *  this will save the search data to the context 😊😊😊
        search?.saveSearch(checkIn as Date, checkOut as Date, numAdults, numChildren, destination, search.hotelId);

        router.push("/search");
    };

    return (
        <div className="mt-10 mx-4 md:mx-15 lg:mx-10">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="p-4 bg-gray-900 rounded-2xl shadow-lg grid grid-cols-1 lg:grid-cols-5 gap-5"
                >
                    {/* DESTINATION */}
                    <FormField
                        control={form.control}
                        name="destination"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Destination</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Destination"
                                        className="w-full bg-gray-800 text-white border-0 focus:ring-2 focus:ring-purple-500"
                                        value={destination}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setDestination(e.target.value);
                                        }}
                                    />
                                </FormControl>
                                {form.formState.errors.destination && (
                                    <FormMessage className="text-red-400 font-normal">
                                        {form.formState.errors.destination.message}
                                    </FormMessage>
                                )}
                            </FormItem>
                        )}
                    />

                    {/* CHECK IN DATE */}
                    <FormField
                        control={form.control}
                        name="checkIn"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Check-in</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full text-left font-normal bg-gray-800 text-white border-0 focus:ring-2 focus:ring-purple-500",
                                                    !field.value && "text-gray-500"
                                                )}
                                            >
                                                {checkIn ? format(checkIn, "PPP") : <span>Check-in</span>}
                                                <CalendarCheck className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="end">
                                        <Calendar
                                            mode="single"
                                            selected={checkIn || undefined}
                                            onSelect={(date) => {
                                                field.onChange(date);
                                                setCheckIn(date as Date);
                                            }}
                                            disabled={(date) =>
                                                date < minDate || date > maxDate
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* CHECK OUT DATE */}
                    <FormField
                        control={form.control}
                        name="checkOut"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Check-out</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full text-left font-normal bg-gray-800 text-white border-0 focus:ring-2 focus:ring-purple-500",
                                                    !field.value && "text-gray-500"
                                                )}
                                            >
                                                {checkOut ? format(checkOut, "PPP") : <span>Check-out</span>}
                                                <CalendarCheck className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="end">
                                        <Calendar
                                            mode="single"
                                            selected={checkOut || undefined}
                                            onSelect={(date) => {
                                                field.onChange(date);
                                                setCheckOut(date as Date);
                                            }}
                                            disabled={(date) =>
                                                date < (checkIn || minDate) || date > maxDate
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* ADULTS COUNT */}
                    <FormField
                        control={form.control}
                        name="numAdults"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Adults</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="Adults"
                                        className="w-full bg-gray-800 text-white border-0 focus:ring-2 focus:ring-purple-500"
                                        value={numAdults}
                                        onChange={(e) => {
                                            field.onChange(parseInt(e.target.value));
                                            setNumAdults(parseInt(e.target.value));
                                        }}
                                    />
                                </FormControl>
                                {form.formState.errors.numAdults && (
                                    <FormMessage className="text-red-400 font-normal">
                                        {form.formState.errors.numAdults.message}
                                    </FormMessage>
                                )}
                            </FormItem>
                        )}
                    />

                    {/* CHILDREN COUNT */}
                    <FormField
                        control={form.control}
                        name="numChildren"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Children</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="number"
                                        min={0}
                                        placeholder="Children"
                                        className="w-full bg-gray-800 text-white border-0 focus:ring-2 focus:ring-purple-500"
                                        value={numChildren}
                                        onChange={(e) => {
                                            field.onChange(parseInt(e.target.value));
                                            setNumChildren(parseInt(e.target.value));
                                        }}
                                    />
                                </FormControl>
                                {form.formState.errors.numChildren && (
                                    <FormMessage className="text-red-400 font-normal">
                                        {form.formState.errors.numChildren.message}
                                    </FormMessage>
                                )}
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-center gap-8 mt-6 lg:col-span-5">
                        <Button size="sm" className="flex items-center justify-center" type="submit">
                            <Search className="mr-4" size={20} />
                            Search
                        </Button>

                        <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center justify-center"
                            onClick={() => {
                                form.reset();
                                setCheckIn(null);
                                setCheckOut(null);
                                setNumAdults(1);
                                setNumChildren(0);
                                setDestination("");
                            }}
                        >
                            <Eraser className="mr-4" size={20} />
                            Clear
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
