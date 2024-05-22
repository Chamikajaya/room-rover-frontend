import Logo from "@/components/logo";
import Link from "next/link";

export default function Footer() {
    return (
        <div className={"bg-secondary py-10"}>
            <div className="container mx-auto flex justify-center items-center flex-col gap-3">
                <Link href={"/"}>
                    <Logo/>
                </Link>
                <span>
                    &copy; 2024 All rights reserved
                </span>
            </div>
        </div>
    )
}