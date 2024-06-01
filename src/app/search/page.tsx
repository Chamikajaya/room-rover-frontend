"use client";

import SearchContext from "../../../context/search-context";
import {useContext, useState, useEffect} from "react";
import axios from "axios";

import {SearchParams} from "@/types/searchParamsTypes";
import toast from "react-hot-toast";
import SearchBar from "@/components/search-bar";
import {hotelSearchResponseFromBackend} from "@/types/hotelType";
import HotelCard from "@/components/HotelCard";

export default function SearchPage() {

    const search = useContext(SearchContext);

    const [page, setPage] = useState(1);


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<hotelSearchResponseFromBackend | undefined>(undefined);

    useEffect(() => {

        // If search context is undefined, do nothing
        if (!search) return;


        // Define the search parameters
        const searchParams: SearchParams = {
            destination: search.destination,
            checkIn: search.checkIn.toISOString(),
            checkOut: search.checkOut.toISOString(),
            numAdults: search.numAdults,
            numChildren: search.numChildren,
            page: page.toString()
        };

        const searchHotels = async (searchParams: SearchParams) => {
            try {
                setLoading(true);
                setError(null);

                // Create query parameters string
                const queryParams = new URLSearchParams({
                    destination: searchParams.destination,
                    numAdults: searchParams.numAdults.toString(),
                    numChildren: searchParams.numChildren.toString(),
                    checkIn: searchParams.checkIn,
                    checkOut: searchParams.checkOut,
                    page: searchParams.page
                });

                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/hotels/search?${queryParams}`);

                setResults(response.data); // * Assuming response.data is the search results
            } catch (err) {
                console.log("ERROR - HOTELS SEARCH @GET --> " + err);
                toast.error("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        searchHotels(searchParams);

    }, [search, page]); // Re-run effect if search or page changes

    // TODO: NEED TO ADD FILTERS AND SORT BY DROPDOWN MENU 😈😈😈
    //  ? INSTEAD OF LONG LIST OF FILTERS ADD AIRBNB STYLE ICONS - HOTEL TYPES


    // TODO: Add num adults and children to prisma schema
    // ! ACCount for loading and error states  + WHenn no matches found later
    // ! Implement pagination with shadCN

    return (

        <>
            <SearchBar/>

            {/* RESULTS CARD SECTION */}
            <div className="flex flex-col gap-5 w-5/6 mx-auto mt-10">
                <div className="flex justify-between items-center">
                <span className="text-xl font-bold">
                    {`${results?.paginationInfo.totalHotels} Matches found`}
                </span>
                </div>
                {results?.hotelsFound.map((hotel, idx) => (
                    <HotelCard hotel={hotel} key={idx}/>
                ))}
            </div>


        </>
    );
}
