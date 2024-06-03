import {z} from "zod";

export const GuestInfoValidation = z.object({
    checkIn: z.date(),

    checkOut: z.date().refine(date => date > new Date(), {
        message: "Check-out date must be in the future",
    }),

    numAdults: z.number().min(1, "There must be at least one adult").max(100, "Currently Room Rover supports bookings  up to 100 adults"),

    numChildren: z.number().nonnegative("Number of children cannot be negative").max(100, "Currently Room Rover supports bookings up to 100 children"),

}).refine(data => data.checkIn < data.checkOut, {
    message: "Check-in date must be before check-out date",
});

export type GuestInfoValidation = z.infer<typeof GuestInfoValidation>;