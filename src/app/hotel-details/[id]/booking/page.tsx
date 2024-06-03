"use client";

import React, { useContext } from "react";
import SearchContext from "../../../../../context/search-context";

export default function BookingConfirmation() {
    const searchContext = useContext(SearchContext);

    if (!searchContext) {
        return <div>Loading...</div>;
    }

    const { checkIn, checkOut, numAdults, numChildren, destination, hotelId } = searchContext;

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Booking Confirmation</h1>
            <p><strong>Destination:</strong> {destination}</p>
            <p><strong>Hotel ID:</strong> {hotelId}</p>
            <p><strong>Check-in Date:</strong> {checkIn.toDateString()}</p>
            <p><strong>Check-out Date:</strong> {checkOut.toDateString()}</p>
            <p><strong>Number of Adults:</strong> {numAdults}</p>
            <p><strong>Number of Children:</strong> {numChildren}</p>
        </div>
    );
}