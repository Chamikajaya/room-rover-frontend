"use client";

import React, {useContext, useEffect, useState} from "react";
import SearchContext from "../../../../../context/search-context";
import {userType} from "@/types/userType";
import toast from "react-hot-toast";
import axios from "axios";
import MyLoader from "@/components/loader";

export default function BookingConfirmation() {

    const searchContext = useContext(SearchContext);

    const [currUser, setCurrUser] = useState<userType | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const {checkIn, checkOut, numAdults, numChildren, destination, hotelId} = searchContext;


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


    console.log("The curr user is: ", currUser);  // TODO: remove this line later


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
                SUMMARY
            </div>
            <div>
                FORM
            </div>
        </div>

    );
}