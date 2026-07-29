# 🌟 Girl Pow-R Academy — Student Management Portal

A full stack web application built for Girl Pow-R Academy to manage student registrations, programs, contracts, attendance, and showcases.

**Tech stack:** MongoDB · Express · React (Vite) · Node.js (MERN)

---

## 📁 Project structure

```
girlpowr-academy/
├── client/          ← React frontend (Vite)
├── server/          ← Node.js + Express backend
│   ├── config/      ← MongoDB connection
│   ├── middleware/  ← Auth middleware (JWT)
│   ├── models/      ← Mongoose schemas
│   └── routes/      ← API endpoints
```

---

## ⚙️ Prerequisites

Make sure you have these installed before starting:

- [Node.js](https://nodejs.org) v18 or higher
- [Git](https://git-scm.com)
- A MongoDB Atlas account (ask Navneet for the connection string)

---

## 🚀 Getting started

### 1. Clone the repo

```bash
git clone https://github.com/navneetk11/girlpowr-academy.git
cd girlpowr-academy
```

### 2. Checkout your branch

Each team member has their own branch. Switch to yours:

```bash
git checkout dev/your-branch-name
```



## 🖥️ Running the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=girlpowr_super_secret_123
```

> ⚠️ Ask Navneet privately for the real MONGO_URI. Never share it publicly or commit it to GitHub.

Start the backend:

```bash
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected: ac-xxx.mongodb.net
```

---

## 💻 Running the frontend

Open a **new terminal** (keep the backend running):

```bash
cd client
npm install
npm run dev
```

Open your browser at:
```
http://localhost:5173
```

You should see the Girl Pow-R login page.

---

## 🔗 API endpoints (built so far)

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new student |
| POST | `/api/auth/login` | Login and get JWT token |

### Coming soon
| Method | Endpoint | Description | Owner |
|--------|----------|-------------|-------|
| GET | `/api/programs` | List all programs | Rabiel |
| GET | `/api/programs?city=Ajax` | Filter by city | Rabiel |
| POST | `/api/enrollments` | Enroll in a program | Rabiel |
| POST | `/api/contracts` | Sign contracts | Navneet |
| GET | `/api/students/:id` | Get student profile | Miracle |
| PUT | `/api/students/:id` | Update profile | Miracle |
| GET | `/api/admin/pending` | View pending students | Navneet |
| PUT | `/api/admin/approve/:id` | Approve a student | Navneet |

---

## 🌿 Branch rules

- ❌ **Never push directly to `main` or `dev`**
- ✅ Always push to your own branch
- ✅ When your task is done, open a Pull Request into `dev`
- ✅ Tag Navneet to review and merge
- 🚀 `dev` gets merged into `main` on Thursday night before the Friday demo

---

## 🧪 Testing the API

Use [Postman](https://postman.com) to test endpoints.

**Register a test student:**
- Method: `POST`
- URL: `http://localhost:5000/api/auth/register`
- Body (JSON):
```json
{
  "fullName": "Sarah Johnson",
  "email": "sarah@test.com",
  "password": "test1234",
  "role": "student",
  "phone": "6471234567",
  "city": "Ajax"
}
```

**Login:**
- Method: `POST`
- URL: `http://localhost:5000/api/auth/login`
- Body (JSON):
```json
{
  "email": "sarah@test.com",
  "password": "test1234"
}
```

Copy the token from the response — you'll need it in the Authorization header for protected routes:
```
Authorization: Bearer your_token_here
```

---

## 🎯 Friday demo goal

By end of this week we should be able to show:

1. Student registers via portal (form pre-filled from WordPress link)
2. Student sees Thank You page
3. Dawn logs into admin → sees pending student with DOB
4. Dawn approves → student can log in
5. Student signs contracts (3 checkboxes)
6. Student sees basic dashboard with their name and program

---





