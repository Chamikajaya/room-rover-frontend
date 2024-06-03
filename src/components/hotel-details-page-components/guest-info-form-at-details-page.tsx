"use client";

import { Button } from "@/components/ui/button";
import React, { useContext } from "react";
import AuthContext from "../../../context/auth-context";
import { useRouter } from "next/navigation";
import SearchContext from "../../../context/search-context";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GuestInfoValidation } from "@/schemas/guestInfoValidation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarCheck } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

interface GuestInfoFormAtDetailsPageProps {
    id: string;
}

// TODO: FIX FOLLOWING ERRORS
// ERROR MESSAGES (VALIDATION) for checkIn, checkOut, are not displayed
// Calender displays dates even before the checkIn date for checkout date pick
// Check-in date must be before check-out date error is not displayed
//
export default function GuestInfoFormAtDetailsPage({ id }: GuestInfoFormAtDetailsPageProps) {

    const router = useRouter();

    const authContext = useContext(AuthContext);
    const isAuthenticated = authContext ? authContext.isAuthenticated : false;

    const searchContext = useContext(SearchContext);

    const form = useForm<z.infer<typeof GuestInfoValidation>>({
        resolver: zodResolver(GuestInfoValidation),
        defaultValues: {
            checkIn: searchContext?.checkIn,
            checkOut: searchContext?.checkOut,
            numAdults: searchContext?.numAdults,
            numChildren: searchContext?.numChildren,
        },
    });

    const minDate = new Date();
    const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)); // 1 year from now

    const handleBookNow = (bookingData: z.infer<typeof GuestInfoValidation>) => {
        // Save search context so that we can retrieve it later
        searchContext?.saveSearch(
            bookingData.checkIn,
            bookingData.checkOut,
            bookingData.numAdults,
            bookingData.numChildren,
            searchContext?.destination,
            id
        );

        if (isAuthenticated) {
            // Redirect to booking page
            router.push(`/hotel-details/${id}/booking`);
        } else {
            // Redirect to log in with returnUrl
            router.push(`/login?returnUrl=${encodeURIComponent(window.location.href)}`);
        }
    };

    return (
        <div className="flex justify-center w-full mt-6">

            {/* FORM */}
            <Form {...form}>

                <form
                    onSubmit={form.handleSubmit(handleBookNow)}
                    className="p-4 bg-gray-900 rounded-2xl shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-5"
                >
                    {/* CHECK IN DATE */}
                    <FormField
                        control={form.control}
                        name="checkIn"
                        render={({field}) => (
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
                                                {field.value
                                                    ? format(field.value, "PPP")
                                                    : "Check-in"}
                                                <CalendarCheck className="ml-auto h-4 w-4 opacity-50"/>
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="end">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={(date) => field.onChange(date)}
                                            disabled={(date) =>
                                                date < minDate || date > maxDate
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* CHECK OUT DATE */}
                    <FormField
                        control={form.control}
                        name="checkOut"
                        render={({field}) => (
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
                                                {field.value
                                                    ? format(field.value, "PPP")
                                                    : "Check-out"}
                                                <CalendarCheck className="ml-auto h-4 w-4 opacity-50"/>
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="end">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={(date) => field.onChange(date)}
                                            disabled={(date) =>
                                                date < minDate || date > maxDate
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* NUMBER OF ADULTS */}
                    <FormField
                        control={form.control}
                        name="numAdults"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adults</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min={1}
                                        max={100}
                                        className="bg-gray-800 text-white border-0 focus:ring-2 focus:ring-purple-500"
                                        value={field.value ? Number(field.value) : ''} // Convert string to number
                                        onChange={(e) => {
                                            field.onChange(e.target.value ? Number(e.target.value) : ''); // Convert string to number
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* NUMBER OF CHILDREN */}

                    <FormField
                        control={form.control}
                        name="numChildren"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Children</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min={0}
                                        max={100}
                                        className="bg-gray-800 text-white border-0 focus:ring-2 focus:ring-purple-500"
                                        value={field.value ? Number(field.value) : ''} // Convert string to number
                                        onChange={(e) => {
                                            field.onChange(e.target.value ? Number(e.target.value) : ''); // Convert string to number
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* SUBMIT BUTTON */}
                    <div className="flex justify-center w-full mt-6">
                        <Button
                            className="w-64 py-3 text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
                            {isAuthenticated ? "Book Now" : "Login to Book"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}