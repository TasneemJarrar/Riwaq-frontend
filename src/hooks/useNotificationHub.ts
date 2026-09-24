import { useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { notificationHub } from "../lib/notificationHub";
import { type NotificationResponse } from "../api/notifications";
import { notificationKeys } from "./useNotifications";
import { useAuthStore } from "../store/useAuthStore";

export function useNotificationHub() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const queryClient = useQueryClient();

  const handleNotification = useCallback(
    (notification: NotificationResponse) => {
      queryClient.setQueryData<NotificationResponse[]>(
        notificationKeys.list(),
        (currentNotifications) => {
          if (!currentNotifications) {
            return [notification];
          }

          const exists = currentNotifications.some(
            (item) => item.id === notification.id
          );

          if (exists) {
            return currentNotifications.map((item) =>
              item.id === notification.id ? notification : item
            );
          }

          return [notification, ...currentNotifications];
        }
      );

      if (!notification.isRead) {
        queryClient.setQueryData<number>(
          notificationKeys.unreadCount(),
          (currentCount) => (currentCount ?? 0) + 1
        );
      }
    },
    [queryClient]
  );

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    const connect = async () => {
      try {
        const connection = await notificationHub.start();

        if (!connection || cancelled) {
          return;
        }

        cleanup = notificationHub.onNotification(handleNotification);
      } catch (error) {
        console.error("Failed to connect to notification hub:", error);
      }
    };

    connect();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [isAuthenticated, handleNotification]);
}