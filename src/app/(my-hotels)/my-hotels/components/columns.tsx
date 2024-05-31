"use client"

import {ColumnDef} from "@tanstack/react-table"


export type HotelCol = {
    id: string  // for actions
    name: string
    pricePerNight: number
    starRating: number
    type: string
    createdAt: string
}

export const columns: ColumnDef<HotelCol>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
    },
    {
        accessorKey: "pricePerNight",
        header: "Price per Night",
    },
    {
        accessorKey: "starRating",
        header: "Rating",
    },

    {
        accessorKey: "type",
        header: "Hotel Type",
    },
]
