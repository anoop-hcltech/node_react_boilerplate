import React from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebarRouteList } from "../../utils/sidebarItems";
import { roles } from "../../interface/role";
// Import Heroicons
import {
  HomeIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";

const iconMap: Record<string, React.ElementType> = {
  HomeIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  BeakerIcon,
};

const user: { token: string; role: roles } = JSON.parse(
  localStorage.getItem("user") || "null"
);

const Sidebar: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const location = useLocation();

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 bg-gradient-to-br from-violet-700 via-violet-500 to-violet-400 p-6 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-64 shadow-2xl backdrop-blur-xl border-r border-violet-200/20`}
    >
      <h2 className="text-white text-2xl font-extrabold mb-8 tracking-wide flex items-center gap-2">
        <span className="inline-block bg-white/20 p-2 rounded-full">
          <HomeIcon className="w-7 h-7 text-white" />
        </span>
        My App
      </h2>
      <nav className="space-y-2">
        <SidebarLink
          to="/"
          currentPath={location.pathname}
          label="Home"
          icon={HomeIcon}
        />
        {sidebarRouteList?.[user?.role || "guest"]?.map((route) => (
          <SidebarLink
            key={route.link}
            to={route.link}
            label={route.name}
            icon={iconMap[route.icon]}
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
  icon?: React.ElementType;
  currentPath: string;
}> = ({ to, label, icon: Icon, currentPath }) => {
  const isActive = currentPath === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-all duration-200 group text-lg ${
        isActive
          ? "bg-white text-violet-700 shadow-md"
          : "text-white hover:bg-white/10 hover:pl-6"
      }`}
    >
      {Icon && (
        <Icon
          className={`w-6 h-6 ${
            isActive
              ? "text-violet-700"
              : "text-violet-200 group-hover:text-white"
          }`}
        />
      )}
      <span>{label}</span>
    </Link>
  );
};

export default Sidebar;
