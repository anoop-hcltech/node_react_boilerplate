import { ISidebarRoute } from "../interface/interface";
import { roles } from "../interface/role";

export const sidebarRouteList: Record<
  roles,
  (ISidebarRoute & { icon: string })[]
> = {
  admin: [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: "HomeIcon",
    },
    {
      name: "Profile",
      link: "/profile",
      icon: "UserIcon",
    },
    {
      name: "Logout",
      link: "/logout",
      icon: "ArrowRightOnRectangleIcon",
    },
    { name: "Test", link: "/test", icon: "BeakerIcon" },
  ],
  user: [],
  guest: [],
};
