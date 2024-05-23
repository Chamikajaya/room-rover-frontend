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


export default function MobileNavbar() {
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
                        <Link href={"/register"}>
                            <Button
                                variant={"secondary"}
                                className={"flex-1 font-semibold bg-primary"}
                            >
                                Sign In
                            </Button>
                        </Link>

                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    )
}