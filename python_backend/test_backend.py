#!/usr/bin/env python3
"""
Test script for MoodBot backend
"""

import requests
import json
import sys

def test_health_endpoint():
    """Test the health endpoint"""
    try:
        response = requests.get("http://localhost:8000/health", timeout=5)
        if response.status_code == 200:
            print("✅ Health endpoint working")
            return True
        else:
            print(f"❌ Health endpoint returned status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health endpoint failed: {e}")
        return False

def test_chat_endpoint():
    """Test the chat endpoint with a simple message"""
    try:
        payload = {
            "message": "Hello, how are you?",
            "mood": "happy"
        }
        
        response = requests.post(
            "http://localhost:8000/chat",
            json=payload,
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Chat endpoint working")
            print(f"Response: {data.get('content', 'No content')[:100]}...")
            if data.get('toolUse'):
                print(f"Tool used: {data['toolUse']['toolName']}")
            return True
        else:
            print(f"❌ Chat endpoint returned status {response.status_code}")
            print(f"Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Chat endpoint failed: {e}")
        return False

def test_moods_endpoint():
    """Test the moods endpoint"""
    try:
        response = requests.get("http://localhost:8000/moods", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print("✅ Moods endpoint working")
            print(f"Available moods: {len(data.get('moods', []))}")
            return True
        else:
            print(f"❌ Moods endpoint returned status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Moods endpoint failed: {e}")
        return False

def main():
    print("🧪 Testing MoodBot Backend...")
    print("=" * 50)
    
    tests = [
        ("Health Check", test_health_endpoint),
        ("Moods Endpoint", test_moods_endpoint),
        ("Chat Endpoint", test_chat_endpoint)
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        print(f"\n🔍 Testing {test_name}...")
        if test_func():
            passed += 1
        else:
            print(f"❌ {test_name} failed")
    
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Backend is working correctly.")
        return 0
    else:
        print("⚠️  Some tests failed. Please check the backend setup.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
