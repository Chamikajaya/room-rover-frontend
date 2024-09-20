"use client";

import { useState } from "react";
import ChatbotModal from "@/components/ChatbotModal";
import { Button } from "@/components/ui/button";
import { BotIcon } from "lucide-react";

export default function ChatbotModalButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-4 right-4">
      <Button onClick={toggleChatbot}>
        <BotIcon size={24} className="mr-2" />
        <span className="font-semibold">Chatbot</span>
      </Button>
      {isOpen && <ChatbotModal isOpen={isOpen} onClose={toggleChatbot} />}
    </div>
  );
}
