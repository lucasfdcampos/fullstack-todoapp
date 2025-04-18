<div align="center">

# 🚀 Fullstack TODO App

### FastAPI & Next.js Task Manager ### 

![GitHub issues](https://img.shields.io/github/issues/lucasfdcampos/fullstack-todoapp)
![GitHub license](https://img.shields.io/github/license/lucasfdcampos/fullstack-todoapp)
![GitHub last commit](https://img.shields.io/github/last-commit/lucasfdcampos/fullstack-todoapp)

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

## 📝 Overview ##

This fullstack TODO application demonstrates modern web development practices by combining **FastAPI** for the backend and **Next.js (App Router)** for the frontend. The project features user authentication, database persistence, and a responsive UI, all containerized with Docker for easy deployment.
The application allows users to create, read, update, and delete tasks, providing a seamless experience across devices.

![Print do Aplicativo de Gerenciamento de Tarefas](https://github.com/lucasfdcampos/fullstack-todoapp/blob/master/todo-app.png)

## 📋 Backlog ##
[![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)](https://lumbar-mall-a1b.notion.site/Challenge-fullstack-1d50ceab98a980b1b2a7cb2877bc73ac)

## ✨ Key Features

- **🔐 Secure Authentication** - JWT-based user authentication system
- **📱 Responsive Design** - Mobile-friendly interface built with TailwindCSS
- **🔄 Real-time Updates** - Instant UI updates when tasks are modified
- **🗄️ Data Persistence** - PostgreSQL database with SQLAlchemy ORM
- **🐳 Containerization** - Easy setup with Docker and Docker Compose
- **🔄 Database Migrations** - Managed with Alembic for version control
- **📊 API Documentation** - Auto-generated with Swagger UI (FastAPI)

## 🧱 Technology Stack

### Backend
- **FastAPI** - High-performance Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **Alembic** - Database migration tool
- **PostgreSQL** - Relational database
- **Python-jose** - JWT token handling
- **Passlib & Bcrypt** - Password hashing

### Frontend
- **Next.js** - React framework with App Router
- **TailwindCSS** - Utility-first CSS framework
- **TypeScript** - Static typing for JavaScript
- **Fetch API** - For data fetching

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 🚀 Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/lucasfdcampos/fullstack-todoapp.git
   cd fullstack-todo-app
   ```

2. **Start the application**
   ```bash 
   ./start.sh
   ```
   This command will build the Docker images and start the containers for both the backend and frontend.

3. **Access the application**
    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend API: [http://localhost:8000/docs](http://localhost:8000/docs) (Swagger UI)

4. **Stop the application**
    ```bash
    ./stop.sh
    ```

### Run in Insomnia ###
[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=todo-app&uri=https%3A%2F%2Fraw.githubusercontent.com%2Flucasfdcampos%2Ffullstack-todoapp%2Frefs%2Fheads%2Fmaster%2Ftodo-app.json)

## 🏗️ Project Structure ##
### Backend Architecture ###
```
backend/
├── alembic/                # Database migrations
│   └── versions/           # Migration versions
├── app/
│   ├── api/v1/             # API routes (auth, todos, user)
│   ├── core/               # Security configurations
│   ├── crud/               # Database operations (CRUD)
│   ├── db/                 # Database connection and session
│   ├── models/             # SQLAlchemy models
│   ├── schemas/            # Pydantic schemas
│   └── main.py             # API entry point
├── alembic.ini             # Alembic configuration
├── Dockerfile              # Backend container configuration
└── requirements.txt        # Python dependencies
```

### Frontend Architecture ###
```
frontend/
└── src/
├── app/
│   ├── api/            # Internal API routes (auth, todos)
│   ├── register/       # Registration page
│   └── todos/          # Main application page
├── components/         # Reusable UI components
└── types/              # TypeScript type definitions
```

## 🛠️ Development
### Backend Development commands ###
- **Run the backend server**
  ```bash
  docker-compose up backend
  ```
- **Initialize Alembic**
  ```bash
  docker-compose run backend alembic init alembic
  ```
- **Create a new migration**
  ```bash
  docker-compose run backend alembic revision --autogenerate -m "migration_name"
  ```
- **Run migrations**
  ```bash
  docker-compose run backend alembic upgrade head
  ```

### Frontend Development commands ### 
- **Install dependencies**
  ```bash
  npm install
  ```
- **Initialize TailwindCSS**
  ```bash
  npx tailwindcss init -p
  ```
- **Run development server**
  ```bash
  npm run dev
  ```
- **Run the frontend server**
  ```bash
  docker-compose up frontend
  ```
- **Build the frontend**
  ```bash
  docker-compose run frontend npm run build
  ```

---
## 📝 Development Notes ##
- The backend structure was designed with scalability in mind, following best practices from FastAPI documentation.
- The frontend UI was developed with assistance from [v0.dev](https://v0.dev/), accelerating the component creation process.
- The authentication system uses JWT tokens with secure password hashing via bcrypt.
CORS is properly configured to allow secure communication between frontend and backend.


## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details