"use client"

import {ColumnDef} from "@tanstack/react-table"
import CellAction from "@/app/(my-hotels)/my-hotels/components/cell-action";


export type HotelCol = {
    id: string  // for actions
    name: string
    pricePerNight: number
    starRating: number
    type: string
    createdAt: string  // ! Change this to updated at later + in the formattedObj as well
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
    {
        id: "actions",
        header: "Settings",
        cell: ({row}) => <CellAction data={row.original}/>,  // row.original is the HotelCol object for the row
    }

]
