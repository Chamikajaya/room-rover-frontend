"use client";

import SearchContext from "../../../context/search-context";
import {useContext, useState, useEffect} from "react";
import axios from "axios";

import {SearchParams} from "@/types/searchParamsTypes";
import toast from "react-hot-toast";
import SearchBar from "@/components/search-bar";
import {hotelSearchResponseFromBackend} from "@/types/hotelType";
import HotelCard from "@/components/HotelCard";
import PaginationForSearch from "@/components/pagination-for-search";
import MyLoader from "@/components/loader";

export default function SearchPage() {

    const search = useContext(SearchContext);

    const [page, setPage] = useState(1);  // for pagination purposes (tracking the current page number)

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<hotelSearchResponseFromBackend | undefined>(undefined);

    //  ! INSTEAD OF LONG LIST OF FILTERS ADD AIRBNB STYLE ICONS - HOTEL TYPES


    useEffect(() => {
        if (!search) return;

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

                const queryParams = new URLSearchParams({
                    destination: searchParams.destination,
                    numAdults: searchParams.numAdults.toString(),
                    numChildren: searchParams.numChildren.toString(),
                    checkIn: searchParams.checkIn,
                    checkOut: searchParams.checkOut,
                    page: searchParams.page
                });

                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/hotels/search?${queryParams}`);

                setResults(response.data);
            } catch (err) {
                console.log("ERROR - HOTELS SEARCH @GET --> " + err);
                toast.error("Something went wrong");
                setError("Something went wrong")
            } finally {
                setLoading(false);
            }
        };

        searchHotels(searchParams);
    }, [search, page]);  // Re-run effect if search or page changes :)

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    if (loading) {
        return (
            <MyLoader/>
        )

    }

    if (error) {
        return (
            <div>
                <h1>Something went wrong</h1>
            </div>
        )
    }

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

            {/* PAGINATION */}
            <PaginationForSearch
                totalPages={results?.paginationInfo.totalPages}
                currentPage={page}
                onPageChange={handlePageChange}
            />
        </>
    );
}
