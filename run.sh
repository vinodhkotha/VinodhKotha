#!/bin/bash

# Simple script to open the Todo List app in a browser

echo "Opening Todo List App..."
echo "Location: /home/user/VinodhKotha/index.html"
echo ""

# Try different browsers in order of preference
if command -v xdg-open &> /dev/null; then
    xdg-open index.html
elif command -v google-chrome &> /dev/null; then
    google-chrome index.html
elif command -v firefox &> /dev/null; then
    firefox index.html
elif command -v chromium &> /dev/null; then
    chromium index.html
else
    echo "No browser found! Please open index.html manually."
    echo "File path: file:///home/user/VinodhKotha/index.html"
fi
