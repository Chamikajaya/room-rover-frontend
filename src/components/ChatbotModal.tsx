import React, { useState, useEffect, useRef, useCallback } from "react";
import { User, Bot, Trash2, XCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatBot = ({ isOpen, onClose }: ChatbotModalProps) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm Roomie, the AI assistant bot for Project Room Rover. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
    scrollToBottom();
  }, [isOpen, messages, scrollToBottom]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    let assistantMessage = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);

        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") {
              setIsLoading(false);
            } else {
              try {
                const parsed = JSON.parse(data);
                if (
                  parsed.role === "model" &&
                  parsed.parts &&
                  parsed.parts[0] &&
                  parsed.parts[0].text
                ) {
                  assistantMessage.content += parsed.parts[0].text;
                  setMessages((prev) => [
                    ...prev.slice(0, -1),
                    { ...assistantMessage },
                  ]);
                }
              } catch (e) {
                console.error("Error parsing JSON:", e);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    if (window.confirm("Are you sure you want to clear all messages?")) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hello! I'm Roomie, the AI assistant bot for Project Room Rover. How can I help you today?",
        },
      ]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] w-96 h-[80vh] bg-[#08060e] shadow-lg rounded-lg flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Roomie Chat</h2>
        <button onClick={onClose}>
          <XCircle size={24} className="text-red-500" />
        </button>
      </div>
      <ScrollArea className="flex-1 p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex mb-4 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex items-start max-w-[80%] ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex-shrink-0 ${
                  message.role === "user" ? "ml-2" : "mr-2"
                }`}
              >
                {message.role === "user" ? (
                  <User className="h-6 w-6 text-white" />
                ) : (
                  <Bot className="h-6 w-6 text-white" />
                )}
              </div>
              <div
                className={`p-2 rounded-lg ${
                  message.role === "user"
                    ? "bg-[#7000FF] text-white"
                    : "bg-gray-700 text-white"
                }`}
              >
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-center text-white">
            <span className="typing-animation">Roomie is thinking 🤔</span>
          </div>
        )}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {messages.length === 1 && (
          <div className="flex items-center justify-center h-full text-white">
            <Bot className="mr-2" />
            <span>Start chatting with Roomie!</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </ScrollArea>
      <form onSubmit={sendMessage} className="p-4 border-t border-gray-700">
        <div className="flex mb-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 bg-gray-700 text-white border border-gray-600 rounded-l"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-l-none bg-[#7000FF] hover:bg-[#8f00ff]"
          >
            Send
          </Button>
        </div>
        <Button
          onClick={clearMessages}
          variant="outline"
          className="w-full text-white border-gray-600"
        >
          <Trash2 className="mr-2 h-4 w-4" /> Clear Messages
        </Button>
      </form>
      <style jsx>{`
        .typing-animation::after {
          content: "...";
          animation: ellipsis 1.5s infinite;
        }
        @keyframes ellipsis {
          0% {
            content: ".";
          }
          33% {
            content: "..";
          }
          66% {
            content: "...";
          }
        }
      `}</style>
    </div>
  );
};

export default ChatBot;
730335336895;
