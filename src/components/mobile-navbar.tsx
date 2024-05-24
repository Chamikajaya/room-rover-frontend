import {Menu} from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Logo from "@/components/logo";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useContext} from "react";
import AuthContext from "../../context/auth-context";


export default function MobileNavbar() {

    const {isAuthenticated} = useContext(AuthContext);

    return (
        <Sheet>
            <SheetTrigger>
                <Menu className={"text-primary"}/>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader className={"flex justify-center items-center"}>
                    <SheetTitle>
                        <Logo/>
                    </SheetTitle>
                    <Separator/>
                    <SheetDescription className={"flex flex-col"}>
                        <div className="flex flex-col items-center justify-center gap-y-4">
                            {isAuthenticated ? (
                                <>
                                    <Link href={"/"}>
                                        <Button
                                            className={"font-semibold hover:text-primary hover:bg-secondary "}
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

                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    )
}