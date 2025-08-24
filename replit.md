# Overview

This is a premium membership area web application for "Cardápio da Nutri" (Nutri's Menu), designed to deliver digital products in PDF format. The application provides access to a complete menu with 200 breakfast recipes, exclusive bonuses, and personalized support. It features a minimalist design with mobile-first responsive layout, authentication system, and an organized dashboard with modular content delivery.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system using CSS variables
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Context for authentication state, TanStack Query for server state
- **Typography**: Poppins font from Google Fonts for consistent branding

## Authentication System
- **Implementation**: Custom authentication context with fake login simulation
- **Flow**: Simple email/password form that redirects to dashboard after 2-second delay
- **State**: Boolean authentication state managed via React Context
- **Protection**: Route-level authentication guards that redirect unauthenticated users to login

## Component Architecture
- **Design System**: Consistent glassmorphism effects and gradient backgrounds
- **Modal System**: Custom modal components for PDF preview and content access
- **Toast Notifications**: Custom toast system for user feedback
- **Responsive Design**: Mobile-first approach with collapsible navigation

## Data Structure
- **User Schema**: Basic user model with ID, username, and password using Drizzle ORM
- **Storage Interface**: Abstracted storage layer supporting both in-memory and database implementations
- **Content Organization**: Modular content structure for main menu, bonuses, and support materials

## Backend Architecture
- **Server**: Express.js with TypeScript
- **Database ORM**: Drizzle with PostgreSQL dialect configuration
- **Development**: Hot module replacement via Vite integration
- **API Structure**: RESTful API foundation with `/api` prefix routing
- **Error Handling**: Centralized error middleware with proper HTTP status codes

## External Dependencies

- **Database**: PostgreSQL via Neon Database serverless driver
- **UI Framework**: Radix UI primitives for accessible component foundation
- **Styling**: Tailwind CSS with PostCSS for processing
- **Typography**: Google Fonts (Poppins family)
- **Development Tools**: 
  - ESBuild for server bundling
  - Vite for frontend development and build
  - TypeScript for type safety
  - Replit integration for development environment
- **Form Handling**: React Hook Form with Zod validation schemas
- **Database Migrations**: Drizzle Kit for schema management