"use client";

import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AddHotelForm, {HotelFormData} from "@/components/add-hotel-form-components/add-hotel-form";

export default function UpdateHotelPage() {
    const {hotelId} = useParams();

    const [hotel, setHotel] = useState<HotelFormData | undefined>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getHotel = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/my-hotels/${hotelId}`,
                    {withCredentials: true}
                );

                setHotel(response.data);
            } catch (e) {
                setError("Failed to fetch hotel data.");
                console.error("ERROR - GET HOTEL @GET -->", e);
                toast.error("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        if (hotelId) {
            getHotel();
        }
    }, [hotelId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="flex m-4 items-center justify-center">
            <AddHotelForm hotel={hotel} />
        </div>
    );
}
