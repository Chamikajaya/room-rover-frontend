"use client";

import {HotelCol} from "@/app/(my-hotels)/my-hotels/components/columns";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Pencil, Settings, Trash} from "lucide-react";
import {useRouter} from "next/navigation";


interface CellActionProps {
    data: HotelCol
}

export default function CellAction({data}: CellActionProps) {

    const router = useRouter();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"}>
                    <Settings size={20}/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={"start"}>
               <DropdownMenuItem onClick={() => router.push(`/update-hotel/${data.id}`)}>
                  <div className={"flex items-center"}>
                       <Pencil size={20} className={"mr-2"}/>
                       Edit
                  </div>
               </DropdownMenuItem>
                <DropdownMenuItem>
                    <div className={"flex items-center"}>
                        <Trash size={20} className={"mr-2"}/>
                        Delete
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}