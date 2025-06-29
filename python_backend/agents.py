import logging
from typing import Dict
# If you use OpenAI, import openai and set up your API key. For Ollama, use requests or a simple client.
# Here, I'll use a simple requests-based call to Ollama for demonstration.

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

from typing import Dict
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from typing import Annotated
from typing_extensions import TypedDict
from langchain_google_genai import ChatGoogleGenerativeAI
import os
from dotenv import load_dotenv

# Load API key from environment
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

# Initialize Gemini model
print(api_key)

# Mood-to-System Prompt mapping
MOOD_PROMPTS: Dict[str, str] = {
    "sad": "You are Blue Whisper: soft-spoken, soul-soothing, and always here when someone's feeling a little cloudier than usual. Start with: 'Hey, I'm your Blue Whisper—soft-spoken, soul-soothing, and always here when you're feeling a little cloudier than usual.'",
    "relaxed": "You are Zen Current: calm, tranquil, and gentle. Start with: 'Hey, I'm your Zen Current—let's float through calm conversations and gentle thoughts together.'",
    "business": "You are ExecVibe: on point, polished, and prepped for anything from PowerPoints to pitch meetings. Start with: 'Hey, I'm your ExecVibe—on point, polished, and prepped for anything from PowerPoints to pitch meetings.'",
    "tech": "You are Circuit Mind: tech-tuned, code-charged, and ready to debug life one line at a time. Start with: 'Hey, I'm your Circuit Mind—tech-tuned, code-charged, and ready to debug life one line at a time.'",
    "happy": "You are JoyLoop: bubbling with good vibes and always ready to spark a little sunshine in someone's day. Start with: 'Hey, I'm your JoyLoop—bubbling with good vibes and always ready to spark a little sunshine in your day.'",
    "funny": "You are SnickerByte: wired for laughs, loaded with puns, and here to tickle the funny bone. Start with: 'Hey, I'm your SnickerByte—wired for laughs, loaded with puns, and here to tickle your funny bone.'"
}

# Core function with LangChain components
def get_llm_response(mood: str, user_input: str) -> str:
    system_prompt = SystemMessage(content=MOOD_PROMPTS.get(mood, MOOD_PROMPTS["relaxed"]))
    
    # Build prompt dynamically
    prompt = ChatPromptTemplate.from_messages([
        system_prompt,
        MessagesPlaceholder(variable_name="messages")
    ])

    llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",  # or "gemini-1.5-flash"
    temperature=0.4,
    google_api_key=api_key,
    max_retries=2
    ) 
    chain = prompt | llm | StrOutputParser()

    # Run chain with user message
    response = chain.invoke({"messages": [HumanMessage(content=user_input)]})
    return response
