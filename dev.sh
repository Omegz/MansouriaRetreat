#!/bin/bash

# Start the Elysia API server in the background
echo "Starting Elysia API server..."
NODE_ENV=development bun run server/index.ts &
API_PID=$!

# Wait a moment for the API server to start
sleep 2

# Start the Vite dev server
echo "Starting Vite dev server..."
bun run vite --host 0.0.0.0 --port 3000

# Kill the API server when Vite exits
kill $API_PID 2>/dev/null
