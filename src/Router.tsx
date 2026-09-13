import { createBrowserRouter, Navigate } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";

import AuthPage from "./pages/auth/AuthPage";
import FeedPage from "./pages/feed/FeedPage";
import ProfilePage from "./pages/profile/ProfilePage";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/", element: <Navigate to="/login" replace /> },
      { path: "/login", element: <AuthPage /> },
      { path: "/register", element: <AuthPage /> },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      { path: "/feed", element: <FeedPage /> },
      { path: "/profile", element: <ProfilePage /> },
    ],
  },
]);
