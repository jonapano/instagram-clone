import { NextResponse } from "next/server";
import { broadcaster } from "@/lib/notifications/broadcaster";
import { prisma } from "@/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { recipientId, title, message, meta } = body;

    // persist the notification in DB
    const created = await prisma.notification.create({
      data: {
        recipientId,
        title,
        message,
        // data: meta ?? {},
        read: false,
      },
    });

    // publish the event to any connected SSE clients
    broadcaster.emit("notify", {
      type: "notification",
      id: created.id,
      recipientId,
      title,
      message,
    //   meta: created.data,
      createdAt: created.createdAt,
    });

    return NextResponse.json({ ok: true, notification: created });
  } catch (err) {
    console.error("push notification error", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
