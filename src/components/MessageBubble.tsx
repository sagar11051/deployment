import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { AlertCircle, Search, Bot } from "lucide-react";

export interface MessageBubbleProps {
  message: {
    id: string;
    content: string;
    role: "user" | "assistant" | "system" | "tool";
    toolName?: string;
  };
  mood?: "sad" | "relaxed" | "business" | "tech" | "happy" | "funny";
}

const MessageBubble = ({ message, mood = "business" }: MessageBubbleProps) => {
  // Guard against undefined message
  if (!message || !message.role) {
    return null;
  }

  const isUser = message.role === "user";
  const isTool = message.role === "tool";
  const isSystem = message.role === "system";

  // Mood-specific styling with custom hex colors
  const moodStyles = {
    sad: {
      bg: "#C9D6DF",
      text: "#2D3640",
      border: "#A7B6C2",
      icon: "😢",
      accent: "#5C6D7A",
    },
    relaxed: {
      bg: "#D6F5E3",
      text: "#2E4D43",
      border: "#B8E2D6",
      icon: "😌",
      accent: "#6BC2AF",
    },
    business: {
      bg: "#64B5F6",
      text: "#212121",
      border: "#3949AB",
      icon: "💼",
      accent: "#1A237E",
    },
    tech: {
      bg: "#80DEEA",
      text: "#1A1A1A",
      border: "#00BCD4",
      icon: "💻",
      accent: "#263238",
    },
    happy: {
      bg: "#FFAB00",
      text: "#5C4400",
      border: "#FFE082",
      icon: "😄",
      accent: "#FFD600",
    },
    funny: {
      bg: "#FFB300",
      text: "#3E2723",
      border: "#FFD180",
      icon: "😂",
      accent: "#FF7043",
    },
  };

  const currentStyle = moodStyles[mood] || moodStyles.business;

  return (
    <div
      className={cn(
        "flex w-full mb-4 items-start",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      {!isUser && (
        <div className="mr-2">
          <Avatar
            className="h-8 w-8 border-2 shadow-sm transition-all duration-300"
            style={{
              backgroundColor: currentStyle.bg,
              borderColor: currentStyle.border,
            }}
          >
            <AvatarImage src="" alt="AI Assistant" />
            <AvatarFallback
              className="text-xs font-medium"
              style={{ color: currentStyle.text }}
            >
              {isTool ? "🔧" : currentStyle?.icon || "🤖"}
            </AvatarFallback>
          </Avatar>
        </div>
      )}

      <div
        className={cn(
          "px-4 py-2 rounded-lg max-w-[80%] break-words border-2 shadow-sm transition-all duration-300",
          isUser
            ? "shadow-md"
            : isTool
              ? "border-dashed opacity-80"
              : isSystem
                ? "italic opacity-75"
                : "hover:shadow-md",
        )}
        style={{
          backgroundColor: isUser
            ? currentStyle.accent
            : isTool
              ? "#F3F4F6"
              : isSystem
                ? "#E5E7EB"
                : currentStyle.bg,
          color: isUser
            ? "#FFFFFF"
            : isTool
              ? "#6B7280"
              : isSystem
                ? "#6B7280"
                : currentStyle.text,
          borderColor: isUser
            ? currentStyle.accent
            : isTool
              ? "#D1D5DB"
              : isSystem
                ? "#D1D5DB"
                : currentStyle.border,
        }}
      >
        {isTool && (
          <div
            className="flex items-center gap-1 mb-1 text-xs font-medium"
            style={{ color: currentStyle.accent }}
          >
            {message.toolName === "search" && <Search className="h-3 w-3" />}
            {message.toolName === "alert" && (
              <AlertCircle className="h-3 w-3" />
            )}
            {!message.toolName && <Bot className="h-3 w-3" />}
            <span>{message.toolName || "Tool"}</span>
          </div>
        )}
        <div className="whitespace-pre-wrap">{message.content}</div>
      </div>

      {isUser && (
        <div className="ml-2">
          <Avatar
            className="h-8 w-8 border-2 shadow-sm transition-all duration-300"
            style={{
              backgroundColor: currentStyle.accent,
              borderColor: currentStyle.border,
            }}
          >
            <AvatarImage
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
              alt="User"
            />
            <AvatarFallback
              className="font-medium"
              style={{ color: "#FFFFFF" }}
            >
              U
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
