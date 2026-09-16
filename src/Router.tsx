import { createBrowserRouter, Navigate } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";

import AuthPage from "./pages/auth/AuthPage";
import OnboardingPage from "./pages/onboarding/OnboardingPage";
import FeedPage from "./pages/feed/FeedPage";
import DirectoryPage from "./pages/directory/DirectoryPage";
import PointsPage from "./pages/points/PointsPage";
import LeaderboardPage from "./pages/leaderboard/LeaderboardPage";
import ProfilePage from "./pages/profile/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import ChatPage from "./pages/chat/ChatPage";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/login" replace />,
      },
      {
        path: "/login",
        element: <AuthPage />,
        handle: { seoKey: "login" },
      },
      {
        path: "/register",
        element: <AuthPage />,
        handle: { seoKey: "register" },
      },
      {
        path: "/onboarding",
        element: <OnboardingPage />,
        handle: { seoKey: "onboarding" },
      },
    ],
  },

  {
    element: <AppLayout />,
    children: [
      {
        path: "/feed",
        element: <FeedPage />,
        handle: { seoKey: "feed" },
      },
      {
        path: "/discover",
        element: <DirectoryPage />,
        handle: { seoKey: "discover" },
      },
      {
        path: "/chat",
        element: <ChatPage />,
        handle: { seoKey: "chat" },
      },
      {
        path: "/points",
        element: <PointsPage />,
        handle: { seoKey: "points" },
      },
      {
        path: "/leaderboard",
        element: <LeaderboardPage />,
        handle: { seoKey: "leaderboard" },
      },
      {
        path: "/profile",
        element: <ProfilePage />,
        handle: { seoKey: "profile" },
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
    handle: { seoKey: "notFound" },
  },
]);