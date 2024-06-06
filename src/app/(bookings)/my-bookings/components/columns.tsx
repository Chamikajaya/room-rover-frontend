"use client";

import { ColumnDef } from "@tanstack/react-table";

export type BookingCol = {
    hotelName: string,
    dayTheBookingWasDone: string,
    totalPrice: number,
    checkIn: string,
    checkOut: string,
    numAdults: number,
    numChildren: number,
};

export const columns: ColumnDef<BookingCol>[] = [
    {
        accessorKey: "hotelName",
        header: "Hotel Name",
    },
    {
        accessorKey: "dayTheBookingWasDone",
        header: "Booking Date",
    },
    {
        accessorKey: "totalPrice",
        header: "Total Price ($)",

    },
    {
        accessorKey: "checkIn",
        header: "Check-In Date",
    },
    {
        accessorKey: "checkOut",
        header: "Check-Out Date",
    },
    {
        accessorKey: "numAdults",
        header: "Adults",
    },
    {
        accessorKey: "numChildren",
        header: "Children",
    },
];
