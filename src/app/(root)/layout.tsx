import React from "react";
import HeroSection from "@/components/hero-section";

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({children}: RootLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            {children}
        </div>
    )
}