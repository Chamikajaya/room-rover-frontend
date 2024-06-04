"use client";

import React, {useContext, useEffect, useState} from "react";
import SearchContext from "../../../../../context/search-context";
import toast from "react-hot-toast";
import axios from "axios";
import MyLoader from "@/components/loader";
import BookingForm from "@/components/booking-form-components/booking-form";
import {useParams} from "next/navigation";
import BookingSummary from "@/components/booking-form-components/booking-summary";
import {hotelType} from "@/types/hotelType";
import {userType} from "@/types/userType";
import {paymentIntentResponseFromBackend} from "@/types/paymentIntentResponse";

export default function BookingConfirmation() {


    const search = useContext(SearchContext);

    // extracting the hotelID from the URL since we need it to fetch the hotel details
    const {id} = useParams();

    const [hotel, setHotel] = useState<hotelType | null>(null);
    const [nights, setNights] = useState(0);
    const [currUser, setCurrUser] = useState<userType | null>(null);

    const [paymentIntent, setPaymentIntent] = useState<paymentIntentResponseFromBackend | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    // fetching the hotel details to be displayed in the booking summary section
    useEffect(() => {
        const fetchHotel = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/hotels/${id}`,
                    {withCredentials: true}
                );
                setHotel(response.data);
            } catch (e) {
                console.error(e);
                setError("Something went wrong. Please try again later.");
                toast.error("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchHotel();
    }, [id]);


// fetching the current user details to be displayed in the booking form section
    useEffect(() => {
        const fetchCurrUser = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/me`,
                    {withCredentials: true}
                );
                setCurrUser(response.data);
            } catch (e) {
                console.error(e);
                setError("Something went wrong. Please try again later.");
                toast.error("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchCurrUser();
    }, []);

    // calculating the number of nights based on the check-in and check-out dates selected by the user
    // useEffect is used here is to ensure that the number of nights is recalculated and the state is updated whenever the check-in or check-out date changes. Without useEffect, the number of nights would only be calculated once when the component is first rendered, and would not update if the dates change.
    useEffect(() => {

        // checking if both check-in and check-out dates are defined
        if (search?.checkIn && search?.checkOut) {
            const diffTime = Math.abs(search.checkOut.getTime() - search.checkIn.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setNights(diffDays);
        }
    }, [search?.checkIn, search?.checkOut]);


    // ! ISSUE THIS RUNS INDEFINITELY
    const createStripePaymentIntent = async (nights: number) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/hotels/${id}/bookings/payment-intent`,
                {nights: nights},
                {withCredentials: true}
            );

            if (response.status === 200) {
                setPaymentIntent(response.data);
            }

            console.log(response.data);
        } catch (e) {
            console.error(e);
            toast.error("Something went wrong");
        }
    };

    // We want the effect to run only if the nights and hotel values are set, so we include them in the dependency array. This ensures that the effect runs only when the nights and hotel values are updated.
    useEffect(() => {
        if (nights > 0 && hotel) {
            createStripePaymentIntent(nights);
        }
    }, [createStripePaymentIntent, hotel, nights]);


    if (loading) return <MyLoader/>;
    if (error) return <h1>{error}</h1>;

    return (
        <div className="grid md:grid-cols-[2fr_5fr] gap-8 p-6">
            <div className="p-4 bg-gray-800 rounded-lg shadow-md">
                {hotel && (
                    <BookingSummary
                        hotel={hotel}
                        checkIn={search?.checkIn as Date}
                        checkOut={search?.checkOut as Date}
                        numAdults={search?.numAdults as number}
                        numChildren={search?.numChildren as number}
                        nights={nights}
                    />
                )}
            </div>
            <div className="p-4 bg-gray-800 rounded-lg shadow-md flex items-center justify-center">
                {currUser && <BookingForm currUser={currUser}/>}
            </div>
        </div>
    );
}
