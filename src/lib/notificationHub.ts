import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { getAuth } from "firebase/auth";
import type { NotificationResponse } from "../api/notifications";

let connection: HubConnection | null = null;

const getHubUrl = () => {
  const baseUrl = import.meta.env.VITE_BURL;

  if (!baseUrl) {
    throw new Error("VITE_BURL is not configured");
  }

  return `${baseUrl}/hubs/notifications`;
};

export const notificationHub = {
  async start() {
    if (connection?.state === "Connected") {
      return connection;
    }

    const firebaseUser = getAuth().currentUser;

    if (!firebaseUser) {
      return null;
    }

    const token = await firebaseUser.getIdToken();

    connection = new HubConnectionBuilder()
      .withUrl(getHubUrl(), { accessTokenFactory: () => token })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Warning)
      .build();

    await connection.start();

    return connection;
  },

  async stop() {
    if (connection) {
      await connection.stop();
      connection = null;
    }
  },

  onNotification(callback: (notification: NotificationResponse) => void) {
    if (!connection) {
      return () => {};
    }

    connection.on("NotificationReceived", callback);

    return () => {
      connection?.off("NotificationReceived", callback);
    };
  },
};