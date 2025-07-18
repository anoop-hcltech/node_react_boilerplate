import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sidebarRouteList } from "../../utils/sidebarItems";
// import { useServerHealth } from "../../hooks/usePolling";
import { roles } from "../../interface/role";
import { useProfileQuery } from "../../redux/services/authApi";
import { logout } from "../../utils/logout";

const user: { token: string; role: roles } = JSON.parse(
  localStorage.getItem("user") || "null"
);

const Header: React.FC = () => {
  const { data } = useProfileQuery();
  console.log("data", data);

  const [isOpen, setIsOpen] = useState(false);
  // const URL = import.meta.env.VITE_API_URL;

  return (
    <header className="bg-gradient-to-br from-violet-600 via-violet-500 to-violet-400 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-semibold tracking-wide">
          Dashboard
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {/* <ServerHealthChecker url={`${URL}/health`} /> */}
          <span className="text-white font-medium">{data?.name}</span>
          <Link
            to="/login"
            className="text-white hover:underline hover:text-gray-100 transition"
          >
            Logout
          </Link>
        </div>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6"
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

      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 transition-all duration-300">
          {sidebarRouteList?.[user?.role || "guest"]?.map((route) => (
            <Link
              to={route.link}
              key={route.link}
              className="block text-white text-base hover:underline"
              onClick={() => setIsOpen(false)}
            >
              {route.name}
            </Link>
          ))}
          <div
            className="block text-white text-base hover:underline"
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
          >
            Logout
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
