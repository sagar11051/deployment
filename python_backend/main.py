from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agents import get_llm_response
from typing import Optional
import uvicorn
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="MoodBot Backend", description="LLM and Agent Logic for MoodBot")

# Add CORS middleware to allow requests from Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "https://pensive-ishizaka2-bgrgh.view-3.tempo-dev.app",
        "https://flamboyant-goldwasser5-kq3g6.view-3.tempo-dev.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    mood: str
    conversation_id: Optional[str] = None

class ChatResponse(BaseModel):
    content: str
    error: Optional[str] = None

@app.get("/")
async def root():
    return {"message": "MoodBot Backend is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "MoodBot Backend"}

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Process a chat message with the appropriate mood agent"""
    try:
        logger.info(f"Received chat request - Mood: {request.mood}, Message: {request.message[:50]}...")
        
        if not request.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        
        if request.mood not in ["sad", "relaxed", "business", "tech", "happy", "funny"]:
            raise HTTPException(status_code=400, detail="Invalid mood specified")
        
        # Call the simple LLM function
        content = get_llm_response(request.mood, request.message)
        logger.info(f"Returning response with content length: {len(content)}")
        return ChatResponse(content=content)
    
    except HTTPException as he:
        logger.error(f"HTTP Exception: {he.detail}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/moods")
async def get_available_moods():
    """Get list of available moods"""
    return {
        "moods": [
            {"id": "sad", "name": "Sad", "description": "Compassionate and empathetic support"},
            {"id": "relaxed", "name": "Relaxed", "description": "Calm and peaceful interactions"},
            {"id": "business", "name": "Business", "description": "Professional and efficient assistance"},
            {"id": "tech", "name": "Tech", "description": "Technical and knowledgeable guidance"},
            {"id": "happy", "name": "Happy", "description": "Enthusiastic and upbeat conversations"},
            {"id": "funny", "name": "Funny", "description": "Witty and humorous interactions"}
        ]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
