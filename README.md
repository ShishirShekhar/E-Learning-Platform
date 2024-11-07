# E Learning Platform

This project is an authentication service for the AI Tutor platform, developed with Node.js, Express, TypeScript, and MongoDB. It supports user registration, login, and logout, with role-based access for `student`, `instructor`, and `admin` users. Swagger documentation is integrated for clear API usage and maintenance.

## Table of Contents

- [E Learning Platform](#e-learning-platform)
  - [Table of Contents](#table-of-contents)
  - [Project Setup](#project-setup)
  - [Environment Variables](#environment-variables)
  - [Endpoints](#endpoints)
    - [User Signup](#user-signup)
    - [User Login](#user-login)
    - [User Logout](#user-logout)
  - [Technologies Used](#technologies-used)
  - [Swagger API Documentation](#swagger-api-documentation)
  - [Error Handling](#error-handling)
  - [Folder Structure](#folder-structure)
  - [Future Improvements](#future-improvements)

## Project Setup

To run this project locally:

1. **Clone the repository**

   ```bash
   git clone https: //github.com/username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables** (see [Environment Variables](#environment-variables))

4. **Start the server**

   ```bash
   npm start
   ```

## Environment Variables

Ensure you have a `.env` file in the root directory with the following variables:

```plaintext
PORT=3000                    # Port to run the server
MONGODB_URI=your_mongodb_uri # MongoDB connection URI
ACCESS_TOKEN_SECRET=your_secret_key # JWT secret for token generation
```

## Endpoints

### User Signup

- **Path**: `/api/v1/auth/signup`
- **Method**: `POST`
- **Description**: Registers a new user with roles including `student`, `instructor`, and `admin`.
- **Request Body**:

  ```json
  {
    "name": "Shishir",
    "email": "sspdav02@gmail.com",
    "password": "Shishir#1976",
    "role": "student"
  }
  ```

- **Response**: On success, returns user data and sets a JWT in a `httpOnly` cookie.
- **Swagger Tag**: `Auth`

### User Login

- **Path**: `/api/v1/auth/login`
- **Method**: `POST`
- **Description**: Logs in an existing user.
- **Request Body**:

  ```json
  {
    "email": "sspdav02@gmail.com",
    "password": "Shishir#1976"
  }
  ```

- **Response**: On success, returns user data and sets a JWT in a `httpOnly` cookie.
- **Swagger Tag**: `Auth`

### User Logout

- **Path**: `/api/v1/auth/logout`
- **Method**: `POST`
- **Description**: Logs out the current user by clearing the `accessToken` cookie.
- **Response**: Status 204 on success (No Content).
- **Swagger Tag**: `Auth`

## Technologies Used

- **Node.js** and **Express**: Backend server and routing.
- **TypeScript**: Type safety and better development experience.
- **MongoDB**: Database for user data.
- **JWT (jsonwebtoken)**: Secure user authentication.
- **bcryptjs**: Secure password hashing.
- **Swagger**: API documentation for easy testing and understanding.
- **dotenv**: Manage environment variables.

## Swagger API Documentation

Swagger is used to document and test API endpoints. To access the Swagger documentation:

1. Run the server.
2. Visit `http: //localhost:3000/api-docs` (or the configured `PORT`).

Each endpoint includes:

- **Parameters** (with schema and validation).
- **Responses** (structured for consistent error handling).

## Error Handling

- **400 Bad Request**: For missing required fields or invalid input.
- **401 Unauthorized**: For incorrect password during login.
- **404 Not Found**: For non-existent resources, such as a missing user.
- **500 Internal Server Error**: For unexpected server errors.

Each error is logged to the console and returned with a JSON structure:

```json
{
  "data": null,
  "error": "Error message"
}
```

## Folder Structure

The main structure includes:

```plaintext
.
├── controllers
│   └── authController.ts      # Contains authentication logic
├── models
│   └── UserModel.ts           # User schema definition
├── routes
│   └── authRoutes.ts          # Routes for authentication
├── config
│   └── swagger.ts             # Swagger setup and configuration
├── middleware
│   └── errorHandler.ts        # General error handling middleware
├── .env                       # Environment variables
├── package.json
└── README.md
```

## Future Improvements

- **Refresh Token Implementation**: Add support for refresh tokens for enhanced security.
- **Role-based Access Control (RBAC)**: Restrict certain routes based on user roles (`student`, `instructor`, `admin`).
- **Automated Tests**: Write unit tests for each endpoint to improve reliability.

---

**Created by Shishir Shekhar** - Software Developer
