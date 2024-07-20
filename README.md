# Library Management System

This is a Library Management System built using the MERN stack (MongoDB, Express.js, React, Node.js). This application allows users to manage library books and track the borrowing and returning of books. It includes user authentication using JWT and a responsive UI built with Material UI.

## Features

- User authentication with JWT
- Basic book management (add, edit, delete)
- Borrowing and returning books functionality
- Responsive UI using Material UI

## Installation

### Backend

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/library-management-system.git
   cd library-management-system/backend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   Create a \`.env\` file in the \`backend\` directory and add the following variables:
   \`\`\`
   MONGO_URI=<Your MongoDB URI>
   JWT_SECRET=<Your JWT Secret>
   \`\`\`

4. Start the backend server:
   \`\`\`bash
   npm start
   \`\`\`

### Frontend

1. Navigate to the \`frontend\` directory:
   \`\`\`bash
   cd ../frontend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   Create a \`.env\` file in the \`frontend\` directory and add the following variable:
   \`\`\`
   REACT_APP_API_URL=http://localhost:5000/api
   \`\`\`

4. Start the frontend server:
   \`\`\`bash
   npm start
   \`\`\`

## Usage

1. Register a new user.
2. Login with the registered user credentials.
3. Manage books (add, edit, delete) using the provided interface.
4. Borrow and return books.

## API Endpoints

### User Endpoints

- **POST /api/users/register** - Register a new user
- **POST /api/users/login** - Login a user
- **GET /api/users/verify** - Verify user token

### Book Endpoints

- **GET /api/books** - Get all books
- **POST /api/books** - Add a new book
- **PUT /api/books/:id** - Update a book
- **DELETE /api/books/:id** - Delete a book

## Code Structure

### Backend

- \`server.js\` - Entry point for the backend server
- \`controllers/\` - Contains the logic for handling requests
- \`models/\` - Contains Mongoose models
- \`routes/\` - Defines API routes
- \`middleware/\` - Contains middleware functions for authentication and error handling

### Frontend

- \`src/\`
  - \`components/\` - Contains React components
  - \`contexts/\` - Contains context providers for state management
  - \`pages/\` - Contains page components
  - \`App.js\` - Main application component
  - \`index.js\` - Entry point for the React application

## Error Handling

The application includes a global error handler for the backend to catch and manage errors gracefully without crashing the server.

## Live Demo

If possible, provide a link to a live demo of your deployed application.