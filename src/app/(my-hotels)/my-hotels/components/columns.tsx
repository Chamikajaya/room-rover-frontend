"use client"

import {ColumnDef} from "@tanstack/react-table"
import CellAction from "@/app/(my-hotels)/my-hotels/components/cell-action";
import {Button} from "@/components/ui/button";
import {ArrowUpDown} from "lucide-react";


export type HotelCol = {
    id: string  // for actions
    name: string
    pricePerNight: number
    starRating: number
    type: string
    updatedAt: string
}

export const columns: ColumnDef<HotelCol>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "updatedAt",
        header: "Last Updated",

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
