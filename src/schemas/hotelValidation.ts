import {z} from "zod";

export const hotelCreationSchema = z.object({
    name: z.string().min(1, "Name is required").trim(),

    // ! Modify the description validation to require at least 100 characters later
    description: z.string().min(3, "Description should be at least 100 characters long ").trim(),

    hotelType: z.string().min(1, "Hotel Type is required").trim(),
    country: z.string().min(1, "Country is required").trim(),
    city: z.string().min(1, "City is required").trim(),
    facilities: z.array(z.string().min(1)).nonempty("Facilities are required"),
    pricePerNight: z
        .number()
        .positive("Price per night must be a positive number"),
    rating: z
        .number(),

    // ! Check if the imageFiles validation is working
    imageFiles: z.array(z.instanceof(File)).nonempty("Image files are required"),


});

export type HotelCreationSchema = z.infer<typeof hotelCreationSchema>;
