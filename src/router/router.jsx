import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Overview from "../pages/Overview";
import Users from "../pages/users/Users";
import Settings from "../pages/Settings";
import Blogs from "../pages/blogs/Blogs";
import Reports from "../pages/Reports";
import Members from "../pages/Members";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import UserDetail from "../pages/users/UserDetail";
import BlogDetail from "../pages/blogs/BlogDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Overview /> },
      { path: "users", element: <Users /> },
      { path: "users/:id", element: <UserDetail /> },
      { path: "blogs", element: <Blogs /> },
      { path: "/blogs/:id", element: <BlogDetail /> },
      { path: "reports", element: <Reports /> },
      { path: "members", element: <Members /> },
      { path: "profile", element: <Profile /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
