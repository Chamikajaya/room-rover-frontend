import { Button } from "@/components/ui/button";
import Link from "next/link";
import AuthContext from "../../context/app-context";
import {useContext} from "react";
import NavbarButtons from "@/components/navbar-btns";

export default function MainNavbar() {

    return (
        <div className={"flex flex-row justify-center items-center gap-x-4"}>
           <NavbarButtons/>
        </div>
    );
}