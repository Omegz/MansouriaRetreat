# Mansouria Retreat

A modern e-commerce application built with Bun, Elysia, React, and TypeScript, optimized for Vercel deployment.

## Tech Stack

- **Runtime**: Bun
- **Backend**: Elysia (instead of Express)
- **Frontend**: React + TypeScript + Vite
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS + Radix UI
- **Deployment**: Vercel

## Development

### Prerequisites

- [Bun](https://bun.sh/) installed
- PostgreSQL database (or use Neon)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in your database connection string and other required variables.

4. Push database schema:
   ```bash
   bun run db:push
   ```

5. Start development servers:
   ```bash
   bun run dev
   ```
   This will start both the Elysia API server (port 5000) and Vite dev server (port 3000).

### Individual Development Commands

- `bun run dev:api` - Start only the Elysia API server
- `bun run dev:client` - Start only the Vite dev server
- `bun run build` - Build the production client
- `bun run start` - Start production server

## Deployment on Vercel

### Automatic Deployment

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the configuration from `vercel.json`
3. Set environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables

Make sure to set these in your Vercel project:

- `DATABASE_URL` - Your PostgreSQL connection string
- `SENDGRID_API_KEY` - For email functionality (if used)
- Any other custom environment variables

## Project Structure

```
├── api/                 # Vercel serverless functions
│   └── index.ts        # Main API handler
├── client/             # React frontend
│   ├── src/
│   └── index.html
├── server/             # Elysia server code
│   ├── index.ts        # Main server file
│   ├── routes.ts       # API routes
│   └── storage.ts      # Database operations
├── shared/             # Shared types and schemas
└── vercel.json         # Vercel configuration
```

## Key Features

- **Fast Development**: Bun's speed for package management and runtime
- **Type Safety**: Full TypeScript support
- **Modern UI**: Radix UI components with Tailwind CSS
- **Database**: Drizzle ORM with type-safe queries
- **Serverless Ready**: Optimized for Vercel's serverless functions
- **API Proxy**: Vite dev server proxies API calls to Elysia server

## Migration from Express

This project has been migrated from Express to Elysia:

- ✅ Removed Express dependencies
- ✅ Converted middleware to Elysia plugins
- ✅ Updated error handling
- ✅ Configured for Vercel serverless deployment
- ✅ Maintained all existing API functionality
