import socket from "../socket";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout as logoutAction } from "../redux/slices/authSlices";
import { useLogoutMutation } from "../redux/slices/api/authApiSlice";
import { apiSlice } from "../redux/slices/apiSlices";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [logoutApi] = useLogoutMutation();
  const [openProfile, setOpenProfile] = useState(false);

//   const logoutHandler = async () => {
//     try {
//       await logoutApi().unwrap();
//     } catch (err) {
//       // ignore API error
//     }
//     dispatch(logoutAction());
//     navigate("/login");
//   };

//     const logoutHandler = async () => {
//   try {
//     await logoutApi().unwrap();
//   } catch (err) {
//     // ignore API error
//   }

//   // 🔥 CLEAR RTK QUERY CACHE
//   dispatch(apiSlice.util.resetApiState());

//   // 🔥 CLEAR AUTH STATE
//   dispatch(logoutAction());

//   navigate("/login");
// };

  
  
  const logoutHandler = async () => {
  try {
    await logoutApi().unwrap();
  } catch (err) {}

  socket.disconnect(); // 🔥 stop socket
  dispatch(apiSlice.util.resetApiState());
  dispatch(logoutAction());
  navigate("/login");
};

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <nav className="relative bg-gray-800/50 backdrop-blur after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <div
            onClick={() => navigate("/dashboard")}
            className="cursor-pointer text-xl font-bold text-indigo-400"
          >
            ServiceHive
          </div>

          {/* Navigation */}
          <div className="flex space-x-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white"
            >
              Dashboard
            </button>


            <button
    onClick={() => navigate("/create-gig")}
    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
  >
    + New Job
  </button>

            <button
              onClick={() => navigate("/browse")}
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
            >
              Browse Gigs
            </button>

            <button
              onClick={() => navigate("/my-gigs")}
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
            >
              My Gigs
            </button>

            <button
              onClick={() => navigate("/my-bids")}
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
            >
              My Bids
            </button>

            <button
              onClick={() => navigate("/bids/received")}
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
            >
              Bids Received
            </button>
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setOpenProfile((prev) => !prev)}
              className="flex items-center gap-2 rounded-full focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
            >
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                {userInitial}
              </div>

              <span className="text-sm text-gray-300">
                {user?.name}
              </span>
            </button>

            {openProfile && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-gray-800 py-1 outline outline-1 outline-white/10 shadow-lg">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setOpenProfile(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/5"
                >
                  My Profile
                </button>

                <button
                  onClick={logoutHandler}
                  className="block w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-white/5"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
