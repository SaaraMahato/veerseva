# VeerSeva 🇮🇳

> A digital services platform for Indian Armed Forces veterans — simplifying access to benefits, grievance redressal, and document management.

**Live Demo:**
- Frontend: https://veerseva-frontend.onrender.com
- Backend API: https://veerseva-backend.onrender.com
- API Docs (Swagger): https://veerseva-backend.onrender.com/api/docs/

---

## Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Login Credentials (Demo)](#login-credentials-demo)
- [Deployment](#deployment)
- [Roadmap](#roadmap)

---

## About

VeerSeva is a full-stack web application that helps Indian Armed Forces veterans access government benefits, track applications, file grievances, and manage their service documents — all in one place. Officers can review and approve/reject applications, and admins manage the platform.

---

## Tech Stack

| Layer       | Technology                              |
|-------------|------------------------------------------|
| Frontend    | Next.js 16, TypeScript, Tailwind CSS v4 |
| Backend     | Django 6, Django REST Framework         |
| Auth        | SimpleJWT (access + refresh tokens)     |
| OTP         | django-otp (email-based)                |
| Database    | SQLite (local) / PostgreSQL (production)|
| Notifications | Telegram Bot API                      |
| AI Assistant | Rule-based chatbot                     |
| Deployment  | Render.com                              |
| API Docs    | drf-spectacular (Swagger / OpenAPI 3.0) |

---

## Features

### Veteran
- Register, login, OTP verification
- Dashboard with benefits overview
- Apply for benefit schemes
- Upload and manage service documents
- File and track grievances
- Bell notifications + Telegram alerts
- AI assistant for guidance

### Officer
- Review benefit applications (approve / reject)
- Respond to grievances
- Manage assigned cases

### Admin
- Full platform access
- User management

---

## Project Structure

```
veerseva/
├── backend/
│   ├── apps/
│   │   ├── accounts/       # Auth, users, OTP
│   │   ├── veterans/       # Veteran profiles
│   │   ├── benefits/       # Schemes & applications
│   │   ├── documents/      # Document upload & verify
│   │   ├── grievances/     # Grievance filing
│   │   ├── notifications/  # Bell + Telegram alerts
│   │   └── assistant/      # Rule-based AI chat
│   ├── veerseva/           # Django settings & URLs
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   └── src/
│       ├── app/            # Next.js app router pages
│       ├── components/     # Reusable UI components
│       └── lib/            # API helpers, types
│
└── .gitignore
```

---

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- Git

### 1. Clone the repository

```bash
git clone https://github.com/SaaraMahato/veerseva.git
cd veerseva
```

### 2. Backend setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

pip install -r requirements.txt
python manage.py migrate
python manage.py shell < setup_data.py   # Load sample data
python manage.py runserver
```

Backend runs at: http://localhost:8000

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: http://10.129.143.116:3000

### 4. Environment variables

Create a `.env` file in the `backend/` directory:

```env
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=            # Leave empty for SQLite locally
TELEGRAM_BOT_TOKEN=      # Optional
TELEGRAM_CHAT_ID=        # Optional
EMAIL_HOST_USER=         # Optional (for OTP email)
EMAIL_HOST_PASSWORD=     # Optional
```

---

## API Endpoints

Full interactive docs available at: `/api/docs/`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/` | Register new user |
| POST | `/api/auth/login/` | Login and get JWT |
| POST | `/api/auth/verify-otp/` | Verify OTP |
| GET  | `/api/auth/me/` | Get current user |
| GET  | `/api/veterans/profile/` | Get veteran profile |
| GET  | `/api/benefits/schemes/` | List benefit schemes |
| POST | `/api/benefits/applications/` | Apply for a benefit |
| PATCH | `/api/benefits/applications/{id}/review/` | Approve / reject |
| GET  | `/api/grievances/` | List grievances |
| POST | `/api/grievances/` | File a grievance |
| GET  | `/api/documents/` | List documents |
| POST | `/api/documents/upload/` | Upload a document |
| GET  | `/api/notifications/` | Get notifications |
| POST | `/api/assistant/chat/` | Chat with AI assistant |

---

## Login Credentials (Demo)

| Role    | Email                      | Password    |
|---------|----------------------------|-------------|
| Veteran | veteran@veerseva.com       | veteran123  |
| Officer | officer@veerseva.com       | officer123  |
| Admin   | admin@veerseva.com         | admin1234   |

---

## Deployment

🌐 Frontend → https://veerseva-frontend.onrender.com
🚀 Backend  → https://veerseva-backend.onrender.com

> **Note:** Free tier services spin down after 15 minutes of inactivity. The first request after idle may take ~50 seconds to respond.

### Production build command (backend)

```bash
pip install -r requirements.txt && python manage.py migrate && python manage.py shell < setup_data.py
```

### Push & deploy

```bash
git add .
git commit -m "your message"
git push origin main
```

Render auto-deploys on every push to `main`.

---

## Roadmap

- [x] Authentication (register, login, OTP)
- [x] Veteran & Officer dashboards
- [x] Benefits, documents, grievances
- [x] Telegram notifications
- [x] Rule-based AI assistant
- [x] PostgreSQL (production)
- [x] Swagger API documentation
- [ ] Docker configuration
- [ ] Unit tests
- [ ] PDF export for documents

---

## License

This project was built as part of an academic/personal initiative to support India's veteran community.

**Jai Hind! 🇮🇳**
