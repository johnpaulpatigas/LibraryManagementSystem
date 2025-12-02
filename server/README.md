# Backend Server

This directory contains the backend server for the Library Management System. It's a Node.js application built with Express.js and TypeScript, responsible for handling business logic, data persistence, and providing a RESTful API for the client application.

## Tech Stack

-   **Framework:** [Express.js](https://expressjs.com/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Database:** [PostgreSQL](https://www.postgresql.org/)
-   **Database Driver:** [node-postgres (pg)](https://node-postgres.com/)
-   **Authentication:** [JSON Web Tokens (JWT)](https://jwt.io/)
-   **Password Hashing:** [bcrypt](https://www.npmjs.com/package/bcrypt)
-   **Environment Variables:** [dotenv](https://www.npmjs.com/package/dotenv)
-   **CORS:** [cors](https://www.npmjs.com/package/cors)
-   **Development:** [Nodemon](https://nodemon.io/) for live reloading

## Getting Started

### Prerequisites

-   Node.js (v20.x or later)
-   npm
-   A running PostgreSQL instance

### 1. Installation

Install the project dependencies:
```bash
npm install
```

### 2. Database Setup

1.  Connect to your PostgreSQL server and create a new database.
2.  Execute the SQL files in the `src/schema/` directory to set up the required tables and relationships.
    -   `users.sql`: Defines the `users` table for authentication and user information.
    -   `library.sql`: Defines tables for `books`, `authors`, `categories`, `issued_books`, and `book_requests`.

### 3. Environment Configuration

1.  Create a `.env` file in the `server/` directory. You can copy the example file:
    ```bash
    cp .env.example .env
    ```
2.  Edit the `.env` file with your specific configuration:
    -   `PORT`: The port on which the server will run (e.g., 3001).
    -   `PG_USER`: Your PostgreSQL username.
    -   `PG_HOST`: Your PostgreSQL host (e.g., `localhost`).
    -   `PG_DATABASE`: The name of the database you created.
    -   `PG_PASSWORD`: Your PostgreSQL password.
    -   `PG_PORT`: The port your PostgreSQL server is running on (e.g., 5432).
    -   `JWT_SECRET`: A long, random, and secret string used for signing authentication tokens.

### 4. Running the Application

-   **For development:**
    ```bash
    npm run dev
    ```
    This command uses `nodemon` and `ts-node` to automatically restart the server on file changes.

-   **For production:**
    ```bash
    npm run build
    npm start
    ```
    This first compiles the TypeScript code into JavaScript (`dist/` directory) and then runs the compiled code.

## API Endpoints

The API is versioned and structured under the `/api` prefix.

-   `POST /api/auth/login`: Authenticate a user and receive a JWT.
-   `GET /api/users`: Get a list of users (Admin only).
-   `POST /api/users`: Create a new user.
-   `GET /api/books`: Get a list of all books.
-   `GET /api/books/:id`: Get details for a single book.
-   `POST /api/books`: Add a new book (Admin only).
-   `...and more` (see `src/routes/` for a full list).

## Project Structure

```
server/
├── src/
│   ├── index.ts          # Main application entry point
│   ├── middleware/       # Express middleware (auth, admin checks)
│   │   ├── adminMiddleware.ts
│   │   └── authMiddleware.ts
│   ├── routes/           # API route definitions
│   │   ├── auth.ts
│   │   ├── books.ts
│   │   └── ...
│   ├── schema/           # Database schema files
│   │   ├── library.sql
│   │   └── users.sql
│   └── types/            # TypeScript type definitions
│       └── express.d.ts
├── .env.example          # Example environment file
├── package.json
└── tsconfig.json
```