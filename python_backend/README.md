# MoodBot Python Backend

This is the Python backend for MoodBot that handles LLM and agent logic using LangChain and Ollama.

## Prerequisites

1. **Python 3.8+** installed on your system
2. **Ollama** installed and running locally
3. **Llama2 model** pulled in Ollama

## Setup Instructions

### 1. Install Ollama

Visit [https://ollama.ai](https://ollama.ai) and follow the installation instructions for your operating system.

### 2. Start Ollama Service

```bash
ollama serve
```

### 3. Pull the Llama2 Model

```bash
ollama pull llama2
```

### 4. Install Python Dependencies

Navigate to the `python_backend` directory and run:

```bash
pip install -r requirements.txt
```

### 5. Start the Backend Server

You can start the server using the startup script:

```bash
python start_server.py
```

Or manually with uvicorn:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## API Endpoints

- `GET /` - Health check
- `GET /health` - Detailed health status
- `POST /chat` - Process chat messages
- `GET /moods` - Get available moods
- `GET /docs` - FastAPI documentation

## Architecture

### Files Overview

- `main.py` - FastAPI application with API endpoints
- `agents.py` - LangChain agents with mood-specific personalities
- `tools.py` - Tools available to agents (web search, calculator, etc.)
- `requirements.txt` - Python dependencies
- `start_server.py` - Startup script with health checks

### Agent System

Each mood has a specialized agent with:
- **Custom system prompt** - Defines personality and behavior
- **Specific tools** - Relevant tools for that mood context
- **LangChain integration** - Uses ReAct pattern for reasoning

### Available Moods

1. **Sad** - Compassionate and empathetic support
2. **Relaxed** - Calm and peaceful interactions
3. **Business** - Professional and efficient assistance
4. **Tech** - Technical and knowledgeable guidance
5. **Happy** - Enthusiastic and upbeat conversations
6. **Funny** - Witty and humorous interactions

### Tools Available

**Common Tools (all moods):**
- Web search (DuckDuckGo)
- Calculator

**Mood-specific Tools:**
- **Sad/Happy**: Motivational quotes
- **Sad/Relaxed**: Relaxation tips
- **Business/Tech**: News headlines
- **Relaxed/Business/Happy**: Weather information
- **Funny**: Random jokes

## Configuration

### Environment Variables

You can set these in your environment or create a `.env` file:

```bash
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama2
FASTAPI_HOST=0.0.0.0
FASTAPI_PORT=8000
```

### Model Configuration

By default, the system uses `llama2`. You can modify the model in `agents.py`:

```python
self.llm = OllamaLLM(model="llama2", base_url="http://localhost:11434")
```

## Troubleshooting

### Common Issues

1. **"Connection refused" error**
   - Make sure Ollama is running: `ollama serve`
   - Check if port 11434 is accessible

2. **"Model not found" error**
   - Pull the model: `ollama pull llama2`
   - Verify with: `ollama list`

3. **Import errors**
   - Install requirements: `pip install -r requirements.txt`
   - Check Python version (3.8+ required)

4. **CORS errors**
   - The backend is configured for localhost:3000 and the Tempo URL
   - Modify CORS settings in `main.py` if needed

### Logs and Debugging

The FastAPI server runs with `--reload` flag for development. Check the console output for detailed error messages and agent reasoning steps.

## Development

### Adding New Tools

1. Create the tool function in `tools.py`
2. Add it to the appropriate mood in `get_tools_for_mood()`
3. Restart the server

### Modifying Agent Personalities

1. Edit the system prompts in `agents.py`
2. Modify the `_get_system_prompt()` method
3. Restart the server

### Testing

You can test the API directly:

```bash
curl -X POST "http://localhost:8000/chat" \
     -H "Content-Type: application/json" \
     -d '{"message": "Hello!", "mood": "happy"}'
```

Or visit `http://localhost:8000/docs` for interactive API documentation.
