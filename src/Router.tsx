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
      { path: "/", element: <Navigate to="/login" replace /> },
      { path: "/login", element: <AuthPage /> },
      { path: "/register", element: <AuthPage /> },
      { path: "/onboarding", element: <OnboardingPage /> },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      { path: "/feed", element: <FeedPage /> },
      { path: "/discover", element: <DirectoryPage /> },
      { path: "/chat", element: <ChatPage /> },
      { path: "/points", element: <PointsPage /> },
      { path: "/leaderboard", element: <LeaderboardPage /> },
      { path: "/profile", element: <ProfilePage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
