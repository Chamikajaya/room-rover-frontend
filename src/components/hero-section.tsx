"use client";
import React from "react";
import SearchBar from "@/components/search-bar";

export default function HeroSection() {
    return (
        // maybe change the padding bottom ?
        <div className="text-center my-6 pb-32 ">
            <div className="container mx-auto flex flex-col gap-4">
                <h1 className={"text-6xl font-semibold"}>Find your dream stay</h1>
                <p className={"text-primary-foreground font-light text-xl"}>
                    Premium hotels at not so premium prices
                </p>
            </div>
            <SearchBar/>
        </div>
    );
}
