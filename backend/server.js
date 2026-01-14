import express from "express";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/AuthRoutes.js";
import gigRoutes from "./routes/gigRoutes.js";
import bidRoutes from "./routes/bidRoutes.js";

dotenv.config();
connectDB();

const app = express();

/* =======================
   MIDDLEWARE
======================= */

const allowedOrigins = [
  "http://localhost:5173",
  "https://service-hive-five.vercel.app"
];
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

/* =======================
   ROUTES
======================= */
app.use("/api/auth", authRoutes);
app.use("/api/gig", gigRoutes);
app.use("/api/bid", bidRoutes);

/* =======================
   SOCKET.IO SETUP
======================= */
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// Map to track online users
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  // Register user
  socket.on("register", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log("User registered:", userId);
  });

  socket.on("disconnect", () => {
    for (let [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

// Helper to get socket ID
export const getSocketIdByUserId = (userId) => {
  return onlineUsers.get(userId);
};

/* =======================
   START SERVER
======================= */
const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
