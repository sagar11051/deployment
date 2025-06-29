# from langchain.tools import Tool
# from langchain_community.tools import DuckDuckGoSearchRun
# from typing import List
# import requests
# from bs4 import BeautifulSoup
# import json
# import logging

# logger = logging.getLogger(__name__)

# def web_search(query: str) -> str:
#     """Search the web using DuckDuckGo"""
#     try:
#         logger.info(f"Performing web search for: {query}")
#         search = DuckDuckGoSearchRun()
#         results = search.run(query)
#         logger.info(f"Search completed successfully")
#         return f"Search results for '{query}': {results[:500]}..." if len(results) > 500 else f"Search results for '{query}': {results}"
#     except Exception as e:
#         logger.error(f"Error performing web search: {str(e)}")
#         return f"I apologize, but I couldn't perform the web search at the moment. Error: {str(e)}"

# def get_weather(location: str) -> str:
#     """Get weather information for a location (mock implementation)"""
#     # This is a mock implementation - in production, you'd use a real weather API
#     return f"Weather in {location}: Partly cloudy, 22°C. Perfect weather for a relaxing day!"

# def get_news_headlines() -> str:
#     """Get current news headlines (mock implementation)"""
#     # This is a mock implementation - in production, you'd use a real news API
#     headlines = [
#         "Tech Innovation Continues to Shape the Future",
#         "New Breakthrough in Renewable Energy",
#         "Global Markets Show Positive Trends",
#         "Scientific Discovery Opens New Possibilities"
#     ]
#     return "Current headlines: " + "; ".join(headlines)

# def calculate(expression: str) -> str:
#     """Safely calculate mathematical expressions"""
#     try:
#         # Only allow basic mathematical operations for security
#         allowed_chars = set('0123456789+-*/.() ')
#         if not all(c in allowed_chars for c in expression):
#             return "Error: Only basic mathematical operations are allowed"
        
#         result = eval(expression)
#         return f"Result: {result}"
#     except Exception as e:
#         return f"Error calculating expression: {str(e)}"

# def get_joke() -> str:
#     """Get a random joke"""
#     jokes = [
#         "Why don't scientists trust atoms? Because they make up everything!",
#         "Why did the scarecrow win an award? He was outstanding in his field!",
#         "Why don't eggs tell jokes? They'd crack each other up!",
#         "What do you call a fake noodle? An impasta!",
#         "Why did the math book look so sad? Because it had too many problems!"
#     ]
#     import random
#     return random.choice(jokes)

# def get_motivational_quote() -> str:
#     """Get a motivational quote"""
#     quotes = [
#         "The only way to do great work is to love what you do. - Steve Jobs",
#         "Innovation distinguishes between a leader and a follower. - Steve Jobs",
#         "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
#         "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
#         "The only impossible journey is the one you never begin. - Tony Robbins"
#     ]
#     import random
#     return random.choice(quotes)

# def get_relaxation_tip() -> str:
#     """Get a relaxation tip"""
#     tips = [
#         "Try the 4-7-8 breathing technique: Inhale for 4, hold for 7, exhale for 8.",
#         "Take a 5-minute mindfulness break and focus on your surroundings.",
#         "Listen to calming music or nature sounds for 10 minutes.",
#         "Practice progressive muscle relaxation starting from your toes.",
#         "Step outside and take a few deep breaths of fresh air."
#     ]
#     import random
#     return random.choice(tips)

# def get_tools_for_mood(mood: str) -> List[Tool]:
#     """Get tools appropriate for each mood"""
    
#     # Common tools available to all moods
#     common_tools = [
#         Tool(
#             name="web_search",
#             description="Search the web for current information on any topic",
#             func=web_search
#         ),
#         Tool(
#             name="calculator",
#             description="Calculate mathematical expressions",
#             func=calculate
#         )
#     ]
    
