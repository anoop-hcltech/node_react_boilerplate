import React from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebarRouteList } from "../../utils/sidebarItems";
import { roles } from "../../interface/role";

const user: { token: string; role: roles } = JSON.parse(
  localStorage.getItem("user") || "null"
);

const Sidebar: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const location = useLocation();

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 bg-gradient-to-br from-violet-600 via-violet-500 to-violet-400 p-6 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-64 shadow-xl`}
    >
      <h2 className="text-white text-2xl font-extrabold mb-8 tracking-wide">
        My App
      </h2>
      <nav className="space-y-2">
        <SidebarLink to="/" currentPath={location.pathname} label="Home" />
        {sidebarRouteList?.[user?.role || "guest"]?.map((route) => (
          <SidebarLink
            key={route.link}
            to={route.link}
            label={route.name}
            currentPath={location.pathname}
          />
        ))}
      </nav>
    </div>
  );
};

const SidebarLink: React.FC<{
  to: string;
  label: string;
  currentPath: string;
}> = ({ to, label, currentPath }) => {
  const isActive = currentPath === to;

  return (
    <Link
      to={to}
      className={`block px-4 py-2 rounded-md font-medium transition-all duration-200 ${
        isActive
          ? "bg-white text-blue-700 shadow-sm"
          : "text-white hover:bg-white/10 hover:pl-5"
      }`}
    >
      {label}
    </Link>
  );
};

export default Sidebar;
