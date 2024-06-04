import { useChat } from "ai/react";
import { cn } from "@/lib/utils";
import { Bot, Trash2, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ChatMessage from "@/components/roomie-bot-componenents/chat-message";
import { useEffect, useRef } from "react";

interface ChatbotModalProps {
    isOpen: boolean;
    onClose: () => void;
}


// TODO: MAKE THE ALERT MODAL POPUP BEFORE DELETING THE CHAT HISTORY
export default function ChatbotModal({ isOpen, onClose }: ChatbotModalProps) {
    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        setMessages,
        isLoading,
        error,
    } = useChat({
        api:`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/chat`
    })

    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    const isLastMessageByUser = messages[messages.length - 1]?.role === "user";

    return (
        <div
            className={cn(
                "fixed bottom-0 right-0 z-50 w-full max-w-[600px] p-1 xl:right-36 transition-transform transform",
                isOpen ? "translate-y-0" : "translate-y-full"
            )}
        >
            <button onClick={onClose} className="mb-1 ml-auto block focus:outline-none">
                <XCircle size={24} className="text-red-500 hover:text-red-700 transition-colors" />
            </button>
            <div className="flex h-[600px] flex-col rounded-lg bg-gray-800 border border-gray-700 shadow-lg">
                <div className="h-full mt-3 px-3 overflow-y-auto" ref={scrollRef}>
                    {messages.map((message) => (
                        <ChatMessage message={message} key={message.id} />
                    ))}

                    {isLoading && isLastMessageByUser && (
                        <ChatMessage
                            message={{
                                role: "assistant",
                                content: "Roomie is thinking...",
                            }}
                        />
                    )}

                    {error && (
                        <ChatMessage
                            message={{
                                role: "assistant",
                                content: "There was some issue, please try again later. ",
                            }}
                        />
                    )}

                    {!error && messages.length === 0 && (
                        <div className="flex h-full mx-auto flex-col justify-center items-center gap-3">
                            <Bot size={40} className="text-purple-500" />
                            <span className="font-semibold text-white">Struggling to find the perfect place?</span>
                            <span className="font-semibold text-white">Let Roomie assist you in your search.</span>
                        </div>
                    )}
                </div>
                <form onSubmit={handleSubmit} className="m-3 flex gap-2">
                    <Button
                        variant="outline"
                        title="Clear chat"
                        size="icon"
                        className="shrink-0 bg-red-500 hover:bg-red-700 text-white transition-colors"
                        type="button"
                        onClick={() => setMessages([])}
                    >
                        <Trash2 />
                    </Button>
                    <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Your message..."
                        ref={inputRef}
                        className="flex-grow bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500"
                    />
                    <Button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white transition-colors">
                        Send
                    </Button>
                </form>
            </div>
        </div>
    );
}
