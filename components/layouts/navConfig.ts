import { SidebarLink } from "@/components/layouts/SidebarItems";
import { Cog, User, HomeIcon, UserSquare } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Home", icon: HomeIcon },
  { href: "/account", title: "Account", icon: User },
  { href: "/settings", title: "Settings", icon: Cog },
];

export const additionalLinks: AdditionalLinks[] = [
  {
    title: "Entities",
    links: [
      {
        href: "/students",
        title: "Students",
        icon: UserSquare,
      },
      {
        href: "/teachers",
        title: "Teachers",
        icon: UserSquare,
      },
    ],
  },
];
