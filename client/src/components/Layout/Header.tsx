import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sidebarRouteList } from "../../utils/sidebarItems";
// import { useServerHealth } from "../../hooks/usePolling";
import { roles } from "../../interface/role";
import { useProfileQuery } from "../../redux/services/authApi";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const user: { token: string; role: roles } = JSON.parse(
  localStorage.getItem("user") || "null"
);

// const ServerHealthChecker = ({ url }: { url: string }) => {
//   const status = useServerHealth(url, 5000);

//   return (
//     <div className="flex items-center space-x-1 text-sm">
//       <span
//         className={`h-3 w-3 rounded-full ${
//           status === "online" ? "bg-green-500" : "bg-red-500"
//         }`}
//       ></span>
//       <span className="text-white">{status}</span>
//     </div>
//   );
// };

const Header: React.FC = () => {
  const { data } = useProfileQuery();
  // console.log("data", data);

  const [isOpen, setIsOpen] = useState(false);
  // const URL = import.meta.env.VITE_API_URL;

  // Helper to get user initials
  const getInitials = (name: string) => {
    if (!name) return "";
    const names = name.split(" ");
    return names
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="bg-gradient-to-br from-violet-700 via-violet-500 to-violet-400 shadow-lg backdrop-blur-md sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 text-white text-2xl font-bold tracking-wide hover:opacity-90 transition"
        >
          {/* Logo/Icon */}
          <svg
            className="w-8 h-8 text-white drop-shadow"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="#a78bfa"
            />
            <path
              d="M8 12l2 2 4-4"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Dashboard
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {/* <ServerHealthChecker url={`${URL}/health`} /> */}
          {/* User Avatar and Name */}
          <div className="flex items-center gap-2 bg-violet-600/60 px-3 py-1 rounded-full shadow-sm">
            <div className="w-8 h-8 bg-violet-300 text-violet-800 rounded-full flex items-center justify-center font-bold text-lg">
              {data?.name ? (
                getInitials(data.name)
              ) : (
                <UserCircleIcon className="w-7 h-7 text-violet-400" />
              )}
            </div>
            <span className="text-white font-medium truncate max-w-[120px]">
              {data?.name}
            </span>
          </div>
          <Link
            to="/login"
            className="bg-white/20 hover:bg-white/40 text-white font-semibold px-4 py-2 rounded-lg shadow transition border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            Logout
          </Link>
        </div>

        <button
          className="md:hidden text-white focus:outline-none hover:bg-white/10 p-2 rounded transition"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-2 transition-all duration-300 animate-fade-in-down bg-violet-500/95 rounded-b-xl shadow-xl mx-2 mt-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-violet-300 text-violet-800 rounded-full flex items-center justify-center font-bold text-lg">
              {data?.name ? (
                getInitials(data.name)
              ) : (
                <UserCircleIcon className="w-7 h-7 text-violet-400" />
              )}
            </div>
            <span className="text-white font-medium truncate max-w-[120px]">
              {data?.name}
            </span>
          </div>
          {sidebarRouteList?.[user?.role || "guest"]?.map((route) => (
            <Link
              to={route.link}
              key={route.link}
              className="block text-white text-base hover:underline hover:bg-violet-600/60 rounded px-3 py-2 transition"
              onClick={() => setIsOpen(false)}
            >
              {route.name}
            </Link>
          ))}
          <Link
            to="/home"
            className="block bg-white/20 hover:bg-white/40 text-white font-semibold px-4 py-2 rounded-lg shadow border border-white/10 transition mt-2"
            onClick={() => setIsOpen(false)}
          >
            Logout
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
