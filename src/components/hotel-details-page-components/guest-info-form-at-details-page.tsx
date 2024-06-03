"use client";

import {Button} from "@/components/ui/button";
import {useContext} from "react";
import AuthContext from "../../../context/auth-context";
import {useRouter} from "next/navigation";


interface GuestInfoFormAtDetailsPageProps {
    id: string;
}

export default function GuestInfoFormAtDetailsPage({id}: GuestInfoFormAtDetailsPageProps) {

    const authContext = useContext(AuthContext);
    const isAuthenticated = authContext ? authContext.isAuthenticated : false;

    const router = useRouter();

    const handleBookNow = () => {

        if (isAuthenticated) {
            // Redirect to booking page
            router.push(`/hotel-details/${id}/booking`);

        } else {
            // Redirect to log in with returnUrl
            router.push(
                `/login?returnUrl=${encodeURIComponent(window.location.href)}`
            );
        }


    }


    return (
        <div className="flex justify-center w-full mt-6">

            {/* FORM */}

            <Button
                onClick={handleBookNow}
                className="w-64 py-3 text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"

            >
                {isAuthenticated ? "Book Now" : "Login to Book"}
            </Button>
        </div>
    )


}