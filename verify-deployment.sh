#!/bin/bash

echo "🚀 Vercel Deployment Verification Checklist"
echo "=========================================="

# Check if vercel.json exists
if [ -f "vercel.json" ]; then
    echo "✅ vercel.json exists"
else
    echo "❌ vercel.json missing"
    exit 1
fi

# Check if API directory exists
if [ -d "api" ]; then
    echo "✅ API directory exists"
else
    echo "❌ API directory missing"
    exit 1
fi

# Check if main API handler exists
if [ -f "api/index.ts" ]; then
    echo "✅ API handler exists"
else
    echo "❌ API handler missing"
    exit 1
fi

# Test build
echo "🔨 Testing build process..."
if bun run build > /dev/null 2>&1; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

# Check if build output exists
if [ -d "dist/public" ]; then
    echo "✅ Build output exists"
else
    echo "❌ Build output missing"
    exit 1
fi

# Check for required files in build
if [ -f "dist/public/index.html" ]; then
    echo "✅ Built index.html exists"
else
    echo "❌ Built index.html missing"
    exit 1
fi

echo ""
echo "🎉 All checks passed! Your project is ready for Vercel deployment."
echo ""
echo "Next steps:"
echo "1. Push your code to GitHub"
echo "2. Connect your repository to Vercel"
echo "3. Add environment variables in Vercel dashboard"
echo "4. Deploy!"
echo ""
echo "Environment variables to set in Vercel:"
echo "- DATABASE_URL"
echo "- Any other custom environment variables"
