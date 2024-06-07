"use client";

import React, { createContext, useEffect, useState } from "react";

interface SearchProviderProps {
    children: React.ReactNode;
}

type SearchContext = {
    checkIn: Date;
    checkOut: Date;
    numAdults: number;
    numChildren: number;
    destination: string;
    hotelId: string;
    saveSearch: (checkIn: Date, checkOut: Date, numAdults: number, numChildren: number, destination: string, hotelId?: string) => void;
};

const SearchContext = createContext<SearchContext | undefined>(undefined);

export function SearchProvider({ children }: SearchProviderProps) {
    const [checkIn, setCheckIn] = useState<Date>(new Date());
    const [checkOut, setCheckOut] = useState<Date>(new Date());
    const [numAdults, setNumAdults] = useState<number>(1);
    const [numChildren, setNumChildren] = useState<number>(0);
    const [destination, setDestination] = useState<string>("");
    const [hotelId, setHotelId] = useState<string>("");

    useEffect(() => {
        const savedCheckIn = sessionStorage.getItem("checkIn");
        const savedCheckOut = sessionStorage.getItem("checkOut");
        const savedNumAdults = sessionStorage.getItem("numAdults");
        const savedNumChildren = sessionStorage.getItem("numChildren");
        const savedDestination = sessionStorage.getItem("destination");
        const savedHotelId = sessionStorage.getItem("hotelId");

        if (savedCheckIn) setCheckIn(new Date(savedCheckIn));
        if (savedCheckOut) setCheckOut(new Date(savedCheckOut));
        if (savedNumAdults) setNumAdults(parseInt(savedNumAdults));
        if (savedNumChildren) setNumChildren(parseInt(savedNumChildren));
        if (savedDestination) setDestination(savedDestination);
        if (savedHotelId) setHotelId(savedHotelId);
    }, []);

    const saveSearch = (
        checkIn: Date,
        checkOut: Date,
        numAdults: number,
        numChildren: number,
        destination: string,
        hotelId: string = ""
    ) => {
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setNumAdults(numAdults);
        setNumChildren(numChildren);
        setDestination(destination);
        if (hotelId) setHotelId(hotelId);

        // Save search to session storage
        sessionStorage.setItem("checkIn", checkIn.toISOString());
        sessionStorage.setItem("checkOut", checkOut.toISOString());
        sessionStorage.setItem("numAdults", numAdults.toString());
        sessionStorage.setItem("numChildren", numChildren.toString());
        sessionStorage.setItem("destination", destination);

        if (hotelId) sessionStorage.setItem("hotelId", hotelId);
    };

    return (
        <SearchContext.Provider
            value={{
                checkIn,
                checkOut,
                numAdults,
                numChildren,
                destination,
                hotelId,
                saveSearch,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}

export default SearchContext;
