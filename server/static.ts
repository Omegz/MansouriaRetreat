import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import fs from "fs";
import path from "path";

export function setupStaticServing(app: Elysia) {
  // In production, serve static files from dist/public
  const distPath = path.resolve(process.cwd(), "dist/public");
  
  if (fs.existsSync(distPath)) {
    app.use(staticPlugin({
      assets: distPath,
      prefix: "/",
    }));
  }
  
  return app;
}

export function serveStatic(app: Elysia) {
  const distPath = path.resolve(process.cwd(), "dist/public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(staticPlugin({
    assets: distPath,
    prefix: "/",
  }));

  // Handle SPA routing - serve index.html for non-API routes
  app.get("*", ({ path }) => {
    // Don't intercept API routes
    if (path.startsWith("/api")) {
      return;
    }
    
    // Serve index.html for all other routes
    const indexPath = `${distPath}/index.html`;
    if (fs.existsSync(indexPath)) {
      return Bun.file(indexPath);
    }
    
    return new Response("Not Found", { status: 404 });
  });

  return app;
}
