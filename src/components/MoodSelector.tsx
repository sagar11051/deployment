"use client";

import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Smile, Coffee, Briefcase, Cpu, Sun, Music } from "lucide-react";

interface MoodOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

interface MoodSelectorProps {
  onMoodSelect: (mood: string) => void;
  selectedMood?: string | null;
}

const MoodSelector = ({
  onMoodSelect = () => {},
  selectedMood = "",
}: MoodSelectorProps) => {
  const [selected, setSelected] = useState<string>(selectedMood);

  const moods: MoodOption[] = [
    {
      id: "sad",
      name: "Sad",
      icon: <Music className="h-6 w-6" />,
      color: "#2D3640",
      bgColor: "#C9D6DF",
    },
    {
      id: "relaxed",
      name: "Relaxed",
      icon: <Coffee className="h-6 w-6" />,
      color: "#2E4D43",
      bgColor: "#D6F5E3",
    },
    {
      id: "business",
      name: "Business",
      icon: <Briefcase className="h-6 w-6" />,
      color: "#212121",
      bgColor: "#64B5F6",
    },
    {
      id: "tech",
      name: "Tech",
      icon: <Cpu className="h-6 w-6" />,
      color: "#1A1A1A",
      bgColor: "#80DEEA",
    },
    {
      id: "happy",
      name: "Happy",
      icon: <Sun className="h-6 w-6" />,
      color: "#5C4400",
      bgColor: "#FFAB00",
    },
    {
      id: "funny",
      name: "Funny",
      icon: <Smile className="h-6 w-6" />,
      color: "#3E2723",
      bgColor: "#FFB300",
    },
  ];

  const handleMoodSelect = (moodId: string) => {
    setSelected(moodId);
    onMoodSelect(moodId);
  };

  return (
    <Card className="w-full bg-white shadow-md">
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">
          How are you feeling today?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {moods.map((mood) => (
            <Button
              key={mood.id}
              variant="outline"
              className={`flex flex-col items-center justify-center h-24 p-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                selected === mood.id
                  ? "ring-4 ring-offset-2 shadow-lg scale-105"
                  : "hover:shadow-md"
              }`}
              style={{
                backgroundColor: mood.bgColor,
                borderColor: mood.color,
                color: mood.color,
                ringColor: selected === mood.id ? mood.color : undefined,
              }}
              onClick={() => handleMoodSelect(mood.id)}
            >
              <div className="mb-2" style={{ color: mood.color }}>
                {mood.icon}
              </div>
              <span className="font-medium" style={{ color: mood.color }}>
                {mood.name}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodSelector;
