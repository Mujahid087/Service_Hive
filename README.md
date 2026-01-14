
```md
# GigFlow – Mini Freelance Marketplace Platform

🚀 **GigFlow** is a full-stack mini freelance marketplace where **Clients** can post jobs (Gigs) and **Freelancers** can apply by submitting bids.  
The platform focuses on **secure authentication**, **atomic hiring logic**, and **clean state management**, built as part of a **Full Stack Development Internship Assignment**.

---

## 🔗 Live Links

- **Frontend (Vercel):**  
  https://service-hive-five.vercel.app

- **Backend API (Render):**  
  https://service-hive-2.onrender.com

---

## 📂 Repository Structure (Monorepo)

```

Service_Hive/
├── FrontEnd/        # React + Tailwind frontend
├── backend/         # Node.js + Express backend
├── .env.example     # Environment variables template
└── README.md

````

---

## 🛠 Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Redux Toolkit (State Management)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JWT Authentication (HttpOnly Cookies)

### Deployment
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## ✨ Core Features Implemented

### 🔐 User Authentication
- Secure **Register & Login**
- JWT-based authentication using **HttpOnly cookies**
- Role-less system: any user can act as **Client** or **Freelancer**

---

### 📄 Gig Management (CRUD)
- Create new gigs with **title, description, and budget**
- Browse all **open gigs**
- Search gigs by title
- View gigs posted by the logged-in user

---

### 💼 Bidding System
- Freelancers can submit bids with:
  - Proposal message
  - Bid amount
- Clients can view all bids on their gig

---

### 🧠 Hiring Logic (Crucial Feature)
- Client can **hire one freelancer** for a gig
- Business rules enforced:
  - Gig status changes from `open → assigned`
  - Selected bid becomes `hired`
  - All other bids for the same gig are automatically marked as `rejected`

---

## 🔥 Bonus Features Implemented

### ✅ Bonus 1: Transactional Integrity (Race Condition Safe)
- The **Hire** operation is implemented using **MongoDB Transactions**
- Ensures **atomic updates**
- Prevents multiple freelancers from being hired simultaneously, even if two requests occur at the same time

> ✔ Guarantees data consistency and prevents race conditions

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login & set HttpOnly cookie |

### Gigs
| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/api/gigs` | Fetch all open gigs (with search) |
| POST | `/api/gigs` | Create a new gig |
| GET | `/api/gig/my` | Get gigs created by logged-in user |

### Bids
| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/bids` | Submit a bid |
| GET | `/api/bids/:gigId` | Get bids for a gig (owner only) |
| GET | `/api/bid/my` | Get bids submitted by logged-in user |

### Hiring
| Method | Endpoint | Description |
|------|---------|------------|
| PATCH | `/api/bids/:bidId/hire` | Hire freelancer (Atomic operation) |


## 🔐 Environment Variables

A `.env.example` file is included in the repository.

### Backend (`backend/.env`)

```env
PORT=
MONGO_URI=
JWT_SECRET=
NODE_ENV=production
```

### Frontend (`FrontEnd/.env`)

```env
VITE_APP_BASE_URL=
```

---

## ▶️ Running the Project Locally

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

A **2-minute Loom video** demonstrating the **Hiring Flow** has been recorded and shared as per submission guidelines.

## 🧠 Key Learnings

* Secure cookie-based authentication in production
* MongoDB transactions for atomic operations
* Handling CORS & cross-site cookies
* Full-stack deployment with Vercel & Render
* Clean API architecture and state management

---

## 👨‍💻 Author

**Mujahid Mahedi**
Full Stack Developer | MERN Stack

```

---

