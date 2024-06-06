"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { DataTable } from "@/components/ui/data-table";

import { format } from "date-fns";
import { BookingCol, columns } from "@/app/(bookings)/my-bookings/components/columns";

export default function MyBookingsPage() {
    const [bookings, setBookings] = useState<BookingCol[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getMyBookings = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/my-bookings`,
                    { withCredentials: true }
                );

                const data = response.data.map((booking: any) => ({
                    hotelName: booking.hotelName ?? booking.Hotel?.name ?? "Unknown",
                    dayTheBookingWasDone: format(new Date(booking.createdAt), "MMMM do, yyyy"),
                    totalPrice: booking.totalPrice ?? 0,
                    checkIn: format(new Date(booking.checkIn), "MMMM do, yyyy"),
                    checkOut: format(new Date(booking.checkOut), "MMMM do, yyyy"),
                    numAdults: booking.numAdults ?? 0,
                    numChildren: booking.numChildren ?? 0,
                }));

                setBookings(data);
            } catch (e) {
                setError("Something went wrong");
                toast.error("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        getMyBookings();
    }, []);

    return (
        <div className="flex flex-col m-4 items-center justify-center min-w-full my-10">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <DataTable columns={columns} data={bookings} searchKey={"hotelName"}/>
        </div>
    );
}
