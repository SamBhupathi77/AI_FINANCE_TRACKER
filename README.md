# 💰 AI Finance Tracker

[![Python](https://img.shields.io/badge/Python-3.13%2B-blue)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.137.1-009688)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19.2.6-61DAFB)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen)](https://github.com)

> **An intelligent personal finance tracker powered by AI. Track your spending, get smart categorization, receive financial insights, and chat with your personal AI financial advisor—all in one place.**

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Folder Structure](#-folder-structure)
- [Setup Instructions](#-setup-instructions)
- [Environment Configuration](#-environment-configuration)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Git Workflow & Commits](#-git-workflow--commits)
- [Architecture](#-architecture)
- [Scalability](#-scalability)
- [Contributing](#-contributing)
- [Support](#-support)
- [License](#-license)

---

## Features

### AI-Powered Features
- **Auto-Categorization**: AI automatically suggests transaction categories based on descriptions
- **Financial Chatbot**: Ask questions about your spending and get instant, personalized answers
- **Smart Insights**: Get AI-generated spending summaries with actionable savings recommendations

### Core Functionality
- **User Authentication**: Secure signup and login with JWT tokens
- **Transaction Management**: Add, edit, view, and delete transactions easily
- **Financial Analytics**: Visual dashboards with spending breakdowns
- **Multi-Category Support**: Organized expenses and income tracking
- **Real-Time Updates**: Instant UI updates when you make changes

### Security
- Password hashing with bcrypt
- JWT-based authentication (24-hour tokens)
- Secure API endpoints with authorization
- Environment variable protection

---

## Tech Stack

### Frontend
- **Framework**: React 19.2.6 with Vite
- **Routing**: React Router DOM 7.17.0
- **Visualization**: Recharts 3.8.1
- **Language**: JavaScript (ES6+)
- **Build Tool**: Vite 8.0.12

### Backend
- **Framework**: FastAPI 0.137.1
- **Server**: Uvicorn 0.49.0
- **ORM**: SQLAlchemy 2.0.51
- **Validation**: Pydantic 2.13.4
- **Authentication**: PyJWT 2.13.0, bcrypt 5.0.0
- **Language**: Python 3.13+

### Database
- **Primary**: PostgreSQL (Production)
- **Development**: SQLite
- **Driver**: psycopg2-binary 2.9.12

### AI/ML
- **Provider**: Groq API
- **Model**: Llama 3.1 8B Instant
- **SDK**: OpenAI SDK 2.41.1

### Deployment
- **Backend**: Render
- **Frontend**: Vercel/Netlify
- **Database**: PostgreSQL (Managed)

---

## Quick Start

### Prerequisites
- Python 3.13+
- Node.js 18+
- PostgreSQL 12+
- Git

---

## 📁 Folder Structure

```
AI_FINANCE_TRACKER/
├── 📄 README.md                    # Main documentation
│
├── 📁 backend/                     # FastAPI Backend
│   ├── venv/                       # Python virtual environment
│   ├── __pycache__/                # Python cache
│   ├── 📄 main.py                  # FastAPI application & endpoints
│   ├── 📄 models.py                # SQLAlchemy database models
│   ├── 📄 schemas.py               # Pydantic validation schemas
│   ├── 📄 database.py              # Database connection setup
│   ├── 📄 security.py              # Authentication & password hashing
│   ├── 📄 ai_utils.py              # AI integration functions
│   ├── 📄 requirements.txt         # Python dependencies
│   ├── 📄 .env                     # Environment variables (git-ignored)
│   └── 📄 .env.example             # Example environment file
│
├── 📁 frontend/                    # React + Vite Frontend
│   ├── src/
│   │   ├── 📄 App.jsx              # Main React component
│   │   ├── 📄 App.css              # Component styles
│   │   ├── 📄 main.jsx             # React entry point
│   │   ├── 📄 index.css            # Global styles
│   │   └── 📁 assets/              # Images and static files
│   ├── public/                     # Public static files
│   ├── node_modules/               # NPM dependencies
│   ├── 📄 package.json             # Frontend dependencies
│   ├── 📄 package-lock.json        # Lock file
│   ├── 📄 vite.config.js           # Vite build configuration
│   ├── 📄 eslint.config.js         # ESLint configuration
│   ├── 📄 index.html               # HTML template
│   └── 📄 .gitignore               # Git ignore rules
│
├── 📁 .git/                        # Git repository
├── 📄 .gitignore                   # Repository ignore rules
├── 📄 package.json                 # Root package configuration
└── 📄 package-lock.json            # Root lock file
```

### Key Files Explained

| File/Folder | Purpose |
|-----------|---------|
| `backend/main.py` | Core API logic with 11 endpoints |
| `backend/models.py` | User & Transaction database models |
| `backend/ai_utils.py` | AI categorization, chat, and summary functions |
| `frontend/App.jsx` | Main React component (Auth, Dashboard, Chat) |
| `backend/.env` | API keys, database URL, JWT secrets |
| `requirements.txt` | Python package dependencies |
| `package.json` | NPM dependencies |

---

##  Setup Instructions

### Backend Setup (Detailed)

#### Step 1: Navigate to Backend Directory
```bash
cd backend
```

#### Step 2: Create Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

#### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

#### Step 4: Configure Environment Variables
```bash
# Copy example file
cp .env.example .env

# Edit .env with your settings (see Environment Configuration section)
```

#### Step 5: Initialize Database
```bash
# FastAPI automatically creates tables on startup
# Just ensure DATABASE_URL points to your PostgreSQL
```

#### Step 6: Run Backend Server
```bash
# Development (with auto-reload)
uvicorn main:app --reload

# Production
uvicorn main:app --host 0.0.0.0 --port 8000
```

**Backend will be available at:** `http://localhost:8000`
**API Documentation:** `http://localhost:8000/docs` (Swagger UI)

---

### Frontend Setup (Detailed)

#### Step 1: Navigate to Frontend Directory
```bash
cd frontend
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Run Development Server
```bash
npm run dev
```

**Frontend will be available at:** `http://localhost:5173`

#### Step 4: Build for Production
```bash
npm run build
npm run preview
```

---

## 🌍 Environment Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost/tracker_db

# JWT Configuration
JWT_SECRET_KEY=your-super-secret-key-change-this
ALGORITHM=HS256

# AI Configuration (Groq)
GROQ_API_KEY=gsk_your_groq_api_key_here

```

### Detailed Configuration Guide

#### 1. Database URL
```
Format: postgresql://[username]:[password]@[host]:[port]/[database]

Examples:
- Local: postgresql://postgres:password@localhost:5432/tracker_db
- Render: postgresql://user:pass@render-db-server:5432/tracker_db
- Docker: postgresql://postgres:password@postgres:5432/tracker_db
```

#### 2. JWT Secret Key
```
# Generate a secure secret key
python -c "import secrets; print(secrets.token_urlsafe(32))"

# Output example:
# 7K_8mPqR9xLnO2aB5cD3eF4gH6iJ0kL-MnO

# Use this in .env:
JWT_SECRET_KEY=7K_8mPqR9xLnO2aB5cD3eF4gH6iJ0kL-MnO
```

#### 3. Groq API Key
```
1. Visit: https://console.groq.com
2. Sign up or log in
3. Create a new API key
4. Copy the key
5. Paste into .env: GROQ_API_KEY=gsk_xxxxx
```

**Backend (.env.example):**
```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/tracker_db

# JWT
JWT_SECRET_KEY=your-secret-key-here
ALGORITHM=HS256

# AI
GROQ_API_KEY=your-groq-key-here
```

---

## 📚 API Documentation

### 11 Total Endpoints

#### Authentication (2)
```
POST   /signup              Create new account
POST   /login               User login (returns JWT token)
```

#### User Profile (1)
```
GET    /users/me            Get current user info
```

#### Transactions (4)
```
POST   /transactions        Add new transaction
GET    /transactions        View all transactions
PUT    /transactions/{id}   Edit transaction
DELETE /transactions/{id}   Delete transaction
```

#### AI Features (3)
```
GET    /ai/summary          Get spending analysis
POST   /ai/chat             Chat with AI assistant
POST   /ai/suggest-category Auto-categorize transaction
```

#### Health (1)
```
GET    /                    Check API status
```

---

## 🚀 Deployment

### Backend Deployment (Render)

#### Step 1: Create Render Account
1. Visit [render.com](https://render.com)
2. Sign up with GitHub
3. Create new Web Service

#### Step 2: Configure Service
```
Name: ai-finance-tracker-backend
Environment: Python 3
Build Command: pip install -r requirements.txt
Start Command: uvicorn main:app --host 0.0.0.0 --port 8000
```

#### Step 3: Add Environment Variables
In Render dashboard:
1. Go to Environment
2. Add each variable from your `.env`:
   - DATABASE_URL
   - JWT_SECRET_KEY
   - GROQ_API_KEY

#### Step 4: Deploy
```bash
git push origin main
# Render auto-deploys on push
```

**Deployed URL:** `https://your-app.onrender.com`

---

### Frontend Deployment (Vercel)

#### Step 1: Create Vercel Account
1. Visit [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository

#### Step 2: Configure Project
```
Framework: Vite
Root Directory: ./frontend
Build Command: npm run build
Output Directory: dist
```

#### Step 3: Add Environment Variables
```
VITE_API_URL=https://your-backend.onrender.com
```

#### Step 4: Deploy
```bash
git push origin main
# Vercel auto-deploys on push
```

**Deployed URL:** `https://ai-finance-tracker-orcin.vercel.app/`

---

### Database Deployment (PostgreSQL on Render)

#### Step 1: Create PostgreSQL Database
1. In Render dashboard → Create New → PostgreSQL
2. Name: `ai-finance-tracker-db`
3. Region: Same as backend service
4. PostgreSQL Version: 15

#### Step 2: Get Connection String
```
From Render dashboard → Database → Internal Database URL
Format: postgresql://user:password@host:port/dbname
```

#### Step 3: Update Backend Environment
```
DATABASE_URL=postgresql://render_user:password@dpg-xxxxx.render.com:5432/dbname
```

#### Step 4: Connect Backend to Database
1. Go to Backend Service
2. Update DATABASE_URL environment variable
3. Service automatically creates tables on first run

---

