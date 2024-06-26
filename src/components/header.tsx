"use client";

import Link from "next/link";
import Logo from "@/components/logo";
import MobileNavbar from "@/components/mobile-navbar";
import MainNavbar from "@/components/main-navbar";


export default function Header() {



    return (
        <div className="border-b-2 border-b-primary py-6">
            <div className="container mx-auto flex justify-between items-center">
                <Link href={"/"}>
                    <Logo/>
                </Link>
                <div className={"md:hidden"}>
                    <MobileNavbar/>
                </div>
                <div className={"hidden md:block"}>
                    <MainNavbar/>
                </div>
            </div>


        </div>
    )
}

