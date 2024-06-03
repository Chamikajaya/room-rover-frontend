"use client";

import React, {createContext} from "react";

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

export function SearchProvider({children}: SearchProviderProps) {

    const [checkIn, setCheckIn] = React.useState<Date>(() => new Date(sessionStorage.getItem("checkIn") || new Date().toISOString()));

    const [checkOut, setCheckOut] = React.useState<Date>(() => new Date(sessionStorage.getItem("checkOut") || new Date().toISOString()));

    const [numAdults, setNumAdults] = React.useState<number>(() => parseInt(sessionStorage.getItem("numAdults") || "1"));
    const [numChildren, setNumChildren] = React.useState<number>(() => parseInt(sessionStorage.getItem("numChildren") || "0"));

    const [destination, setDestination] = React.useState<string>(() => sessionStorage.getItem("destination") || "");

    const [hotelId, setHotelId] = React.useState<string>(() => sessionStorage.getItem("hotelId") || "");

    const saveSearch = (checkIn: Date, checkOut: Date, numAdults: number, numChildren: number, destination: string, hotelId: string = "") => {
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
        <SearchContext.Provider value={{checkIn, checkOut, numAdults, numChildren, destination, hotelId, saveSearch}}>
            {children}
        </SearchContext.Provider>
    );
}

export default SearchContext;
