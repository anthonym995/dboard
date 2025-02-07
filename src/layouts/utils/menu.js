import { NewspaperIcon, ChartPieIcon, HomeIcon, UsersIcon } from "@heroicons/react/24/outline";

export const navigation = [
  { name: "Overview", href: "/", icon: HomeIcon },
  { name: "Users", href: "users", icon: UsersIcon },
  { name: "Blogs", href: "blogs", icon: NewspaperIcon },
  { name: "Reports", href: "reports", icon: ChartPieIcon },
];

export const teams = [{ id: 1, name: "Members", href: "members", initial: "M", current: false }];

export const userNavigation = [
  { name: "Your profile", href: "profile" },
  { name: "Sign out", href: "#" },
];
