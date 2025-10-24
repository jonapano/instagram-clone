// components/Notifications.tsx
import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io();

export default function Notifications({ userId }: { userId: string }) {
  useEffect(() => {
    socket.on(`notification-${userId}`, (message) => {
      alert(`New notification: ${message}`);
    });

    return () => {
      socket.off(`notification-${userId}`);
    };
  }, [userId]);

  return null;
}
