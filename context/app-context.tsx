"use client";

import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {loadStripe, Stripe} from "@stripe/stripe-js";

interface appProviderProps {
    children: React.ReactNode;
}

type AppContext = {
    isAuthenticated: boolean;
    checkAuth: () => void;
    user: {
        userId: string
    } | null;   // User object containing userId or null if not authenticated
    stripePromise: Promise<Stripe | null>;
};

// Creating the AppContext with the defined type
const AppContext = createContext<AppContext | undefined>(undefined);

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string;
console.log("Stripe API Key:", stripePublicKey);

if (!stripePublicKey) {
    throw new Error("Missing Stripe API key");
}

const stripePromise = loadStripe(stripePublicKey);

export function AppProvider({children}: appProviderProps) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Function to check authentication status by making a request to the server
    const checkAuth = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/validate-token`,
                {withCredentials: true}  // Ensuring cookies are sent with the request
            );

            // If response is successful, update state to reflect authentication status
            if (response.status === 200) {
                setIsAuthenticated(true);
                setUser(response.data);
                toast.success("Authenticated successfully");
            } else {
                setIsAuthenticated(false);
                setUser(null);
                toast.error("Authentication failed");
            }
        } catch (e) {
            console.error("AUTH PROVIDER --> " + e);
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    // Check authentication status on component mount
    useEffect(() => {
        checkAuth();
    }, []);

    return (
        // This makes the isAuthenticated, checkAuth, and user values available to any component that consumes the AppContext.
        <AppContext.Provider value={{isAuthenticated, checkAuth, user, stripePromise}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;
