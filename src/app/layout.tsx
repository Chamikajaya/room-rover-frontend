import type {Metadata} from "next";
import {Roboto} from "next/font/google";
import "./globals.css";
import React from "react";
import {ThemeProvider} from "@/components/theme-provider";
import Header from "@/components/header";

const roboto = Roboto({weight: ["100", "300", "400", "500", "700", "900"], subsets: ["latin"]});

export const metadata: Metadata = {
    title: "BellyBites",
    description: "Craving deliciousness? Belly Bites delivers the best bites from your favorite restaurants, straight to your door. Skip the cooking, explore a variety of cuisines, and satisfy your belly with just a few taps!",
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
            <Header/>
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
