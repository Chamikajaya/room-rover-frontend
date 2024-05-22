import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({children}: RootLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            {children}
            <Footer/>
        </div>
    )
}