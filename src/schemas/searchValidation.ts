import {z} from "zod";

export const SearchSchema = z.object({
    destination: z.string().optional(),
    checkIn: z.date().optional(),
    checkOut: z.date().optional(),
    numAdults: z.number().optional(),
    numChildren: z.number().optional(),
});


export type  SearchSchema = z.infer<typeof SearchSchema>;