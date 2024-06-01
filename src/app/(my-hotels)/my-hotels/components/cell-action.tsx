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
import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {AlertModal} from "@/components/ui/alert-modal";


interface CellActionProps {
    data: HotelCol
}

export default function CellAction({data}: CellActionProps) {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const router = useRouter();

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/my-hotels/${data.id}`, {withCredentials: true});
            window.location.reload();
            toast.success("Hotel deleted successfully.")
        } catch {
            toast.error('An error occurred while deleting.');
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }


    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
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
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <div className={"flex items-center"}>
                            <Trash size={20} className={"mr-2"}/>
                            Delete
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}