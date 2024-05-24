"use client";

import {useContext} from "react";
import AuthContext from "../../context/auth-context";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function NavbarButtons() {
    // @ts-ignore
    const {isAuthenticated} = useContext(AuthContext);

    return (
        <>
            {isAuthenticated ? (
                <>
                    <Link href={"/"}>
                        <Button
                            className={"font-semibold hover:text-primary hover:bg-secondary"}
                            variant={"secondary"}
                        >
                            Bookings
                        </Button>
                    </Link>
                    <Link href={"/"}>
                        <Button
                            className={"font-semibold hover:text-primary hover:bg-secondary"}
                            variant={"secondary"}
                        >
                            Hotels
                        </Button>
                    </Link>
                    <Link href={"/"}>
                        <Button
                            className={"font-semibold hover:text-primary hover:bg-secondary"}
                            variant={"default"}
                        >
                            Sign Out
                        </Button>
                    </Link>
                </>
            ) : (
                <>
                    <Link href={"/register"}>
                        <Button
                            className={"font-semibold hover:text-primary hover:bg-secondary"}
                            variant={"secondary"}
                        >
                            Register
                        </Button>
                    </Link>
                    <Link href={"/login"}>
                    <Button
                        className={"font-semibold hover:text-primary hover:bg-secondary"}
                        variant={"default"}
                    >
                        Login
                    </Button>
                </Link>
                </>
            )}
        </>
    )
};