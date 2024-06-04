"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BotIcon } from "lucide-react";
import ChatbotModal from "@/components/roomie-bot-componenents/ai-chatbox";

// ChatbotModalButton component which is displayed in the Navbar
export default function ChatbotModalButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className="flex items-center px-4 py-2 bg-purple-700 text-white rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 transform transition-transform duration-300 hover:scale-105 active:scale-95"
            >
                <BotIcon size={24} className="mr-2" />
                <span className="font-extrabold">Try Roomie</span>
            </Button>
            <ChatbotModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
