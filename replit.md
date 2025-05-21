# Mansouria Retreat Farm Shop

## Overview
This project is a full-stack web application for Mansouria Retreat, a farm that sells organic products online. It features a product catalog, shopping cart, checkout system, contact form, and admin interface for managing products.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture
The application follows a modern full-stack JavaScript architecture with distinct client and server components:

1. **Frontend**: React-based SPA with component-based architecture, using the ShadCN UI component library (built on Radix UI) and TailwindCSS for styling.

2. **Backend**: Express.js server providing RESTful API endpoints, handling user authentication, product management, contact submissions, and order processing.

3. **Database**: Uses Drizzle ORM with a PostgreSQL database (provisioned through Replit). The database schema is defined in shared code that both frontend and backend can access.

4. **State Management**: Combination of React Context for global state (cart, products) and React Query for data fetching/caching.

The application is designed to be deployed to Replit, with development and production environments configured appropriately.

## Key Components

### Frontend
- **Client Application**: React SPA built with Vite
- **Routing**: Uses Wouter for lightweight client-side routing
- **UI Components**: Leverages ShadCN UI (based on Radix UI primitives)
- **Styling**: TailwindCSS with custom theme configuration
- **Data Fetching**: TanStack Query (React Query) for API interactions and caching
- **Form Handling**: React Hook Form with Zod for validation
- **State Management**: React Context for cart and products state

### Backend
- **Server**: Express.js with proper middleware configuration
- **API Routes**: RESTful endpoints for products, orders, and contact messages
- **Data Access**: Drizzle ORM for database interactions
- **Validation**: Zod schemas shared between frontend and backend
- **Session Management**: Prepared for session-based authentication

### Database
- **ORM**: Drizzle ORM with PostgreSQL
- **Schema**: Defined in shared code for type safety across frontend and backend
- **Tables**: Users, Products, Orders, Contact Messages

## Data Flow

1. **Product Browsing**:
   - Frontend fetches products via React Query
   - Products rendered in catalog with filtering by category
   - User can add products to cart (stored in Context and localStorage)

2. **Checkout Process**:
   - Cart items stored in CartContext
   - Checkout form collects customer information
   - Order submitted to backend via API
   - Confirmation displayed to user

3. **Admin Operations**:
   - Admin page for product management
   - CRUD operations for products via API endpoints
   - Form validation using Zod schemas

4. **Contact Form**:
   - Collects user inquiries
   - Submits to backend API
   - Success/failure feedback to user

## External Dependencies

### Frontend
- **UI Library**: Radix UI components (via ShadCN UI)
- **Form Management**: React Hook Form with Zod validation
- **Data Fetching**: TanStack Query
- **Routing**: Wouter
- **Icons**: Lucide React

### Backend
- **Database**: PostgreSQL via Drizzle ORM
- **API**: Express.js
- **Validation**: Zod
- **Session**: Session management capabilities

## Deployment Strategy

The application is configured for deployment on Replit with:

1. **Development Mode**:
   - `npm run dev` starts both frontend and backend in development mode
   - Vite handles hot module replacement and serves frontend assets
   - Express API operates on the same port with API routes prefixed with `/api`

2. **Production Build**:
   - Frontend built as static assets with `vite build`
   - Backend bundled with esbuild
   - Express serves static assets from the build directory

3. **Database**:
   - Relies on Replit's PostgreSQL database
   - Database URL provided via environment variable
   - Schema migrations through Drizzle Kit

4. **Environment Variables**:
   - `DATABASE_URL`: Connection string for PostgreSQL database
   - `NODE_ENV`: Controls development/production mode

The application is designed to work as a full-stack application within a single Replit instance, simplifying deployment and development.