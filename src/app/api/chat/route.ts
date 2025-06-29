import { NextRequest, NextResponse } from "next/server";
import { ChatRequest, ChatResponse } from "@/types/message";

const PYTHON_BACKEND_URL =
  process.env.PYTHON_BACKEND_URL || "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    console.log("Received chat request:", {
      mood: body.mood,
      messageLength: body.message?.length,
    });

    // Validate request
    if (!body.message || !body.mood) {
      console.error("Invalid request - missing message or mood");
      return NextResponse.json(
        { error: "Message and mood are required" },
        { status: 400 },
      );
    }

    // Forward request to Python backend
    console.log("Forwarding to Python backend:", PYTHON_BACKEND_URL);
    const response = await fetch(`${PYTHON_BACKEND_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });

    console.log("Backend response status:", response.status);

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: "Unknown error" }));
      console.error("Backend error:", errorData);
      return NextResponse.json(
        {
          error: errorData.detail || "Backend service error",
          content: `I apologize, but I'm experiencing some technical difficulties. Please try again in a moment.`,
        },
        { status: response.status },
      );
    }

    const data: ChatResponse = await response.json();
    console.log("Successfully received response from backend");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Chat API error:", error);

    // Check if it's a connection error to Python backend
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return NextResponse.json(
        {
          error:
            "Unable to connect to AI backend. Please ensure the Python backend is running on port 8000.",
          content:
            "I'm sorry, but I'm currently unable to process your request. The AI backend service appears to be offline. Please make sure the Python backend is running.",
        },
        { status: 503 },
      );
    }

    // Handle timeout errors
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        {
          error: "Request timeout",
          content:
            "I'm taking longer than usual to respond. Please try again with a shorter message.",
        },
        { status: 408 },
      );
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        content:
          "I apologize, but I encountered an unexpected error. Please try again.",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "MoodBot Chat API is running",
    backend: PYTHON_BACKEND_URL,
  });
}
