
# Task Manager Application

A professional, modern, and responsive Task Management application built with **React**, **TypeScript**, **Material UI (MUI)**, **Drag-and-Drop**, and a **Node.js/Express** backend. This app supports role-based access control (Admin/User), dark/light theme switching, and fully featured CRUD operations for tasks.

## Key Features

- **Modern Tech Stack:**  
  - **Frontend:** React 18, TypeScript, MUI 5, react-beautiful-dnd, and React Router.
  - **Backend:** Node.js, Express (with in-memory storage for simplicity).
  
- **Role-Based Access Control (RBAC):**  
  - **Admin Users:** Can create, edit, delete tasks.
  - **Standard Users:** Can only view and reorder tasks.
  
- **CRUD Functionality:**  
  Fully supports Create, Read, Update, and Delete operations for tasks.

- **Theming (Dark/Light Mode):**  
  Easily switch between dark and light themes via a toggle in the navbar.

- **Responsive Design:**  
  A responsive layout with a sidebar that is persistent on larger screens and transforms into a slide-out drawer on mobile devices.

- **Drag-and-Drop for Tasks:**  
  Implemented using `react-beautiful-dnd` to reorder tasks intuitively.

- **Persistent Login State:**  
  The user’s login session is stored in `localStorage`, ensuring that refreshing the page does not log the user out.

- **Page Routing:**  
  - Protected routes for logged-in users.
  - A `NotFound` page if an unknown route is accessed.

## Demo Credentials

- **Admin Account:**  
  - Username: `admin`  
  - Password: `password`  

- **User Account:**  
  - Username: `test`  
  - Password: `password`  

The admin role has full CRUD rights, while the user role can only view and reorder tasks.

## Getting Started

### Prerequisites

- **Node.js** (v14 or later recommended)
- **npm** (bundled with Node.js)

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   
   By default, the backend runs at `http://localhost:8000`.  
   It exposes the REST API endpoints at `http://localhost:8000/api/tasks`.

### Frontend Setup

1. In a separate terminal window, navigate to the frontend directory (e.g., `frontend`):
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and go to:
   ```
   http://localhost:5173
   ```
   (or the URL shown by Vite after it starts the dev server)

### Logging In

- Use the admin credentials to see the full functionality:
  - **Username:** `admin`
  - **Password:** `password`

- If you log in as a normal user (`test` / `password`), you’ll see the tasks but won’t have the “Add New Task” or Edit/Delete buttons.

### Adding a Task (Admin Only)

1. Log in as `admin`.
2. On the dashboard page, click **"Add New Task"**.
3. Fill out the task details and click **"Create"**.
4. The new task should appear in the task list.

### Reordering Tasks

All users can reorder tasks by clicking and dragging the task card to a new position. Release the mouse to drop it in the desired spot.

### Theming

Toggle the dark/light theme by using the switch in the top-right corner of the navbar.

## Folder Structure (Frontend)

```
my-app/
  ├─ src/
  │  ├─ components/
  │  │  ├─ Layout/ (Navbar, Sidebar, MainLayout)
  │  │  ├─ Task/ (TaskCard, TaskDialog)
  │  │  ├─ DragDrop/ (TaskListDnD)
  │  │  └─ RoleProtected.tsx
  │  ├─ context/ (AuthContext, ThemeContext)
  │  ├─ pages/ (Dashboard, Login, NotFound)
  │  ├─ routes/ (AppRoutes)
  │  ├─ services/ (tasksService)
  │  ├─ theme/ (lightTheme, darkTheme)
  │  ├─ types/ (auth.d.ts, tasks.d.ts)
  │  ├─ utils/ (reorderTasks)
  │  ├─ App.tsx
  │  ├─ main.tsx
  │  └─ index.css
  ├─ package.json
  └─ tsconfig.json
```

## Backend Overview

- **`backend/server.js`**: Simple Express server with a `/api/tasks` endpoint.
- Uses an in-memory array to store tasks. In a real application, you might integrate a real database.

## Notes

- This setup is for demonstration and interview purposes.  
- Authentication is mocked: any username with `password` as password logs you in. Only the username `admin` gets admin role.  
- Data is stored in memory for tasks (lost on server restart). For persistence, integrate a real database.
