import type {Metadata} from "next";
import {Roboto} from "next/font/google";
import "./globals.css";
import React from "react";
import {ThemeProvider} from "@/components/theme-provider";
import Header from "@/components/header";
import MobileNavbar from "@/components/mobile-navbar";

const roboto = Roboto({weight: ["100", "300", "400", "500", "700", "900"], subsets: ["latin"]});

export const metadata: Metadata = {
    title: "RoomRover",
    description: "Explore, compare, and book hotels effortlessly with RoomRover. We bring you a wide range of options, ensuring you find the ideal stay at the best price. Start your journey with RoomRover today",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
