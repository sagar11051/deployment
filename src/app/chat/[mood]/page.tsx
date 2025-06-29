"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ChatInterface from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Message, ChatRequest, ChatResponse, MoodType } from "@/types/message";

// Define mood background images
const moodBackgrounds = {
  sad: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1920&q=80", // Calm, muted landscape
  relaxed:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80", // Peaceful nature scene
  business:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80", // Modern office/city
  tech: "https://static6.depositphotos.com/1009112/615/i/600/depositphotos_6155195-stock-photo-aluminum-abstract-silver-stripe-pattern.jpg", // Tech/digital theme
  happy:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80", // Bright, sunny scene
  funny:
    "https://st.depositphotos.com/1806346/1382/i/450/depositphotos_13821126-stock-photo-dog-laying-on-his-back.jpg", // Playful, colorful scene
};

// Define mood themes
const moodThemes = {
  sad: {
    primary: "#C9D6DF",
    secondary: "#F4F7FA",
    text: "#2D3640",
    border: "#A7B6C2",
    accent: "#5C6D7A",
    gradient:
      "linear-gradient(135deg, rgba(244, 247, 250, 0.95) 0%, rgba(201, 214, 223, 0.95) 100%)",
  },
  relaxed: {
    primary: "#D6F5E3",
    secondary: "#F7FAF9",
    text: "#2E4D43",
    border: "#B8E2D6",
    accent: "#6BC2AF",
    gradient:
      "linear-gradient(135deg, rgba(247, 250, 249, 0.95) 0%, rgba(214, 245, 227, 0.95) 100%)",
  },
  business: {
    primary: "#64B5F6",
    secondary: "#F5F7FB",
    text: "#212121",
    border: "#3949AB",
    accent: "#1A237E",
    gradient:
      "linear-gradient(135deg, rgba(245, 247, 251, 0.95) 0%, rgba(162, 208, 247, 0.95) 100%)",
  },
  tech: {
    primary: "#80DEEA",
    secondary: "#ECEFF1",
    text: "#1A1A1A",
    border: "#00BCD4",
    accent: "#263238",
    gradient:
      "linear-gradient(135deg, rgba(236, 239, 241, 0.95) 0%, rgba(154, 243, 255, 0.95) 100%)",
  },
  happy: {
    primary: "#FFAB00",
    secondary: "#FFFDE7",
    text: "#5C4400",
    border: "#FFE082",
    accent: "#FFD600",
    gradient:
      "linear-gradient(135deg, rgba(255, 253, 231, 0.95) 0%, rgba(247, 220, 165, 0.95) 100%)",
  },
  funny: {
    primary: "#FFB300",
    secondary: "#FFF3E0",
    text: "#3E2723",
    border: "#FFD180",
    accent: "#FF7043",
    gradient:
      "linear-gradient(135deg, rgba(255, 243, 224, 0.95) 0%, rgba(229, 246, 161, 0.95) 100%)",
  },
};

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const mood = params.mood as MoodType;
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Validate mood
  useEffect(() => {
    const validMoods = ["sad", "relaxed", "business", "tech", "happy", "funny"];
    if (!validMoods.includes(mood)) {
      router.push("/");
    }
  }, [mood, router]);

  // Function to handle sending messages
  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const chatRequest: ChatRequest = {
        message,
        mood: mood,
      };

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatRequest),
      });

      const data: ChatResponse = await response.json();

      // Add assistant response to chat
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.content,
        role: "assistant",
        toolUse: data.toolUse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm sorry, I encountered an error while processing your message. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Get current theme based on selected mood
  const currentTheme = moodThemes[mood] || moodThemes.relaxed;
  const backgroundImage = moodBackgrounds[mood] || moodBackgrounds.relaxed;

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: currentTheme.gradient,
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="mb-4 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300"
            style={{
              borderColor: currentTheme.border,
              color: currentTheme.text,
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Moods
          </Button>

          <div className="text-center mb-6">
            <h1
              className="text-3xl sm:text-4xl font-bold mb-2 capitalize"
              style={{ color: currentTheme.text }}
            >
              {mood} Mode
            </h1>
            <p
              className="text-lg opacity-80"
              style={{ color: currentTheme.text }}
            >
              Your {mood} AI companion is ready to chat
            </p>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 px-4 sm:px-6 pb-6">
          <div className="max-w-4xl mx-auto h-full">
            <ChatInterface
              selectedMood={mood}
              messages={messages}
              isLoading={isLoading}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
