"use client";

import {useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {format} from "date-fns";
import {columns, HotelCol} from "@/app/(my-hotels)/my-hotels/components/columns";
import {DataTable} from "@/components/ui/data-table";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Plus} from "lucide-react";

export default function MyHotelsPage() {

    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {


        const getAllMyHotels = async () => {

            try {

                setLoading(true);
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/my-hotels`,
                    {withCredentials: true}
                );

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
        updatedAt: format(hotel.updatedAt, "MMMM do, yyyy"),
    }));


    return (
        <div className="flex flex-col m-4 items-center justify-center min-w-full my-10">

            <Link href={"/add-hotel"}>
                <Button
                    className={"font-semibold hover:text-primary hover:bg-secondary"}
                    variant={"default"}
                >
                    <Plus size={20} className={"mr-2"}/>
                    Add Hotel
                </Button>
            </Link>

            <div>
                <DataTable columns={columns} data={formattedHotels} searchKey={"name"}/>
            </div>

        </div>
    )
}