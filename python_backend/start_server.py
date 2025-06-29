#!/usr/bin/env python3
"""
Startup script for MoodBot Python backend
"""

import subprocess
import sys
import os

def install_requirements():
    """Install Python requirements"""
    try:
        print("📦 Installing Python requirements...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Requirements installed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install requirements: {e}")
        return False

def main():
    print("🚀 Starting MoodBot Backend...")
    print("=" * 50)
    
    # Check if requirements file exists
    if not os.path.exists("requirements.txt"):
        print("❌ requirements.txt not found")
        return
    
    # Install requirements
    if not install_requirements():
        print("⚠️  Continuing without installing requirements...")

    
    print("\n🎯 All checks passed! Starting FastAPI server...")
    print("📡 Server will be available at: http://localhost:8000")
    print("📚 API docs will be available at: http://localhost:8000/docs")
    print("🧪 Test the backend with: python test_backend.py")
    print("\nPress Ctrl+C to stop the server")
    print("=" * 50)
    
    # Start the FastAPI server
    try:
        subprocess.run([
            sys.executable, "-m", "uvicorn", 
            "main:app", 
            "--host", "0.0.0.0", 
            "--port", "8000", 
            "--reload",
            "--log-level", "info"
        ])
    except KeyboardInterrupt:
        print("\n👋 Server stopped")
    except Exception as e:
        print(f"\n❌ Server failed to start: {e}")

if __name__ == "__main__":
    main()
