import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Overview from "../pages/Overview";
import Users from "../pages/users/Users";
import Products from "../pages/Products";
import Settings from "../pages/Settings";
import Blogs from "../pages/blogs/Blogs";
import Documents from "../pages/Documents";
import Reports from "../pages/Reports";
import Members from "../pages/Members";
import Company from "../pages/Company";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import UserDetail from "../pages/users/UserDetail";
import PostDetail from "../pages/blogs/components/PostDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Overview /> },
      { path: "users", element: <Users /> },
      { path: "users/:id", element: <UserDetail /> },
      { path: "products", element: <Products /> },
      { path: "Blogs", element: <Blogs /> },
      { path: "/blogs/:id", element:<PostDetail /> },
      { path: "documents", element: <Documents /> },
      { path: "reports", element: <Reports /> },
      { path: "members", element: <Members /> },
      { path: "company", element: <Company /> },
      { path: "profile", element: <Profile /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
