"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send, Loader2 } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import MessageBubble from "./MessageBubble";
import { Message } from "@/types/message";
import { MoodType } from "@/types/message";

interface ChatInterfaceProps {
  selectedMood?: string;
  onSendMessage?: (message: string) => Promise<void>;
  isLoading?: boolean;
  messages?: Message[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  selectedMood = "relaxed",
  onSendMessage = async () => {},
  isLoading = false,
  messages = [],
}) => {
  const [inputValue, setInputValue] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mood-based theme styles with custom hex colors
  const moodStyles = {
    sad: {
      bgColor: "#F4F7FA",
      cardBg: "#FFFFFF",
      cardBorder: "#A7B6C2",
      inputBg: "#FFFFFF",
      inputBorder: "#C9D6DF",
      buttonBg: "#5C6D7A",
      buttonHover: "#2D3640",
      buttonText: "#FFFFFF",
      textColor: "#2D3640",
    },
    relaxed: {
      bgColor: "#F7FAF9",
      cardBg: "#FFFFFF",
      cardBorder: "#B8E2D6",
      inputBg: "#FFFFFF",
      inputBorder: "#D6F5E3",
      buttonBg: "#6BC2AF",
      buttonHover: "#2E4D43",
      buttonText: "#FFFFFF",
      textColor: "#2E4D43",
    },
    business: {
      bgColor: "#F5F7FB",
      cardBg: "#FFFFFF",
      cardBorder: "#3949AB",
      inputBg: "#FFFFFF",
      inputBorder: "#64B5F6",
      buttonBg: "#1A237E",
      buttonHover: "#212121",
      buttonText: "#FFFFFF",
      textColor: "#212121",
    },
    tech: {
      bgColor: "#ECEFF1",
      cardBg: "#FFFFFF",
      cardBorder: "#00BCD4",
      inputBg: "#FFFFFF",
      inputBorder: "#80DEEA",
      buttonBg: "#263238",
      buttonHover: "#1A1A1A",
      buttonText: "#FFFFFF",
      textColor: "#1A1A1A",
    },
    happy: {
      bgColor: "#FFFDE7",
      cardBg: "#FFFFFF",
      cardBorder: "#FFE082",
      inputBg: "#FFFFFF",
      inputBorder: "#FFAB00",
      buttonBg: "#FFD600",
      buttonHover: "#5C4400",
      buttonText: "#5C4400",
      textColor: "#5C4400",
    },
    funny: {
      bgColor: "#FFF3E0",
      cardBg: "#FFFFFF",
      cardBorder: "#FFD180",
      inputBg: "#FFFFFF",
      inputBorder: "#FFB300",
      buttonBg: "#FF7043",
      buttonHover: "#3E2723",
      buttonText: "#FFFFFF",
      textColor: "#3E2723",
    },
  };

  // Default to relaxed if mood not found
  const currentStyle =
    moodStyles[selectedMood as keyof typeof moodStyles] || moodStyles.relaxed;

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSendMessage = async () => {
    if (inputValue.trim() && !isLoading) {
      const message = inputValue;
      setInputValue("");
      await onSendMessage(message);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Default messages if none provided
  const moodGreetings: Record<MoodType, string> = {
    sad: "Hey, I'm your Blue Whisper—soft-spoken, soul-soothing, and always here when you're feeling a little cloudier than usual.",
    relaxed: "Hey, I'm your Zen Current—let's float through calm conversations and gentle thoughts together.",
    business: "Hey, I'm your ExecVibe—on point, polished, and prepped for anything from PowerPoints to pitch meetings.",
    tech: "Hey, I'm your Circuit Mind—tech-tuned, code-charged, and ready to debug life one line at a time.",
    happy: "Hey, I'm your JoyLoop—bubbling with good vibes and always ready to spark a little sunshine in your day.",
    funny: "Hey, I'm your SnickerByte—wired for laughs, loaded with puns, and here to tickle your funny bone.",
  };

  const defaultMessages: Message[] = [
    {
      id: "1",
      content: moodGreetings[selectedMood as MoodType] || moodGreetings["relaxed"],
      role: "assistant",
    },
  ];

  const displayMessages = messages.length > 0 ? messages : defaultMessages;

  return (
    <div
      className="w-full h-full p-4 transition-all duration-500"
      style={{ backgroundColor: currentStyle.bgColor }}
    >
      <Card
        className="w-full h-full flex flex-col overflow-hidden border-2 shadow-lg transition-all duration-500"
        style={{
          backgroundColor: currentStyle.cardBg,
          borderColor: currentStyle.cardBorder,
        }}
      >
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="flex flex-col space-y-4">
            {displayMessages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                mood={selectedMood}
              />
            ))}
            {isLoading && (
              <div className="flex justify-center py-2">
                <Loader2
                  className="h-6 w-6 animate-spin"
                  style={{ color: currentStyle.buttonBg }}
                />
              </div>
            )}
          </div>
        </ScrollArea>

        <CardContent
          className="p-4 border-t-2 transition-all duration-500"
          style={{ borderColor: currentStyle.cardBorder }}
        >
          <div className="flex items-center space-x-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1 border-2 transition-all duration-300 focus:ring-2"
              style={{
                backgroundColor: currentStyle.inputBg,
                borderColor: currentStyle.inputBorder,
                color: currentStyle.textColor,
              }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: currentStyle.buttonBg,
                color: currentStyle.buttonText,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  currentStyle.buttonHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = currentStyle.buttonBg;
              }}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatInterface;
