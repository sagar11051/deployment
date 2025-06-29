"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Smile,
  Coffee,
  Briefcase,
  Cpu,
  Sun,
  Music,
  Sparkles,
} from "lucide-react";
import { MoodType } from "@/types/message";

// Define mood options with enhanced styling
interface MoodOption {
  id: MoodType;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description: string;
  gradient: string;
}

const moods: MoodOption[] = [
  {
    id: "sad",
    name: "Blue Whisper",
    icon: <Music className="h-8 w-8" />,
    color: "#2D3640",
    bgColor: "#C9D6DF",
    description: "Soft-spoken, soul-soothing support",
    gradient: "linear-gradient(135deg, #C9D6DF 0%, #F4F7FA 100%)",
  },
  {
    id: "relaxed",
    name: "Zen Current",
    icon: <Coffee className="h-8 w-8" />,
    color: "#2E4D43",
    bgColor: "#D6F5E3",
    description: "Float through calm conversations",
    gradient: "linear-gradient(135deg, #D6F5E3 0%, #F7FAF9 100%)",
  },
  {
    id: "business",
    name: "ExecVibe",
    icon: <Briefcase className="h-8 w-8" />,
    color: "#212121",
    bgColor: "#64B5F6",
    description: "On point, polished, and prepped",
    gradient: "linear-gradient(135deg, #64B5F6 0%, #F5F7FB 100%)",
  },
  {
    id: "tech",
    name: "Circuit Mind",
    icon: <Cpu className="h-8 w-8" />,
    color: "#1A1A1A",
    bgColor: "#80DEEA",
    description: "Tech-tuned, code-charged, ready to debug",
    gradient: "linear-gradient(135deg, #80DEEA 0%, #ECEFF1 100%)",
  },
  {
    id: "happy",
    name: "JoyLoop",
    icon: <Sun className="h-8 w-8" />,
    color: "#5C4400",
    bgColor: "#FFAB00",
    description: "Bubbling with good vibes and sunshine",
    gradient: "linear-gradient(135deg, #FFAB00 0%, #FFFDE7 100%)",
  },
  {
    id: "funny",
    name: "SnickerByte",
    icon: <Smile className="h-8 w-8" />,
    color: "#3E2723",
    bgColor: "#FFB300",
    description: "Wired for laughs and puns",
    gradient: "linear-gradient(135deg, #FFB300 0%, #FFF3E0 100%)",
  },
];

export default function Home() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMoodSelect = (moodId: MoodType) => {
    router.push(`/chat/${moodId}`);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/9a/13/70/9a1370abb42f6e2fc113277c7680b2fd.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/30 to-indigo-900/40" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
        {/* Brand Section */}
        <div
          className={`text-center mb-16 ${isLoaded ? "animate-fade-scale opacity-100" : "opacity-0"}`}
        >
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-12 w-12 text-purple-400 mr-4" />
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold gradient-text">
              VibeVista
            </h1>
            <Sparkles className="h-12 w-12 text-purple-400 ml-4" />
          </div>
          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Experience personalized conversations that adapt to your mood with
            our intelligent AI companion. Choose your vibe and let the
            conversation flow naturally.
          </p>
        </div>

        {/* Mood Selection Grid */}
        <div
          className={`w-full max-w-7xl ${isLoaded ? "animate-slide-sides opacity-100" : "opacity-0"}`}
          style={{ animationDelay: "0.3s" }}
        >
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <div className="p-8 sm:p-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">
                How are you feeling today?
              </h2>
              <p className="text-lg text-white/80 text-center mb-12 max-w-2xl mx-auto">
                Select your mood and dive into a conversation tailored just for
                you
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {moods.map((mood, index) => (
                  <div
                    key={mood.id}
                    className={`${isLoaded ? "animate-slide-up opacity-100" : "opacity-0"}`}
                    style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                  >
                    <Button
                      variant="outline"
                      className="w-full h-auto p-8 flex flex-col items-center justify-center space-y-4 transition-all duration-500 hover:scale-105 hover:shadow-2xl group border-2 backdrop-blur-sm"
                      style={{
                        background: mood.gradient,
                        borderColor: mood.color,
                        color: mood.color,
                      }}
                      onClick={() => handleMoodSelect(mood.id)}
                    >
                      <div
                        className="p-4 rounded-full transition-all duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${mood.color}20`,
                          color: mood.color,
                        }}
                      >
                        {mood.icon}
                      </div>
                      <div className="text-center">
                        <h3
                          className="text-2xl font-bold mb-2"
                          style={{ color: mood.color }}
                        >
                          {mood.name}
                        </h3>
                        <p
                          className="text-sm opacity-80"
                          style={{ color: mood.color }}
                        >
                          {mood.description}
                        </p>
                      </div>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div
          className={`mt-16 text-center ${isLoaded ? "animate-slide-up opacity-100" : "opacity-0"}`}
          style={{ animationDelay: "1s" }}
        >
          <p className="text-white/60 text-sm">
            Powered by advanced AI • Choose your mood and start
            chatting
          </p>
        </div>
      </div>
    </div>
  );
}
