import {Message} from "ai";
import {cn} from "@/lib/utils";
import {Bot, UserRound} from "lucide-react";



export default function ChatMessage({
                                        message: { role, content },
                                    }: {
    message: Pick<Message, "role" | "content">;
}) {


    const isAiMessage = role === "assistant";

    return (

        <div
            className={cn(
                "mb-3 flex items-center",
                isAiMessage ? "me-5 justify-start" : "ms-5 justify-end",
            )}
        >
            {isAiMessage && <Bot className="mr-2 shrink-0" />}
            <p
                className={cn(
                    "whitespace-pre-line rounded-md border px-3 py-2",
                    isAiMessage ? "bg-background" : "bg-primary text-primary-foreground",
                )}
            >
                {content}
            </p>
            {!isAiMessage && <UserRound  className={"mr-2 shrink-0"}/> }

        </div>
    );
}