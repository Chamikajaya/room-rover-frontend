"use client";

import SearchContext from "../../../context/search-context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

// Assuming you have defined this type
import { SearchParams } from "@/types/searchParamsTypes";
import toast from "react-hot-toast";

export default function SearchPage() {

    const search = useContext(SearchContext);

    const [page, setPage] = useState(1);


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState([]);

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
                    destination: searchParams.destination ,
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


    // ! ACCount for loading and error states later

    return (
        <div>
            <h1>Search Page</h1>
            {/*{loading && <p>Loading...</p>}*/}
            {/*{error && <p>{error}</p>}*/}
            {/*{!loading && !error && results.length === 0 && <p>No results found</p>}*/}
            {/*<ul>*/}
            {/*    {results.map((result, index) => (*/}
            {/*        <li key={index}>{result.name}</li> // Adjust according to the actual structure of your results*/}
            {/*    ))}*/}
            {/*</ul>*/}
            {/*/!* Pagination controls *!/*/}
            {/*<div>*/}
            {/*    <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>*/}
            {/*    <button onClick={() => setPage(page + 1)}>Next</button>*/}
            {/*</div>*/}
        </div>
    );
}
