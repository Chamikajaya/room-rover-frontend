"use client";

import AddHotelForm from "@/components/add-hotel-form-components/add-hotel-form";
import { useContext } from "react";
import AppContext from "../../../../context/app-context";

export default function AddHotelPage() {
    const appContext = useContext(AppContext);

    if (!appContext) {
        // Handle the case where the context is not available
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    There was an error loading the application context. Please try again later.
                </h1>
            </div>
        );
    }

    const { isAuthenticated } = appContext;

    return (
        <div className="flex items-center justify-center min-h-screen">
            {isAuthenticated ? <AddHotelForm /> :
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    You need to be logged in to add a hotel
                </h1>}
        </div>
    );
}
