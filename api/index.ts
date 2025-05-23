import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { registerRoutes } from "../server/routes";

// Create the Elysia app for Vercel serverless functions
const app = new Elysia()
  .use(cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
  }))
  .onError(({ error, code }) => {
    console.error("API error:", error);
    
    if (code === 'NOT_FOUND') {
      return new Response(
        JSON.stringify({ message: 'Not found' }), 
        { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    const status = (error as any).status || 500;
    const message = error.message || "Internal Server Error";
    
    return new Response(
      JSON.stringify({ message }), 
      { 
        status,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  });

// Register all routes
registerRoutes(app);

// Export default handler for Vercel
export default function handler(req: Request) {
  return app.handle(req);
}
