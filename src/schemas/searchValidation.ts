import {z} from "zod";

export const SearchSchema = z.object({
    destination: z.string().min(3, "Destination must have at least 3 letters"),
    checkIn: z.date({
        required_error: "A check-in date is required.",
    }),
    checkOut: z.date({
        required_error: "A check-out date is required.",
    }),
    numAdults: z.number({
        required_error: "The number of adults is required.",
    }).min(1, "At least one adult is required."),
    numChildren: z.number({
        required_error: "The number of children is required.",
    }).min(0),
});


export type  SearchSchema = z.infer<typeof SearchSchema>;