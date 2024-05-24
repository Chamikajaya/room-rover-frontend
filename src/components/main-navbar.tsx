import { Button } from "@/components/ui/button";
import Link from "next/link";
import AuthContext from "../../context/auth-context";
import {useContext} from "react";

export default function MainNavbar() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div className={"flex flex-row justify-center items-center gap-x-4"}>
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
                            variant={"secondary"}
                        >
                            Sign Out
                        </Button>
                    </Link>
                </>
            ) : (
                <Link href={"/register"}>
                    <Button
                        className={"font-semibold hover:text-primary hover:bg-secondary"}
                        variant={"secondary"}
                    >
                        Sign In
                    </Button>
                </Link>
            )}
        </div>
    );
}