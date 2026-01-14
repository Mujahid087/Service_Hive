// import express from "express"
// import dotenv from "dotenv" 
// import connectDB from "./Config/db.js"
// import cookieParser from "cookie-parser"
// import authRoutes from "./routes/AuthRoutes.js"
// import cors from "cors"
// import gigRoutes from "./routes/gigRoutes.js"
// import bidroutes from "./routes/bidRoutes.js" 


// dotenv.config()
// connectDB() 

// const app=express() 
// app.use(express.json())
// app.use(cookieParser())
// app.use(
//   cors({
//     origin: "http://localhost:5173", // EXACT frontend URL
//     credentials: true,               // REQUIRED for cookies
//   })
// );

// app.use("/api/auth",authRoutes) 
// app.use("/api/bid",bidroutes)
// app.use("/api/gig",gigRoutes)


// const PORT=process.env.PORT || 5000 
// app.listen(PORT,()=> console.log(`server running on port ${PORT}`)) 

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
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);

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
