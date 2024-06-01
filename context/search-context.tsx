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

    // * updates the state with new search parameters
    saveSearch: (checkIn: Date, checkOut: Date, numAdults: number, numChildren: number, destination: string, hotelId: string) => void;
};

// creating the SearchContext with the defined type
const SearchContext = createContext<SearchContext | undefined>(undefined);

export function SearchProvider({children}: SearchProviderProps) {

    const [checkIn, setCheckIn] = React.useState<Date>(new Date());
    const [checkOut, setCheckOut] = React.useState<Date>(new Date());
    const [numAdults, setNumAdults] = React.useState<number>(1);
    const [numChildren, setNumChildren] = React.useState<number>(0);
    const [destination, setDestination] = React.useState<string>("");
    const [hotelId, setHotelId] = React.useState<string>("");

    const saveSearch = (checkIn: Date, checkOut: Date, numAdults: number, numChildren: number, destination: string, hotelId?: string) => {

        if (hotelId) {
            setHotelId(hotelId);
        }

        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setNumAdults(numAdults);
        setNumChildren(numChildren);
        setDestination(destination);

    }

    return (
        <SearchContext.Provider value={{
            checkIn,
            checkOut,
            numAdults,
            numChildren,
            destination,
            hotelId,
            saveSearch
        }}>
            {children}
        </SearchContext.Provider>
    )


}


export default SearchContext;