#     # Mood-specific tools
#     mood_specific_tools = {
#         "sad": [
#             Tool(
#                 name="motivational_quote",
#                 description="Get an uplifting motivational quote",
#                 func=get_motivational_quote
#             ),
#             Tool(
#                 name="relaxation_tip",
#                 description="Get a tip for relaxation and self-care",
#                 func=get_relaxation_tip
#             )
#         ],
#         "relaxed": [
#             Tool(
#                 name="relaxation_tip",
#                 description="Get a tip for deeper relaxation and mindfulness",
#                 func=get_relaxation_tip
#             ),
#             Tool(
#                 name="weather",
#                 description="Get weather information for planning relaxing outdoor activities",
#                 func=get_weather
#             )
#         ],
#         "business": [
#             Tool(
#                 name="news_headlines",
#                 description="Get current business and market news headlines",
#                 func=get_news_headlines
#             ),
#             Tool(
#                 name="weather",
#                 description="Get weather information for business planning",
#                 func=get_weather
#             )
#         ],
#         "tech": [
#             Tool(
#                 name="news_headlines",
#                 description="Get current technology and innovation news",
#                 func=get_news_headlines
#             )
#         ],
#         "happy": [
#             Tool(
#                 name="motivational_quote",
#                 description="Get an inspiring quote to maintain positive energy",
#                 func=get_motivational_quote
#             ),
#             Tool(
#                 name="weather",
#                 description="Get weather information for planning fun activities",
#                 func=get_weather
#             )
#         ],
#         "funny": [
#             Tool(
#                 name="joke",
#                 description="Get a random joke to share some laughs",
#                 func=get_joke
#             )
#         ]
#     }
    
#     # Combine common tools with mood-specific tools
#     tools = common_tools.copy()
#     if mood in mood_specific_tools:
#         tools.extend(mood_specific_tools[mood])
    
#     return tools
from langchain_ollama import ChatOllama
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser

from ollama import Client
from langchain_core.language_models.chat_models import BaseChatModel
from langchain_core.messages import BaseMessage, AIMessage
from typing import List

from ollama import Client
from langchain_core.language_models.chat_models import BaseChatModel
from langchain_core.messages import BaseMessage, AIMessage
from typing import List

from pydantic import PrivateAttr
from ollama import Client
from langchain_core.language_models.chat_models import BaseChatModel
from langchain_core.messages import BaseMessage, AIMessage
from typing import List

class CustomOllama(BaseChatModel):
    _client: Client = PrivateAttr()

    def __init__(self, model_name: str = "llama3.2", base_url: str = "http://localhost:11434"):
        super().__init__()
        self._client = Client(host=base_url)
        self.model = model_name

    def _call(self, messages: List[BaseMessage], **kwargs) -> str:
        chat_messages = [{"role": msg.type, "content": msg.content} for msg in messages]
        response = self._client.chat(model=self.model, messages=chat_messages)
        return response["message"]["content"]

    def invoke(self, input: List[BaseMessage], **kwargs) -> AIMessage:
        content = self._call(input, **kwargs)
        return AIMessage(content=content)

    @property
    def _llm_type(self) -> str:
        return "custom_ollama"

    def _generate(self, messages: List[BaseMessage], stop=None, **kwargs):
        content = self._call(messages, stop=stop, **kwargs)
        return self._create_chat_result(content)

# Step 1: Define the system message for the assistant's behavior
system_prompt = SystemMessage(content="You are a helpful and concise assistant.")

# Step 2: Build the prompt template with a human input placeholder
prompt = ChatPromptTemplate.from_messages([
    system_prompt,
    MessagesPlaceholder(variable_name="messages")
])

# Step 3: Define the model instance
llm = CustomOllama(model_name="llama3.2", base_url="http://localhost:11434")



# Step 4: Set up output formatting
output_parser = StrOutputParser()

# Step 5: Chain everything together
chain = prompt | llm | output_parser

# Step 6: Invoke the chain with a human input message
response = chain.invoke({"messages": [HumanMessage(content="What is your name?")]})

# Step 7: Print the formatted response
print(response)

# from ollama import Client

# client = Client(host="http://localhost:11434")
# response = client.chat(model="llama3.2", messages=[{"role": "user", "content": "Hello!"}])
# print(response['message']['content'])