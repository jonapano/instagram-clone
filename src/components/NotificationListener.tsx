"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

type NotificationPayload = {
  type: string;
  recipientId: string;
  title?: string;
  message?: string;
  id?: string;
  meta?: any;
};

export default function NotificationListener({ currentUserId }: { currentUserId: string }) {
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!currentUserId) return;

    const url = `/api/notifications/stream`;
    const es = new EventSource(url);
    esRef.current = es;

    es.addEventListener("notification", (e: MessageEvent) => {
      try {
        const payload: NotificationPayload = JSON.parse(e.data);
        // filter notifications for the current user (server could also target specific stream)
        if (payload.recipientId !== currentUserId) return;

        // show toast using sonner (shadcn recommends sonner)
        toast(`${payload.title ?? "Notification"} — ${payload.message ?? ""}`, {
          description: payload.message,
          // you can pass actions, id, etc.
        });
      } catch (err) {
        console.error("invalid SSE payload", err);
      }
    });

    es.onerror = (err) => {
      console.error("SSE error", err);
      // Optionally: attempt reconnect logic (EventSource does basic reconnect automatically)
    };

    return () => {
      try {
        es.close();
      } catch {}
    };
  }, [currentUserId]);

  return null;
}
