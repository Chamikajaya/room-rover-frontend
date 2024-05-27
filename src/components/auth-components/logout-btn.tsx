"use client";

import {Button} from "@/components/ui/button";
// import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LogoutButton() {

    // const router = useRouter();

    const onLogout = async () => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/logout`, {}, {
                    withCredentials: true

                })
            if (response.status === 200) {
                window.location.href = "/login";
                // toast.success('Successfully logged out!', {duration:4000});

            }
        } catch (e) {
            console.error(e);
            toast.error('Failed to log out. Please try again.');
        }
    };


    return (


        <Button
            className={"font-semibold hover:text-primary hover:bg-secondary"}
            variant={"default"}
            onClick={onLogout}
        >
            Logout
        </Button>


    )
}