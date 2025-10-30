"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function NotificationListener({recieverId}:{recieverId: string}) {
  useEffect(() => {
    const eventSource = new EventSource("/api/notifications/stream");

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data?.message) {
          if (recieverId === data.recieverId)
          toast(
          <div className="relative flex justify-between items-end gap-x-3">
            <div className="flex-1">
              <div className="font-semibold text-sm">{data.title}</div>
              <div className="text-xs mt-1 text-neutral-80 line-clamp-3 w-full">
                {data.message}
              </div>
            </div>
           
            <button
              onClick={() => toast.dismiss()}
              className="bg-transparent text-black absolute -top-3 w-7 h-7 -right-3 p-1.5 sm:p-1.5 border-none  shadow-none"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>,
          {
            duration: 5000,
            position: "top-center",
          },
        );
        }
      } catch (e) {
        console.error("Invalid event data", e);
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE error", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return null;
}
