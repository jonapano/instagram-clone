import { NextRequest } from "next/server";
import { addClient, removeClient } from "@/lib/sse-broadcaster";
import { Notif } from "@/lib/notifications/broadcaster";

export async function GET(req: NextRequest) {
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const clientId = Date.now();

  const encoder = new TextEncoder();
  const send = (data: Notif) => writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));

  addClient({ id: clientId, res: writer });
  send({ message: "Connected to SSE stream" });

  req.signal.addEventListener("abort", () => {
    removeClient(clientId);
    writer.close();
  });

  return new Response(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
