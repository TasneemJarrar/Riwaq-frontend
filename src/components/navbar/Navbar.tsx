import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Feed", to: "/feed" },
  { label: "Discover Mentors", to: "/discover" },
  { label: "Active Chats", to: "/chat" },
  { label: "Points Store", to: "/points" },
  { label: "Leaderboard", to: "/leaderboard" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface-1">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <NavLink to="/feed" className="text-text-primary font-semibold">
          SkillSwap
        </NavLink>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="rounded-pill bg-surface-soft px-3 py-1 text-xs text-text-secondary">
            ✉️ 2/5 Left
          </span>
          <span className="rounded-pill bg-gamification-soft px-3 py-1 text-xs">
            <span className="text-gamification-text">⚡ 350 Points</span>
          </span>
        </div>
      </div>
    </header>
  );
}
