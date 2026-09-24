import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Sun01Icon,
  Moon02Icon,
  Mail01Icon,
  FlashIcon,
  Menu01Icon,
  Cancel01Icon,
  UserIcon,
  Logout01Icon,
  Notification01Icon,
  Delete02Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import useThemeStore from "../../hooks/useThemeStore";
import logo from "../../assets/navbars/riwaq-logo.png";
import { useLogout } from "../../hooks/useLogout";
import {
  useDeleteNotification,
  useMarkAllNotificationsAsRead,
  useNotifications,
  useUnreadNotificationCount,
  useUpdateNotification,
  type NotificationResponse,
} from "../../hooks/useNotifications";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { mode, toggleTheme } = useThemeStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const logout = useLogout();

  useEffect(() => {
    if (!isNotificationsOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isNotificationsOpen]);

  const { data: notifications = [] } = useNotifications();
  const { data: unreadCount = 0 } = useUnreadNotificationCount();
  const updateNotification = useUpdateNotification();
  const markAllAsRead = useMarkAllNotificationsAsRead();
  const deleteNotification = useDeleteNotification();

  const navItems = [
    { label: t("nav.feed"), to: "/feed" },
    { label: t("nav.discover"), to: "/discover" },
    { label: t("nav.points"), to: "/points" },
    { label: t("nav.chats"), to: "/chat" },
    { label: t("nav.leaderboard"), to: "/leaderboard" },
  ];

  const switchLanguage = (lang: "en" | "ar") => {
    i18n.changeLanguage(lang);
  };

  const formatNotificationTime = (createdAt: string) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - created.getTime()) / 60000
    );

    if (diffInMinutes < 1) {
      return t("notifications.justNow");
    }

    if (diffInMinutes < 60) {
      return t("notifications.minutesAgo", { count: diffInMinutes });
    }

    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInHours < 24) {
      return t("notifications.hoursAgo", { count: diffInHours });
    }

    const diffInDays = Math.floor(diffInHours / 24);

    return t("notifications.daysAgo", { count: diffInDays });
  };

  const handleNotificationClick = (
    notification: NotificationResponse
  ) => {
    if (!notification.isRead) {
      updateNotification.mutate({
        notificationId: notification.id,
        payload: { isRead: true },
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface-1">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <NavLink
            to="/feed"
            className="flex items-center gap-1.5 sm:gap-2"
            onClick={() => setIsMenuOpen(false)}>
            <img src={logo} alt="Riwaq Logo" className="h-7 w-7 shrink-0 object-cover sm:h-8 sm:w-8" />
            <span className="truncate text-lg font-bold tracking-tight text-text-primary sm:text-xl">
              {t("brand")} <span className="hidden text-amber-400 sm:inline">•</span>
            </span>
          </NavLink>

          <div className="hidden items-center rounded-full border border-border bg-surface-soft p-1 sm:flex">
            <button
              type="button"
              onClick={() => switchLanguage("en")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                i18n.language === "en"
                  ? "bg-surface-1 text-text-primary shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}>
              EN
            </button>
            <button
              type="button"
              onClick={() => switchLanguage("ar")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                i18n.language === "ar"
                  ? "bg-surface-1 text-text-primary shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}>
              AR
            </button>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:bg-surface-soft hover:text-text-primary sm:h-9 sm:w-9"
            aria-label={t("actions.toggleTheme")}>
            <HugeiconsIcon
              icon={mode === "dark" ? Sun01Icon : Moon02Icon}
              size={18}
            />
          </button>
        </div>

        <nav className="hidden items-center rounded-full border border-border bg-surface-soft/50 p-1.5 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary-soft text-primary-text shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`
              }>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <div className="hidden items-center gap-1.5 rounded-full border border-border bg-surface-soft px-3 py-1.5 text-xs text-text-secondary sm:flex">
            <HugeiconsIcon icon={Mail01Icon} size={14} />
            <span>2/5 Left</span>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-gamification-soft px-2.5 py-1.5 text-xs font-medium text-gamification-text sm:px-3">
            <HugeiconsIcon icon={FlashIcon} size={14} />
            <span>
              350<span className="hidden sm:inline"> Points</span>
            </span>
          </div>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              type="button"
              onClick={() => setIsNotificationsOpen((open) => !open)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:bg-surface-soft hover:text-text-primary"
              aria-label={t("notifications.title")}
              aria-expanded={isNotificationsOpen}>
              <HugeiconsIcon icon={Notification01Icon} size={18} />

              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-error px-1 text-[10px] font-bold leading-none text-white ring-2 ring-surface-1">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute end-0 top-12 z-50 w-[min(380px,calc(100vw-24px))] overflow-hidden rounded-2xl border border-border bg-surface-1 shadow-xl">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary">
                      {t("notifications.title")}
                    </h3>
                    {unreadCount > 0 && (
                      <p className="mt-0.5 text-xs text-text-secondary">
                        {unreadCount} {t("notifications.unread")}
                      </p>
                    )}
                  </div>

                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={() => markAllAsRead.mutate()}
                      disabled={markAllAsRead.isPending}
                      className="text-xs font-medium text-primary-text transition-opacity hover:opacity-70 disabled:opacity-50">
                      {t("notifications.markAllRead")}
                    </button>
                  )}
                </div>

                <div className="max-h-[420px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-surface-soft text-text-secondary">
                        <HugeiconsIcon
                          icon={Notification01Icon}
                          size={20}
                        />
                      </div>
                      <p className="text-sm text-text-secondary">
                        {t("notifications.empty")}
                      </p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`group relative border-b border-border px-4 py-3 transition-colors last:border-b-0 hover:bg-surface-soft ${
                          !notification.isRead ? "bg-primary-soft/40" : ""
                        }`}>
                        <button
                          type="button"
                          onClick={() => handleNotificationClick(notification)}
                          className="block w-full pe-7 text-start">
                          <div className="flex gap-3">
                            <div
                              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                                notification.isRead
                                  ? "bg-surface-soft text-text-secondary"
                                  : "bg-primary-soft text-primary-text"
                              }`}>
                              <HugeiconsIcon
                                icon={
                                  notification.isRead
                                    ? CheckmarkCircle02Icon
                                    : Notification01Icon
                                }
                                size={16}
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <p
                                className={`text-sm leading-5 ${
                                  notification.isRead
                                    ? "text-text-secondary"
                                    : "font-medium text-text-primary"
                                }`}>
                                {notification.message || notification.type || t("notifications.title")}
                              </p>

                              <p className="mt-1 text-xs text-text-secondary">
                                {formatNotificationTime(notification.createdAt)}
                              </p>
                            </div>

                            {!notification.isRead && (
                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                            )}
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteNotification.mutate(notification.id)
                          }
                          disabled={deleteNotification.isPending}
                          className="absolute end-3 top-3 hidden h-7 w-7 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface-soft hover:text-error group-hover:flex disabled:opacity-50"
                          aria-label={t("notifications.delete")}>
                          <HugeiconsIcon icon={Delete02Icon} size={15} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <NavLink to="/profile" className="relative hidden shrink-0 sm:block">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-soft ring-2 ring-border">
              <HugeiconsIcon
                icon={UserIcon}
                size={18}
                className="text-text-secondary"
              />
            </div>
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-surface-1" />
          </NavLink>

          <button
            type="button"
            onClick={logout}
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:border-error hover:text-error sm:flex"
            aria-label="Logout">
            <HugeiconsIcon icon={Logout01Icon} size={18} />
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-text-secondary hover:text-text-primary sm:h-9 sm:w-9 md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}>
            <HugeiconsIcon
              icon={isMenuOpen ? Cancel01Icon : Menu01Icon}
              size={18}
            />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="flex flex-col gap-1 border-t border-border bg-surface-1 px-4 py-3 md:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary-soft text-primary-text"
                    : "text-text-secondary hover:bg-surface-soft hover:text-text-primary"
                }`
              }>
              {item.label}
            </NavLink>
          ))}

          <div className="mt-2 flex flex-wrap items-center justify-between gap-2.5 border-t border-border pt-3">
            <NavLink
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 text-sm font-medium text-text-secondary">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-soft ring-2 ring-border">
                <HugeiconsIcon
                  icon={UserIcon}
                  size={14}
                  className="text-text-secondary"
                />
              </div>
              Profile
            </NavLink>

            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                logout();
              }}
              className="flex items-center gap-2 text-sm font-medium text-text-secondary">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-soft ring-2 ring-border">
                <HugeiconsIcon icon={Logout01Icon} size={14} />
              </div>
              Logout
            </button>

            <div className="flex items-center gap-1.5 rounded-full border border-border bg-surface-soft px-3 py-1.5 text-xs text-text-secondary">
              <HugeiconsIcon icon={Mail01Icon} size={14} />
              <span>2/5 Left</span>
            </div>

            <div className="flex items-center rounded-full border border-border bg-surface-soft p-1">
              <button
                type="button"
                onClick={() => switchLanguage("en")}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                  i18n.language === "en"
                    ? "bg-surface-1 text-text-primary shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}>
                EN
              </button>
              <button
                type="button"
                onClick={() => switchLanguage("ar")}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                  i18n.language === "ar"
                    ? "bg-surface-1 text-text-primary shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}>
                AR
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}