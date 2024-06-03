"use client";

import React, {useContext, useEffect, useState} from "react";
import SearchContext from "../../../../../context/search-context";
import {userType} from "@/types/userType";
import toast from "react-hot-toast";
import axios from "axios";
import MyLoader from "@/components/loader";
import BookingForm from "@/components/booking-form-components/booking-form";
import {useParams} from "next/navigation";
import {hotelType} from "@/types/hotelType";
import BookingSummary from "@/components/booking-form-components/booking-summary";

export default function BookingConfirmation() {

    // TODO: ORGANIZE BETTER STRUCTURE HERE
    // TODO: HOW TO OPTIMIZIE THIS CODE
    // TODO: FIX USE EFFECT RUNS INFINITELY BUG

    const search = useContext(SearchContext);


    const {id} = useParams();

    const [hotel, setHotel] = useState<hotelType| undefined>(undefined);

    const [nights, setNights] = useState<number>(0);
    const getHotel = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/hotels/${id}`,
                {withCredentials: true}
            );

            setHotel(response.data);

        } catch (e) {
            // @ts-ignore
            const errorMessage =
                e.response?.data?.errorMessage || e.message || "Something went wrong";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getHotel();
    }, [getHotel]);

    useEffect(() => {
         if (search.checkIn && search.checkOut) {
             const diffTime = Math.abs(search.checkOut.getTime() - search.checkIn.getTime());
             const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
             setNights(diffDays);
         }
    }, [search.checkIn, search.checkOut]);

    






    const [currUser, setCurrUser] = useState<userType | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);



    const getCurrUser = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/me`,
                {withCredentials: true}
            );

            setCurrUser(response.data);

        } catch (e) {
            // @ts-ignore
            const errorMessage =
                e.response?.data?.errorMessage || e.message || "Something went wrong";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCurrUser();
    }, []);


    if (loading) return <MyLoader/>;

    if (error) return <h1>{error}</h1>;


    return (
        // <div className="p-4">
        //     <h1 className="text-2xl mb-4">Booking Confirmation</h1>
        //     <p><strong>Destination:</strong> {destination}</p>
        //     <p><strong>Hotel ID:</strong> {hotelId}</p>
        //     <p><strong>Check-in Date:</strong> {checkIn.toDateString()}</p>
        //     <p><strong>Check-out Date:</strong> {checkOut.toDateString()}</p>
        //     <p><strong>Number of Adults:</strong> {numAdults}</p>
        //     <p><strong>Number of Children:</strong> {numChildren}</p>
        // </div>
        <div className="grid md:grid-cols-[1fr_2fr]">
            <div>
                <BookingSummary hotel={hotel} nights={nights}/>
            </div>
            <div>
                {currUser && <BookingForm currUser={currUser}/>}
            </div>
        </div>

    );
}