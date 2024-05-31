"use client";

import {useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {format} from "date-fns";
import {columns, HotelCol} from "@/app/(my-hotels)/my-hotels/components/columns";
import {DataTable} from "@/components/ui/data-table";

export default function MyHotelsPage() {

    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {


        const getAllMyHotels = async () => {
            console.log("Running")

            try {

                setLoading(true);
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/my-hotels`,
                    {withCredentials: true}
                );

                console.log(response);

                setHotels(response.data);

            } catch (e) {

                // @ts-ignore
                setError(e.message);
                console.log("ERROR - GET HOTELS @GET --> " + e);
                toast.error("Something went wrong");


            } finally {

                setLoading(false);

            }

        };

        getAllMyHotels();


    }, [])


    const formattedHotels: HotelCol[] = hotels.map((hotel: any) => ({
        id: hotel.id,
        name: hotel.name,
        pricePerNight: hotel.pricePerNight,
        starRating: hotel.starRating,
        type: hotel.type,
        createdAt: format(hotel.createdAt, "MMMM do, yyyy"),
    }));

    console.log("Here are my hotels");
    console.log(formattedHotels);

    // ! Account for the case when there is no hotels yet added by the user ->

    return (
        <div className="flex m-4 items-center justify-center min-w-full">
            <div>
                <DataTable columns={columns} data={formattedHotels} searchKey={"name"}/>
            </div>

        </div>
    )
}