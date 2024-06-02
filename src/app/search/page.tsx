"use client";

import {useContext, useState, useEffect} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import SearchContext from "../../../context/search-context";
import {SearchParams} from "@/types/searchParamsTypes";
import {hotelSearchResponseFromBackend} from "@/types/hotelType";
import SearchBar from "@/components/search-bar";
import HotelCard from "@/components/HotelCard";
import PaginationForSearch from "@/components/pagination-for-search";
import MyLoader from "@/components/loader";
import ResultsSortDropdown from "@/components/results-sort-dropdown";

export default function SearchPage() {
    const search = useContext(SearchContext);

    const [page, setPage] = useState(1);  // for pagination purposes (tracking the current page number)
    const [sortBy, setSortBy] = useState<string | undefined>(undefined);  // for sorting purposes
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<hotelSearchResponseFromBackend | undefined>(undefined);


    useEffect(() => {
        if (!search) return;

        const searchParams: SearchParams = {
            destination: search.destination,
            checkIn: search.checkIn.toISOString(),
            checkOut: search.checkOut.toISOString(),
            numAdults: search.numAdults,
            numChildren: search.numChildren,
            page: page.toString(),
            sortBy: sortBy,  // Sorting parameter (starRatingDesc, pricePerNightAsc, pricePerNightDesc)
        };

        const searchHotels = async (searchParams: SearchParams) => {
            try {
                setLoading(true);
                setError(null);

                const queryParams = new URLSearchParams({
                    destination: searchParams.destination || "",
                    numAdults: (searchParams.numAdults || 0).toString(),
                    numChildren: (searchParams.numChildren || 0).toString(),
                    checkIn: searchParams.checkIn || "",
                    checkOut: searchParams.checkOut || "",
                    sortBy: searchParams.sortBy || "",
                    page: searchParams.page || "1",
                });

                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/hotels/search?${queryParams}`);

                setResults(response.data);
            } catch (err) {
                console.log("ERROR - HOTELS SEARCH @GET --> " + err);
                toast.error("Something went wrong");
                setError("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        searchHotels(searchParams);
    }, [search, page, sortBy]);  // Re-run effect if search, page, or sortBy changes :)

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleSortChange = (newSortBy: string) => {  // Callback function to handle sort change (refer to results-sort-dropdown.tsx 👈)
        setSortBy(newSortBy);
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
                    <ResultsSortDropdown onSortChange={handleSortChange}/>
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
