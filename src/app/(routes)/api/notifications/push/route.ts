import { NextRequest, NextResponse } from "next/server";
import { broadcast } from "@/lib/sse-broadcaster";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    broadcast({ title:"New Message",message: body.message || "New notification received" , recipientId: body.recieverId});

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error pushing notification:", err);
    return NextResponse.json({ success: false, error: "Failed to broadcast" }, { status: 500 });
  }
}
