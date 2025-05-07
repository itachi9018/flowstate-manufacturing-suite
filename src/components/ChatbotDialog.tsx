
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  content: string;
  isUser: boolean;
}

const initialMessages: Message[] = [
  {
    content: "Hello! I'm your FlowState assistant. How can I help you today?",
    isUser: false,
  },
];

export function ChatbotDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      content: input.trim(),
      isUser: true,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "I'll look into that for you.",
        "Let me find that information for you.",
        "That's a great question. Here's what I know about it.",
        "I'm checking our system for that data now.",
        "Would you like more details on this topic?",
      ];
      
      const botMessage: Message = {
        content: botResponses[Math.floor(Math.random() * botResponses.length)],
        isUser: false,
      };
      
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="fixed z-50 bottom-5 right-5 rounded-full h-12 w-12 shadow-md hover:bg-flow-blue hover:text-white transition-colors"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90%] sm:w-[440px] h-[80vh] max-h-[600px] p-0 flex flex-col">
        <SheetHeader className="border-b p-4">
          <SheetTitle>FlowState Assistant</SheetTitle>
          <SheetDescription>
            Get help with your manufacturing operations
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "px-4 py-2 rounded-lg max-w-[80%]",
                  message.isUser
                    ? "bg-flow-blue text-white ml-auto"
                    : "bg-gray-100 text-gray-800"
                )}
              >
                {message.content}
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="border-t p-4 flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button onClick={handleSend} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
