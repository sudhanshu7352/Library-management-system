# Library Management System

This is a Library Management System built using the MERN stack (MongoDB, Express.js, React, Node.js). This application allows users to manage library books and track the borrowing and returning of books. It includes user authentication using JWT and a responsive UI built with Material UI.

### Live Demo Link :
https://library-management-system-ffxyphv6h-sudhanshu7352s-projects.vercel.app/login

### Application snapshots :
Login Page
![image](https://github.com/user-attachments/assets/9dc95446-f278-4d86-a02d-d134b85c472f)
Register page
![image](https://github.com/user-attachments/assets/a69c7b7c-ebde-4e2e-b758-05af638db516)
Book List page
![image](https://github.com/user-attachments/assets/e3a4ba7b-b5c1-4b62-b576-901cff5679f0)


## Features

- User authentication with JWT
- Basic book management (add, edit, delete)
- Borrowing and returning books functionality
- Responsive UI using Material UI

## Installation

### Backend

1. Clone the repository:
   ```sh
   git clone https:/github.com/sudhanshu7352/library-management-system.git
   cd library-management-system/backend
   ```

2. Install dependencies:
   ```sh
    npm install
    ```

3. Set up environment variables:
   Create a `.env` file in the `backend` directory and add the following variables:
  ```env
   PORT =5000
   MONGO_URI=<Your MongoDB URI>
   JWT_SECRET=<Your JWT Secret>
   ```

4. Start the backend server:
  ```sh
   npm start
   ```

### Frontend

1. Navigate to the `frontend` directory:
   ```sh
   cd ../frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `frontend` directory and add the following variable:
   ```sh
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the frontend server:
   ```sh
   npm start
   ```

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

- `server.js` - Entry point for the backend server
- `controllers` - Contains the logic for handling requests
- `models` - Contains Mongoose models
- `routes` - Defines API routes
- `middleware` - Contains middleware functions for authentication and error handling

### Frontend

- `src`
  - `components` - Contains React components
  - `contexts` - Contains context providers for state management
  - `pages` - Contains page components
  - `App.js` - Main application component
  - `index.js` - Entry point for the React application

## Error Handling

The application includes a global error handler for the backend to catch and manage errors gracefully without crashing the server.

## Live Demo

(https://library-management-system-ffxyphv6h-sudhanshu7352s-projects.vercel.app/login)
