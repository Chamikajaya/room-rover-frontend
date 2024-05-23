import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function MainNavbar() {
    return (
        <Link href={"/register"}>
            <Button
                className={"font-semibold hover:text-primary hover:bg-secondary"}
                variant={"secondary"}
                >
                Sign In
            </Button>
        </Link>
    )
}