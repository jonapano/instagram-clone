import { NextResponse } from "next/server";
import { broadcaster } from "@/lib/notifications/broadcaster";

export const runtime = "nodejs"; // ensure Node runtime if you need it

export async function GET(req: Request) {
  const headers = new Headers({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
  });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const onNotify = (payload: any) => {
        // SSE message: event: notification\ndata: {...}\n\n
        const data = `event: notification\ndata: ${JSON.stringify(payload)}\n\n`;
        controller.enqueue(encoder.encode(data));
      };

      // keep the connection alive: send a comment every 15s
      const keepAlive = setInterval(() => {
        controller.enqueue(encoder.encode(":\n\n"));
      }, 15000);

      broadcaster.on("notify", onNotify);

      // cancel is called when client disconnects
      this.cancel = () => {
        broadcaster.off("notify", onNotify);
        clearInterval(keepAlive);
        try { controller.close(); } catch (e) {}
      };
      console.log('Consection Esablished')
    },
    cancel() {
      // fallback cancellation (already bound in start)
    },
  });

  return new Response(stream, { headers });
}
