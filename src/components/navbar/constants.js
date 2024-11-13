import { IoHomeOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { IoNotificationsOutline } from "react-icons/io5";
import { SiMyget } from "react-icons/si";

export const dockData = [
  {
    name: "home",
    index: 1,
    icon: IoHomeOutline,
    text: "Home",
    protectedItem: false,
  },

  { name: "create", icon: FaPlus, text: "Create", protectedItem: true },
  {
    name: "notifications",
    icon: IoNotificationsOutline,
    text: "Notifications",
    protectedItem: true,
  },

  { name: "myblogs", icon: SiMyget, text: "My Blogs", protectedItem: true },
];
