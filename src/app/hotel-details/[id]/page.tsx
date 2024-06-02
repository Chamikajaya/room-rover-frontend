"use client";

import { useEffect, useState } from "react";
import { hotelType } from "@/types/hotelType";
import MyLoader from "@/components/loader";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams } from "next/navigation";
import ImageCarousel from "@/components/hotel-details-page-components/image-carousel";
import DetailsPageHeader from "@/components/hotel-details-page-components/details-page-header";
import Description from "@/components/hotel-details-page-components/description";

export default function HotelDetailsPage() {
    const { id } = useParams();
    const [hotel, setHotel] = useState<hotelType | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getHotelById = async (hotelId: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/hotels/${hotelId}`);
            setHotel(response.data);
        } catch (e) {
            const errorMessage = e.response?.data?.errorMessage || e.message || "Something went wrong";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            getHotelById(id as string);
        } else {
            setLoading(false);
            setError("No hotel ID provided");
        }
    }, [id]);

    if (loading) return <MyLoader />;

    if (error) return <h1>{error}</h1>;



    return (
        <div className="flex m-4 items-center justify-center flex-col mt-8">
            <DetailsPageHeader name={hotel?.name as string} city={hotel?.city as string} country={hotel?.country as string} />
            <ImageCarousel images={hotel?.imageURLs as string[] || []} />
            <Description description={hotel?.description as string} starRating={hotel?.starRating as number} hotelType={hotel?.type as string} />
        </div>
    );
}
