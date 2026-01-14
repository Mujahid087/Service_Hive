

````md
# GigFlow – Mini Freelance Marketplace Platform

🚀 **GigFlow** is a full-stack mini freelance marketplace where **Clients** can post jobs (Gigs) and **Freelancers** can apply by submitting bids.  
The platform focuses on **secure authentication**, **atomic hiring logic**, and **clean state management**.

---

## 🔗 Live Links

- **Frontend (Vercel):**  
  https://service-hive-five.vercel.app

- **Backend API (Render):**  
  https://service-hive-2.onrender.com

---

## 📂 Repository Structure (Monorepo)

```text
Service_Hive/
├── FrontEnd/        # React + Tailwind frontend
├── backend/         # Node.js + Express backend
├── .env.example     # Environment variables template
└── README.md
````

---

## 🛠 Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* Redux Toolkit

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication (HttpOnly Cookies)

### Deployment

* Frontend: Vercel
* Backend: Render

---

## ✨ Core Features

### 🔐 Authentication

* Secure Register & Login
* JWT-based authentication using **HttpOnly cookies**
* Any user can act as **Client** or **Freelancer**

### 📄 Gig Management

* Create gigs (title, description, budget)
* Browse open gigs
* Search gigs by title
* View gigs posted by the logged-in user

### 💼 Bidding & Hiring

* Freelancers submit bids
* Clients review bids
* Client can hire **one** freelancer
* Gig status changes automatically
* All other bids are rejected

---

## 🔥 Bonus Feature Implemented

### ✅ Transactional Integrity (Race Condition Safe)

* Hiring logic implemented using **MongoDB Transactions**
* Guarantees only one freelancer can be hired per gig
* Prevents race conditions during concurrent hire requests

---

## 📡 API Endpoints

### Auth

| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| POST   | `/api/auth/register` | Register user      |
| POST   | `/api/auth/login`    | Login & set cookie |

### Gigs

| Method | Endpoint      |
| ------ | ------------- |
| GET    | `/api/gigs`   |
| POST   | `/api/gigs`   |
| GET    | `/api/gig/my` |

### Bids

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | `/api/bids`        |
| GET    | `/api/bids/:gigId` |
| GET    | `/api/bid/my`      |

### Hiring

| Method | Endpoint                |
| ------ | ----------------------- |
| PATCH  | `/api/bids/:bidId/hire` |

---

## 🔐 Environment Variables

A `.env.example` file is included.

### Backend

```env
PORT=
MONGO_URI=
JWT_SECRET=
NODE_ENV=production
```

### Frontend

```env
VITE_APP_BASE_URL=
```

---

## ▶️ Run Locally

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd FrontEnd
npm install
npm run dev
```

---

## 🎥 Demo Video

A 2-minute Loom video demonstrating the **Hiring Flow** has been recorded and shared.

---

````

---



---



---


````
