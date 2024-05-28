import { z } from "zod";

export const hotelCreationSchema = z.object({
    name: z.string().min(1, "Name is required").trim(),
    description: z.string().min(3, "Description should be at least 100 characters long ").trim(),
    hotelType: z.string().min(1, "Hotel Type is required").trim(),
    country: z.string().min(1, "Country is required").trim(),
    city: z.string().min(1, "City is required").trim(),
    numOfAdults: z
        .number()
        .int()
        .min(1, "Number of adults must be at least 1"),
    numOfChildren: z
        .number()
        .int()
        .min(0, "Number of children cannot be negative"),
    facilities: z.array(z.string().min(1)).nonempty("Facilities are required"),
    pricePerNight: z
        .number()
        .positive("Price per night must be a positive number"),
    rating: z
        .number(),

    imageURLs: z.array(z.string().url("Each image URL must be a valid URL")).nonempty("Image URLs are required"),
});

export type HotelCreationSchema = z.infer<typeof hotelCreationSchema>;
