# 🚀 NOVA — Team Productivity Platform

> **Plan. Collaborate. Deliver.**

NOVA is a full-stack team productivity and project management platform designed to help teams create projects, manage tasks, collaborate with team members, and track project progress from one place.

## 🌐 Live Application

**Frontend:**  
https://nova-project-management-seven.vercel.app

**Backend API:**  
https://nova-project-management-alx3.onrender.com

**GitHub Repository:**  
https://github.com/bhanu-developer5161/nova-project-management

---

## ✨ Features

### 🔐 Authentication
- User registration
- User login
- JWT authentication
- Protected application routes
- Access and refresh tokens
- Automatic token refresh

### 📊 Dashboard
- Total projects
- Total tasks
- Completed tasks
- In-progress tasks
- Pending tasks
- Overall project progress

### 📁 Project Management
- Create projects
- View projects
- Update projects
- Delete projects
- Project status management
- Project deadlines
- Project members

### ✅ Task Management
- Create tasks
- Assign tasks to team members
- Set task priority
- Set task status
- Add due dates
- Edit tasks
- Delete tasks

### 👥 Team Management
- View available team members
- Assign members to projects
- Assign tasks to team members

### 📈 Progress Tracking
- Task completion statistics
- Project progress percentage
- Visual progress indicators
- Task status tracking

### 📱 Responsive UI
- Sidebar navigation
- Dashboard cards
- Project views
- Task management interface
- Responsive layout

---

## 🛠️ Technology Stack

### Frontend

- React
- Vite
- JavaScript
- React Router
- Axios
- CSS

### Backend

- Python
- Django
- Django REST Framework
- Simple JWT
- Gunicorn
- WhiteNoise

### Database

- PostgreSQL

### Deployment

- Vercel — Frontend
- Render — Backend
- Render PostgreSQL — Database

### Version Control

- Git
- GitHub

---

## 🏗️ Project Architecture

```text
NOVA
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── accounts/
│   ├── projects/
│   ├── tasks/
│   ├── members/
│   ├── config/
│   ├── manage.py
│   └── requirements.txt
│
├── .gitignore
└── README.md