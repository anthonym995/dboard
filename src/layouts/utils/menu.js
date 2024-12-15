import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export const navigation = [
  { name: "Overview", href: "/", icon: HomeIcon },
  { name: "Users", href: "users", icon: UsersIcon },
  { name: "Products", href: "products", icon: FolderIcon },
  { name: "Calendar", href: "calendar", icon: CalendarIcon },
  { name: "Documents", href: "documents", icon: DocumentDuplicateIcon },
  { name: "Reports", href: "reports", icon: ChartPieIcon },
];

export const teams = [
  { id: 1, name: "Members", href: "members", initial: "M", current: false },
  { id: 2, name: "Company", href: "company", initial: "C", current: false },
];

export const userNavigation = [
  { name: "Your profile", href: "profile" },
  { name: "Sign out", href: "#" },
];
