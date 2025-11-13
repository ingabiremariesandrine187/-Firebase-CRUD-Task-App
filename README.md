# Firebase CRUD Task App

A secure Task Management App built with **Next.js (TypeScript)**, **Firebase Authentication**, and **Firestore**.  
Users can register, log in, and manage personal tasks with full CRUD operations (Create, Read, Update, Delete).

---

## Live Demo

- [View Deployed App on Vercel](https://firebase-crud-task-app-five.vercel.app/)  
- [GitHub Repository](https://github.com/ingabiremariesandrine187/-Firebase-CRUD-Task-App)

---

## Features

**Firebase Authentication**
- User registration and login using email/password.
- Protected routes — only logged-in users can access the dashboard.

**Firestore CRUD**
- Add, view, update, and delete tasks.
- Each task includes title, description, priority, and completion status.
- Tasks are stored per user (each user only sees their own tasks).

**Protected Dashboard**
- Displays the logged-in user's email.
- Real-time Firestore updates.
- Logout button redirects back to login.

**Responsive UI**
- Built with Next.js 16 + Tailwind CSS.
- Gradient backgrounds, smooth transitions, and clean design.

---

## Learning Objectives

- Integrate Firebase Auth & Firestore into a Next.js + TypeScript app.
- Perform secure CRUD operations.
- Use `onAuthStateChanged` to manage authentication state.
- Protect routes and personalize user experience.

---

## Project Structure

firebase-todo-app/
│
├─ app/
│ ├─ dashboard/page.tsx # Dashboard with task list & form
│ ├─ login/page.tsx # Login page
│ ├─ register/page.tsx # Registration page
│ └─ layout.tsx # Root layout & metadata
│
├─ components/
│ ├─ TaskForm.tsx # Task creation & update form
│ └─ TaskList.tsx # Display task list with edit/delete
│
├─ types.ts # TypeScript interfaces (Task)
├─ firebase.ts # Firebase configuration (Auth + Firestore)
├─ package.json # Project dependencies
└─ README.md # Project documentation

Testing Credentials

For evaluation, you can use the following demo account:

Email: yvette@gmail.com

Password: 123456789