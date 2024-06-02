"use client";

import {Button} from "@/components/ui/button";
// import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import {AlertModal} from "@/components/ui/alert-modal";
import {useState} from "react";

export default function LogoutButton() {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onLogout = async () => {
        try {
            setLoading(true);
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
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };


    return (

        <>
            <AlertModal
                title={"Are you sure you want to logout?"}
                description={"You will be redirected to the login page."}
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onLogout}
                loading={loading}
            />
            <Button
                className={"font-semibold hover:text-primary hover:bg-secondary"}
                variant={"default"}
                onClick={() => setOpen(true)}
            >
                Logout
            </Button>
        </>


    )
}