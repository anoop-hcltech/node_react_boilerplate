import { ISidebarRoute } from "../interface/interface";
import { roles } from "../interface/role";

export const sidebarRouteList: Record<roles, ISidebarRoute[]> = {
  admin: [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Profile",
      link: "/profile",
    },
    {
      name: "Logout",
      link: "/logout",
    },
    { name: "Test", link: "/test" },
  ],
  user: [],
  guest: [],
};
