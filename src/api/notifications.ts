import authAxiosInstance from "./authAxiosInstance";

export interface NotificationResponse {
  id: string;
  type: string | null;
  message: string | null;
  isRead: boolean;
  createdAt: string;
  relatedEntityId: string | null;
}

export interface UpdateNotificationRequest {
  isRead: boolean;
}

export const notificationsApi = {
  getAll: async (): Promise<NotificationResponse[]> => {
    const { data } = await authAxiosInstance.get<NotificationResponse[]>(
      "/api/notifications"
    );
    return data;
  },

  getUnreadCount: async (): Promise<number> => {
    const { data } = await authAxiosInstance.get<number>(
      "/api/notifications/unread-count"
    );
    return data;
  },

  update: async (
    notificationId: string,
    payload: UpdateNotificationRequest
  ): Promise<NotificationResponse> => {
    const { data } = await authAxiosInstance.patch<NotificationResponse>(
      `/api/notifications/${notificationId}`,
      payload
    );
    return data;
  },

  markAllAsRead: async (): Promise<void> => {
    await authAxiosInstance.post("/api/notifications/mark-all-as-read");
  },

  delete: async (notificationId: string): Promise<void> => {
    await authAxiosInstance.delete(`/api/notifications/${notificationId}`);
  },
};