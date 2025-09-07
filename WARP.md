# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a React + Express.js application demonstrating Supabase OAuth authentication with Google. The project consists of:

- **Frontend**: React 19 app (Create React App) with Supabase authentication
- **Backend**: Express.js server serving the built React app and API endpoints
- **Database**: Supabase (PostgreSQL) for user authentication
- **Deployment**: Containerized with Docker for cloud deployment

## Architecture

```
├── backend/
│   ├── index.js          # Express server with static serving & API routes
│   └── package.json      # Backend dependencies (express, cors, supabase)
├── frontend/
│   ├── src/
│   │   ├── App.js        # Main React app with routing
│   │   ├── supabaseClient.js  # Supabase client configuration with fallbacks
│   │   └── components/
│   │       ├── Auth.js   # OAuth login/logout component
│   │       └── AuthCallback.js  # OAuth callback handler
│   └── package.json      # Frontend dependencies (react, supabase-js, etc.)
├── Dockerfile            # Multi-stage build container
└── package.json          # Root-level build/dev scripts
```

The Express server serves the built React application as static files and provides API endpoints. The React app handles OAuth flow with Supabase, including Google authentication.

## Development Commands

### Quick Start
```bash
# Install all dependencies (root, backend, frontend)
npm run build

# Start backend in development mode with nodemon
npm run dev

# Start frontend development server (separate terminal)
cd frontend && npm start
```

### Individual Component Commands
```bash
# Backend development
cd backend && npm run dev          # Start with nodemon
cd backend && npm start            # Start production mode

# Frontend development  
cd frontend && npm start           # Development server on port 3000
cd frontend && npm run build       # Production build
cd frontend && npm test            # Run React tests

# Production build and serve
npm run build                      # Build frontend
npm start                         # Serve via Express on port 8080
```

### Testing
```bash
cd frontend && npm test            # React component tests
cd frontend && npm test -- --coverage  # With coverage report
```

## Environment Configuration

The application requires Supabase environment variables for authentication:

### Frontend (.env in frontend/)
```
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_SITE_URL=your_production_site_url
```

### Docker Build Arguments
```bash
docker build \
  --build-arg REACT_APP_SUPABASE_URL=your_url \
  --build-arg REACT_APP_SUPABASE_ANON_KEY=your_key \
  --build-arg REACT_APP_SITE_URL=your_site_url \
  -t again .
```

## Key Implementation Details

### Supabase Client (supabaseClient.js)
- Includes fallback mock client when environment variables are missing
- Prevents app crashes during development without proper Supabase configuration
- All auth methods return appropriate promises or mock responses

### Express Server (backend/index.js)
- Serves React build as static files
- Includes debug endpoints: `/api/debug/env` and `/files` for container inspection
- Health check endpoint: `/api/health`
- Binds to `0.0.0.0:8080` for container compatibility
- Catch-all route returns React's index.html for client-side routing

### OAuth Flow
- Google OAuth via Supabase Auth
- Redirect to `/auth/callback` after authentication
- Session state managed in React with `useEffect` hooks
- Auth state changes automatically update UI (login/logout button)

## Docker Deployment

The Dockerfile:
- Uses Node 18 Alpine for small image size  
- Accepts build-time environment variables for React
- Installs dependencies for all components
- Builds React app with embedded environment variables
- Exposes port 8080
- Single-stage build serving both frontend and backend

## Debug Features

The application includes several debugging aids:
- Environment variable display in React UI
- `/api/debug/env` endpoint to inspect .env file content
- `/files` endpoint for browsing container filesystem
- Console logging of Supabase client creation status
- Build path validation in Express server

## Common Issues

- **Missing environment variables**: App includes fallback mock client to prevent crashes
- **OAuth redirect issues**: Ensure `REACT_APP_SITE_URL` matches your deployment domain
- **Build not found**: Run `npm run build` before starting Express server in production
- **Port conflicts**: Frontend dev server uses 3000, backend uses 8080
