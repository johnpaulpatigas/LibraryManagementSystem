# Client Application

This is the frontend of the Library Management System, a modern web application built with Next.js and React. It provides a rich, interactive user interface for both library administrators and students.

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (using the App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **UI Library:** [React](https://react.dev/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** [Shadcn/ui](https://ui.shadcn.com/) - A collection of beautifully designed, accessible components.
-   **Form Management:** [React Hook Form](https://react-hook-form.com/) for performant and flexible forms.
-   **Schema Validation:** [Zod](https://zod.dev/) for type-safe data validation.
-   **API Communication:** [Axios](https://axios-http.com/) for making HTTP requests to the backend server.
-   **Linting:** [ESLint](https://eslint.org/) for code quality.
-   **Formatting:** [Prettier](https://prettier.io/) for consistent code style.

## Getting Started

### Prerequisites

-   Node.js (v20.x or later)
-   npm
-   The [backend server](#) must be running and accessible.

### 1. Installation

Install the project dependencies from the `client/` directory:
```bash
npm install
```

### 2. Running the Application

-   **For development:**
    ```bash
    npm run dev
    ```
    This starts the Next.js development server, typically on `http://localhost:3000`. The application will automatically reload when you make changes to the code.

-   **For production:**
    ```bash
    npm run build
    npm start
    ```
    The `build` command creates an optimized production build of the application. The `start` command runs the built application.

## Project Structure

This project uses the Next.js App Router, which organizes the application around directories and files within the `app/` folder.

```
client/
├── app/
│   ├── (admin)/          # Admin-only routes and layout
│   │   ├── a-dashboard/
│   │   └── ...
│   ├── (student)/        # Student-only routes and layout
│   │   ├── browse/
│   │   └── ...
│   ├── login/            # Login page
│   ├── layout.tsx        # Root layout for the application
│   └── page.tsx          # The main landing page
│
├── components/
│   ├── ui/               # Reusable UI components (from Shadcn)
│   ├── AdminLayout.tsx   # Layout component for the admin dashboard
│   ├── StudentLayout.tsx # Layout component for the student dashboard
│   └── ...               # Other reusable components
│
├── lib/
│   ├── services/         # Functions for making API calls
│   │   ├── api.ts        # Axios instance configuration
│   │   ├── auth.ts       # Authentication-related API calls
│   │   └── ...
│   └── utils.ts          # Utility functions
│
├── public/               # Static assets (images, icons)
├── package.json
└── next.config.ts        # Next.js configuration
```

### Key Concepts

-   **Routing:** File-system based routing with the App Router. Folders in `app/` define URL segments.
-   **Layouts:** `layout.tsx` files define a UI that is shared across multiple pages.
-   **Route Groups:** Directories in parentheses, like `(admin)`, are used to group routes together without affecting the URL structure. This is used here to create separate layouts for admin and student sections.
-   **Components:** The `components/` directory contains all reusable React components. The `components/ui` subdirectory is specifically for the components provided by Shadcn/ui.
-   **Services:** API interactions are abstracted away into the `lib/services/` directory, keeping data-fetching logic separate from the UI.
-   **Authentication:** The `AuthGuard` component and protected layouts are used to ensure that only authenticated users can access certain pages.
