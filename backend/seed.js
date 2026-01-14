import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/User.js";
import Gig from "./models/Gig.js";
import Bid from "./models/Bid.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI not found in .env");
  process.exit(1);
}

/* =========================
   USER DATA (25 USERS)
========================= */
const USERS_DATA = [
  
  { name: "User2", email: "user2@gmail.com", password: "123456" },
  { name: "User3", email: "user3@gmail.com", password: "123456" },
  { name: "User4", email: "user4@gmail.com", password: "123456" },
  { name: "User5", email: "user5@gmail.com", password: "123456" },

  { name: "User6", email: "user6@gmail.com", password: "123456" },
  { name: "User7", email: "user7@gmail.com", password: "123456" },
  { name: "User8", email: "user8@gmail.com", password: "123456" },
  { name: "User9", email: "user9@gmail.com", password: "123456" },
  { name: "User10", email: "user10@gmail.com", password: "123456" },

  { name: "User11", email: "user11@gmail.com", password: "123456" },
  { name: "User12", email: "user12@gmail.com", password: "123456" },
  { name: "User13", email: "user13@gmail.com", password: "123456" },
  { name: "User14", email: "user14@gmail.com", password: "123456" },
  { name: "User15", email: "user15@gmail.com", password: "123456" },

  { name: "User16", email: "user16@gmail.com", password: "123456" },
  { name: "User17", email: "user17@gmail.com", password: "123456" },
  { name: "User18", email: "user18@gmail.com", password: "123456" },
  { name: "User19", email: "user19@gmail.com", password: "123456" },
  { name: "User20", email: "user20@gmail.com", password: "123456" },

  { name: "User21", email: "user21@gmail.com", password: "123456" },
  { name: "User22", email: "user22@gmail.com", password: "123456" },
  { name: "User23", email: "user23@gmail.com", password: "123456" },
  { name: "User24", email: "user24@gmail.com", password: "123456" },
  { name: "User25", email: "user25@gmail.com", password: "123456" },
];

/* =========================
   GIG DATA (30 GIGS)
========================= */
const GIGS_DATA = [
  { title: "Build MERN Stack Website", budget: 15000 },
  { title: "React Admin Dashboard", budget: 9000 },
  { title: "Node.js REST API", budget: 12000 },
  { title: "Portfolio Website", budget: 5000 },
  { title: "E-commerce Backend", budget: 18000 },
  { title: "Landing Page Design", budget: 4000 },
  { title: "Authentication System", budget: 8000 },
  { title: "Chat Application", budget: 14000 },
  { title: "Blog Platform", budget: 7000 },
  { title: "Job Portal Website", budget: 20000 },

  { title: "Bug Fixing React App", budget: 3000 },
  { title: "Convert Figma to React", budget: 6000 },
  { title: "Payment Gateway Integration", budget: 11000 },
  { title: "Admin Panel UI", budget: 7500 },
  { title: "SEO Optimized Website", budget: 5000 },
  { title: "API Performance Optimization", budget: 10000 },
  { title: "Dockerize Node App", budget: 6500 },
  { title: "AWS Deployment", budget: 13000 },
  { title: "CMS using MERN", budget: 16000 },
  { title: "Realtime Notification System", budget: 12500 },

  { title: "Bug Tracker Tool", budget: 9000 },
  { title: "Learning Management System", budget: 22000 },
  { title: "Food Delivery App Backend", budget: 19000 },
  { title: "Social Media App", budget: 25000 },
  { title: "Resume Builder Tool", budget: 7000 },
  { title: "GraphQL API", budget: 11500 },
  { title: "Microservices Setup", budget: 24000 },
  { title: "Web Scraping Tool", budget: 8000 },
  { title: "Analytics Dashboard", budget: 15000 },
  { title: "SaaS MVP Development", budget: 30000 },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    /* -------- USERS -------- */
    for (const user of USERS_DATA) {
      const exists = await User.findOne({ email: user.email });
      if (!exists) {
        await User.create({ ...user, provider: "local" });
      }
    }

    const users = await User.find();
    console.log(`✅ Users ready: ${users.length}`);

    const clients = users.slice(0, 5);
    const freelancers = users.slice(5);

    /* -------- GIGS -------- */
    const gigs = [];

    for (let i = 0; i < GIGS_DATA.length; i++) {
      const gigData = GIGS_DATA[i];

      const exists = await Gig.findOne({ title: gigData.title });
      if (!exists) {
        const gig = await Gig.create({
          title: gigData.title,
          description: `Detailed description for ${gigData.title}`,
          budget: gigData.budget,
          ownerId: clients[i % clients.length]._id,
          status: "open",
        });
        gigs.push(gig);
      }
    }

    console.log(`✅ Gigs ready (manual): ${GIGS_DATA.length}`);

    /* -------- BIDS -------- */
    const bids = [];

    for (const gig of gigs) {
      const bidCount = Math.floor(Math.random() * 4) + 3; // 3–6 bids

      for (let i = 0; i < bidCount; i++) {
        const freelancer =
          freelancers[Math.floor(Math.random() * freelancers.length)];

        bids.push({
          gigId: gig._id,
          freelancerId: freelancer._id,
          message: `Hi, I am ${freelancer.name}. I can complete "${gig.title}" efficiently.`,
          price: gig.budget - Math.floor(Math.random() * 2000),
          status: "pending",
        });
      }
    }

    if (bids.length > 0) {
      await Bid.insertMany(bids);
      console.log(`✅ Bids created: ${bids.length}`);
    }

    console.log("🎉 SEEDING COMPLETED SUCCESSFULLY");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seedDatabase();
