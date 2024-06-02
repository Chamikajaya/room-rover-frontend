import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface ResultsSortDropdownProps {
    onSortChange: (sortBy: string) => void;
}

export default function ResultsSortDropdown({onSortChange}: ResultsSortDropdownProps) {
    return (
        // Calling the onSortChange function whenever the user selects a new option
        <Select onValueChange={onSortChange}>
            <SelectTrigger className="w-[300px] ">
                <SelectValue placeholder="Sort By"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>

                    <SelectItem value="starRatingDesc" className={"text-xs"}>Sort by star rating (highest
                        first)</SelectItem>
                    <SelectItem value="pricePerNightDesc" className={"text-xs"}>Sort by price (highest
                        first)</SelectItem>
                    <SelectItem value="pricePerNightAsc" className={"text-xs"}>Sort by price (lowest first)</SelectItem>

                </SelectGroup>
            </SelectContent>
        </Select>
    )
}