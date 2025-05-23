import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { html } from "@elysiajs/html";
import { registerRoutes } from "./routes";
import { log } from "./vite";
import { seedDatabase } from "./seed";
import { serveStatic } from "./static";

const app = new Elysia()
  .use(cors())
  .onRequest(({ request }) => {
    const start = Date.now();
    const path = new URL(request.url).pathname;
    
    // Store start time for logging
    (request as any).startTime = start;
    (request as any).logPath = path;
  })
  .onAfterResponse(({ request, response }) => {
    const start = (request as any).startTime;
    const path = (request as any).logPath;
    
    if (start && path) {
      const duration = Date.now() - start;
      if (path.startsWith("/api")) {
        let logLine = `${request.method} ${path} ${response.status} in ${duration}ms`;
        
        if (logLine.length > 80) {
          logLine = logLine.slice(0, 79) + "…";
        }
        
        log(logLine);
      }
    }
  })
  .onError(({ error, code }) => {
    console.error("Server error:", error);
    
    if (code === 'NOT_FOUND') {
      return { message: 'Not found' };
    }
    
    const status = (error as any).status || 500;
    const message = error.message || "Internal Server Error";
    
    return { message };
  });

(async () => {
  // Seed the database with initial products
  try {
    await seedDatabase();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
  
  // Register API routes
  registerRoutes(app);

  // For development, we still need to handle Vite integration
  // For production, we'll serve static files
  if (process.env.NODE_ENV === "development") {
    // Development mode - use Vite dev server externally
    // Just start the API server
    await app.listen({
      port: 5000,
      hostname: "0.0.0.0",
    });
    
    log("API server running on port 5000");
  } else {
    // In production, serve static files
    serveStatic(app);
    
    await app.listen({
      port: process.env.PORT ? parseInt(process.env.PORT) : 5000,
      hostname: "0.0.0.0",
    });
    
    log(`Production server running on port ${process.env.PORT || 5000}`);
  }
})();
