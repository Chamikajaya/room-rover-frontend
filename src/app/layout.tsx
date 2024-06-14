import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import {ThemeProvider} from "@/components/theme-provider";
import Header from "@/components/header";
import ToasterProvider from "@/components/toast-provider";
import Footer from "@/components/footer";
import {AppProvider} from "../../context/app-context";
import {SearchProvider} from "../../context/search-context";


export const metadata: Metadata = {
    title: "RoomRover",
    description: "Explore, compare, and book hotels effortlessly with RoomRover. We bring you a wide range of options, ensuring you search the ideal stay at the best price. Start your journey with RoomRover today",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <html lang="en">
        <body>
        <AppProvider>
            <SearchProvider>
                <ToasterProvider/>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="flex flex-col min-h-screen">
                        <main className={"flex-grow"}>
                            <Header/>

                            {children}

                            <Footer/>
                        </main>
                    </div>
                </ThemeProvider>
            </SearchProvider>
        </AppProvider>
        </body>
        </html>
    );
}
