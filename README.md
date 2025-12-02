# Library Management System

This is a full-stack Library Management System designed to be robust, scalable, and easy to use. It features a modern web interface for both administrators and students, and a powerful backend API to manage the library's resources.

## Overview

The system is built as a monorepo, containing two separate applications:

-   **`client/`**: A frontend application built with [Next.js](https://nextjs.org/) and [React](https://react.dev/). It provides the user interface for all library interactions.
-   **`server/`**: A backend API built with [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/). It handles all business logic, data storage, and authentication.

## Features

*   **User Roles:** Separate interfaces and permissions for Administrators and Students.
*   **Book Management:** Admins can add, update, and remove books, authors, and categories.
*   **Book Borrowing:** Students can browse, request, and borrow books.
*   **Transaction Tracking:** All book issuance and returns are tracked.
*   **Authentication:** Secure user login and registration with JWT-based authentication.

## Tech Stack

### Core Technologies
-   **Frontend:** React, Next.js, TypeScript
-   **Backend:** Node.js, Express.js, TypeScript
-   **Database:** PostgreSQL

### Key Libraries
-   **Frontend:** Tailwind CSS, Shadcn/ui, Axios, Zod, React Hook Form
-   **Backend:** pg, jsonwebtoken, bcrypt, cors, dotenv

## Getting Started

To run the entire system locally, you will need to set up and run both the server and the client applications.

### Prerequisites

*   Node.js (v20.x or later recommended)
*   npm (v10.x or later)
*   PostgreSQL running on your machine

### 1. Server Setup (Backend)

The server connects to the database and exposes the API for the client.

```bash
cd server
npm install
```

-   **Database:**
    1.  Create a new PostgreSQL database.
    2.  Run the SQL scripts in `server/src/schema/` to create the necessary tables (`library.sql`, `users.sql`).
-   **Environment:**
    1.  Create a `.env` file in the `server/` directory by copying `.env.example`.
    2.  Fill in the database connection details (`PG_...` variables) and a `JWT_SECRET`.
-   **Run:**
    ```bash
    npm run dev
    ```
The API server will start on the port specified in your `.env` file (e.g., `http://localhost:3001`).

### 2. Client Setup (Frontend)

The client provides the web interface for users.

```bash
cd client
npm install
```

-   **Run:**
    ```bash
    npm run dev
    ```
The client application will be available at `http://localhost:3000`. It is configured to connect to the API server.

## Project Structure

```
.
├── client/         # Next.js Frontend
│   ├── app/
│   ├── components/
│   └── lib/
└── server/         # Express.js Backend
    ├── src/
    │   ├── routes/
    │   ├── middleware/
    │   └── schema/
    └── .env.example
```