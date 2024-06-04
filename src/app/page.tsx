"use client"

import HeroSection from "@/components/hero-section";
import LatestHotels from "@/components/latest-hotels-at-landing-pg";
import {useEffect, useState} from "react";
import {hotelSearchResponseFromBackend, hotelType} from "@/types/hotelType";
import toast from "react-hot-toast";
import axios from "axios";
import MyLoader from "@/components/loader";
import PaginationForSearch from "@/components/pagination-for-search";

export default function RootPage() {

    const [results, setResults] = useState<hotelSearchResponseFromBackend | undefined>(undefined);

    const [page, setPage] = useState(1);


    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getNewestHotels = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/hotels?page=${page}`)
                if (res.status === 200) {
                    setResults(res.data);
                }
            } catch (e) {
                setError("Error fetching latest hotels. Please try again later.");
                toast.error("Error fetching latest hotels. Please try again later.");
                setLoading(false);
            } finally {
                setLoading(false);

            }
        };

        getNewestHotels();
    }, [page]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    if (loading) return <MyLoader/>;

    if (error) return <div className="container mx-auto text-center py-10">{error}</div>;

    return (
        <div className="container mx-auto py-10 ">
            <HeroSection/>
            {results?.hotelsFound && (
                <>
                    <LatestHotels hotels={results.hotelsFound}/>
                    <PaginationForSearch totalPages={results.paginationInfo.totalPages} currentPage={page} onPageChange={handlePageChange}/>


                </>
            )}
        </div>
    )
}
