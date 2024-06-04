"use client";

import { useContext } from "react";
import AppContext from "../../context/app-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/auth-components/logout-btn";
import ChatbotModalButton from "@/components/roomie-bot-componenents/ai-chat-btn";

export default function NavbarButtons() {
  // @ts-ignore
  const { isAuthenticated } = useContext(AppContext);

  return (
    <>
      <ChatbotModalButton />
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
          <Link href={"/my-hotels"}>
            <Button
              className={"font-semibold hover:text-primary hover:bg-secondary"}
              variant={"secondary"}
            >
              Hotels
            </Button>
          </Link>
          <LogoutButton />
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
  );
}
