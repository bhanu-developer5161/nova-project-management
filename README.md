# 🚀 NOVA — Team Productivity Platform

> **Plan. Collaborate. Deliver.**

NOVA is a full-stack team productivity and project management platform designed to help teams create projects, manage tasks, collaborate with team members, and track project progress from one place.

---

## 🌐 Live Application

### 🚀 Live Demo

**Frontend:**
https://nova-project-management-seven.vercel.app

**Backend API:**
https://nova-project-management-alx3.onrender.com

**GitHub Repository:**
https://github.com/bhanu-developer5161/nova-project-management

> **Note:** The backend API requires authentication. Opening the API without authentication may return `401 Unauthorized`, which is expected behavior.

---

## ✨ Features

### 🔐 Authentication

* User registration
* User login
* JWT authentication
* Protected application routes
* Access and refresh tokens
* Automatic access-token refresh

### 📊 Dashboard

* Total projects
* Total tasks
* Completed tasks
* In-progress tasks
* Pending tasks
* Overall project progress
* Task completion statistics

### 📁 Project Management

* Create projects
* View projects
* Update projects
* Delete projects
* Project status management
* Project deadlines
* Project member management

### ✅ Task Management

* Create tasks
* Assign tasks to team members
* Set task priority
* Set task status
* Add due dates
* Edit tasks
* Delete tasks

### 👥 Team Management

* View available team members
* Assign members to projects
* Assign tasks to team members

### 📈 Progress Tracking

* Task completion statistics
* Project progress percentage
* Visual progress indicators
* Task status tracking
* Dashboard progress overview

### 📱 Responsive UI

* Sidebar navigation
* Dashboard cards
* Project views
* Task management interface
* Responsive layouts for different screen sizes

---

## 🛠️ Technology Stack

### Frontend

* React
* Vite
* JavaScript
* React Router
* Axios
* CSS

### Backend

* Python
* Django
* Django REST Framework
* Simple JWT
* Gunicorn
* WhiteNoise

### Database

* PostgreSQL

### Deployment

* Vercel — Frontend
* Render — Backend
* Render PostgreSQL — Database

### Version Control

* Git
* GitHub

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
```

---

## 🔌 API Endpoints

### Authentication

```text
POST /api/auth/register/
POST /api/auth/login/
POST /api/auth/refresh/
```

### Projects

```text
GET    /api/projects/
POST   /api/projects/
GET    /api/projects/<id>/
PUT    /api/projects/<id>/
DELETE /api/projects/<id>/
```

### Tasks

```text
GET    /api/tasks/
POST   /api/tasks/
GET    /api/tasks/<id>/
PUT    /api/tasks/<id>/
DELETE /api/tasks/<id>/
```

### Team Members

```text
GET /api/members/
```

### Dashboard

```text
GET /api/dashboard/
```

> All protected API endpoints require JWT authentication.

---

## ⚙️ Local Installation

### 1. Clone the repository

```bash
git clone https://github.com/bhanu-developer5161/nova-project-management.git
cd nova-project-management
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
```

Activate the virtual environment.

**Windows:**

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py migrate
```

Start the Django development server:

```bash
python manage.py runserver
```

Backend:

```text
http://127.0.0.1:8000
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🔐 Environment Variables

### Backend

Create a `.env` file inside the `backend/` directory.

```env
DEBUG=True

SECRET_KEY=your-secret-key

DB_NAME=your-database-name
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_HOST=your-database-host
DB_PORT=5432
```

For production, configure the environment variables securely through Render.

### Frontend

Configure the API URL:

```env
VITE_API_URL=https://nova-project-management-alx3.onrender.com/api
```

> Environment files containing secrets should not be committed to GitHub.

---

## 🔒 Security

NOVA includes several security measures:

* JWT-based authentication
* Protected REST API endpoints
* Password hashing through Django authentication
* Environment-based configuration
* PostgreSQL database
* CORS configuration
* Production `DEBUG=False`
* Secure session cookies
* Secure CSRF cookies
* HTTPS deployment
* HSTS security configuration
* Secret key stored through environment variables

---

## 🚀 Deployment

### Frontend — Vercel

The React + Vite frontend is deployed on Vercel.

**Live Frontend:**

https://nova-project-management-seven.vercel.app

### Backend — Render

The Django REST Framework backend is deployed on Render.

**Live Backend:**

https://nova-project-management-alx3.onrender.com

### Database — PostgreSQL

The application uses PostgreSQL through Render for the production database.

---

## 🔄 Application Flow

```text
User
 │
 ▼
React + Vite Frontend
 │
 │ Axios + JWT
 ▼
Django REST Framework API
 │
 ▼
PostgreSQL Database
```

Authentication flow:

```text
Register / Login
       │
       ▼
JWT Access + Refresh Tokens
       │
       ▼
Protected API Requests
       │
       ▼
Dashboard / Projects / Tasks
```

---

## 📈 Project Highlights

NOVA demonstrates practical full-stack development skills including:

* Frontend development with React
* REST API development with Django REST Framework
* JWT authentication
* CRUD operations
* Relational database integration
* PostgreSQL
* API integration using Axios
* Responsive UI development
* Environment variable configuration
* Production deployment
* Git and GitHub workflow

---

## 🔮 Future Improvements

Possible future enhancements include:

* Real-time team collaboration
* Email notifications
* Task comments
* File attachments
* Advanced project analytics
* Role-based permissions
* Activity history
* Search and filtering
* Dark mode
* Automated testing and CI/CD

---

## 📦 Releases

Project releases and version history are available here:

https://github.com/bhanu-developer5161/nova-project-management/releases

---

## 👩‍💻 Author

**Bhanu Suma Sri**

GitHub:
https://github.com/bhanu-developer5161

---

## ⭐ Project

If you find NOVA useful or interesting, consider giving the repository a ⭐ on GitHub.

> **NOVA — Plan. Collaborate. Deliver.**
