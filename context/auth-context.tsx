"use client";

import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface authProviderProps {
    children: React.ReactNode;
}


type AuthContext = {
    isAuthenticated: boolean;
    checkAuth: () => void;
    user: {
        userId: string
    } | null;   // User object containing userId or null if not authenticated
};

// Creating the AuthContext with the defined type
const AuthContext = createContext<AuthContext | undefined>(undefined);


export function AuthProvider({children}: authProviderProps) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Function to check authentication status by making a request to the server
    const checkAuth = async () => {

        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/validate-token`,
                {withCredentials: true}  // Ensuring cookies are sent with the request
            );

            // console.log(response.data);

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
    }

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated, checkAuth, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

