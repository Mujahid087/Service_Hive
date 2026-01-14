import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../components/Navbar";
import socket from "../socket";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user?.id) return;

    // 🔹 Register user with socket server
    socket.emit("register", user.id);

    // 🔔 Listen for hire notification
    socket.on("hired", (data) => {
      toast.success(
        `🎉 You have been hired for "${data.gigTitle}"`
      );
    });

    return () => {
      socket.off("hired");
    };
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-700">
      <Navbar />

      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={4000} />

      <main className="w-full">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
