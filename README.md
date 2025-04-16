# MERN Blogging App

## Overview
This is a full-stack MERN (MongoDB, Express, React, Node.js) blogging application that allows users to register, login, create, edit, and delete blog posts. The app features user authentication with JWT, input validation, and a clean separation of concerns between frontend and backend.

## Features
- User registration and login with JWT authentication
- Password hashing and secure authentication
- Create, read, update, and delete (CRUD) operations for blog posts
- Protected routes requiring authentication
- Input validation on both frontend and backend
- API documentation with Swagger
- Logging middleware for request tracking
- Responsive React frontend with routing and context-based authentication state
- Unit and integration tests for backend APIs

## Folder Structure

### Backend (`be/`)
- `Controllers/`: Contains controller logic for handling requests and responses.
- `Middlewares/`: Express middleware for authentication, validation, and logging.
- `models/`: Mongoose schemas for User and Post.
- `routes/`: Express route definitions for authentication and posts.
- `services/`: Business logic for users and posts.
- `config/`: Configuration files including Swagger setup.
- `test/`: Backend API tests using Jest and Supertest.
- `server.js`: Entry point for the backend server.

### Frontend (`fe/`)
- `src/components/`: React components for UI including Login, Register, CreatePost, ManagePosts, etc.
- `src/context/`: React context for managing authentication state.
- `src/Routes.js`: React Router setup for frontend routes.
- `public/`: Static assets and HTML template.
- `package.json`: Frontend dependencies and scripts.

## Getting Started

### Backend
1. Navigate to the `be` folder.
2. Install dependencies: `npm install`
3. Set environment variables in a `.env` file (e.g., `MONGO_URI`, `JWT_SECRET`, `MONGO_DB_NAME`).
4. Start the server: `node server.js`

### Frontend
1. Navigate to the `fe` folder.
2. Install dependencies: `npm install`
3. Start the React app: `npm start`

## API Documentation
The backend provides Swagger API documentation accessible at: `http://localhost:5000/api/docs`

## Testing
Backend tests are located in `be/test/` and can be run using Jest.

---

If you need any assistance or further enhancements, feel free to ask.
