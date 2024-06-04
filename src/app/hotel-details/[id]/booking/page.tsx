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
    const {id} = useParams();

    const [hotel, setHotel] = useState<hotelType | null>(null);  // need to store hotel in a state because we need to pass the hotel to BookingSummary component

    const [nights, setNights] = useState(0);

    // need to store currUser in a state because we need to pass the hotel to BookingForm component
    const [currUser, setCurrUser] = useState<userType | null>(null);

    const [paymentIntent, setPaymentIntent] = useState<paymentIntentResponseFromBackend | undefined>(undefined);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch hotel and user details, and calculate nights
    useEffect(() => {
        const fetchDetails = async () => {

            console.log("UseEffect - FetchDetails is running")
            try {
                setLoading(true);

                // Using Promise.all to fetch hotel details and user details simultaneously.
                // *  Promise.all takes an array of promises and returns a single promise that resolves when ALL the input promises have resolved.
                // * PARALLEL FETCHING - The two requests are made in parallel, which can be more efficient than making them sequentially.

                const [hotelResponse, userResponse] = await Promise.all([
                    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/hotels/${id}`, {withCredentials: true}),
                    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/me`, {withCredentials: true}),
                ]);

                // setting the state once both promises have resolved
                setHotel(hotelResponse.data);
                setCurrUser(userResponse.data);

                if (search?.checkIn && search?.checkOut) {
                    const diffTime = Math.abs(search.checkOut.getTime() - search.checkIn.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    setNights(diffDays);
                }
            } catch (e) {
                console.error(e);
                setError("Something went wrong. Please try again later.");
                toast.error("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id, search?.checkIn, search?.checkOut]);

    // Create Stripe payment intent
    useEffect(() => {

        console.log("UseEffect - CreateStripePaymentIntent is running")
        const createStripePaymentIntent = async () => {
            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/hotels/${id}/bookings/payment-intent`,
                    {nights},
                    {withCredentials: true}
                );

                if (response.status === 200) {
                    setPaymentIntent(response.data);
                }
            } catch (e) {
                console.error(e);
                toast.error("Something went wrong");
            }
        };

        // Only create the payment intent if the number of nights is greater than 0 and the hotel details are available.
        if (nights > 0 && hotel) {
            createStripePaymentIntent();
        }
    }, [hotel, nights, id]);

    console.log("paymentIntent", paymentIntent)

    if (loading) return <MyLoader />;
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
                {currUser && <BookingForm currUser={currUser} />}
            </div>
        </div>
    );
}
