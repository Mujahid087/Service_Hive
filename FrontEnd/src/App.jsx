import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "./pages/Dashboard"; // ⚠️ this should export Layout
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GigDetails from "./pages/GigDetails";
import BrowseGigs from "./pages/BrowseGigs";
import MyGigs from "./pages/MyGigs";
import MyBids from "./pages/MyBids";
import Profile from "./pages/Profile";
import BidsReceived from "./pages/bidsReceievd";
import CreateGig from "./pages/CreateGig";

// 🔐 Protect private pages
const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user ? children : <Navigate to="/login" replace />;
};

// 🔓 Public routes
const PublicRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user ? <Navigate to="/browse" replace /> : children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* PRIVATE + LAYOUT */}
        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/browse" element={<BrowseGigs />} />
          <Route path="/my-gigs" element={<MyGigs />} />
          <Route path="/create-gig" element={<CreateGig />} />
          <Route path="/my-bids" element={<MyBids />} />
          <Route path="/bids/received" element={<BidsReceived />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/gigs/:id" element={<GigDetails />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/browse" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
