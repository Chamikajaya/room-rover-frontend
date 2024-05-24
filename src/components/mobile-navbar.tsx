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
import NavbarButtons from "@/components/navbar-btns";


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
                        <div className="flex flex-col items-center justify-center gap-y-4">
                           <NavbarButtons/>
                        </div>

                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    )
}