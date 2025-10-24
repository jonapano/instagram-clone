import { auth } from "@/auth";
import { SendMessageDialog } from "@/components/SendMessageDialog";
import { prisma } from "@/db";
import { Send } from "lucide-react";

export default async function ChatPage() {
  const session = await auth();
  const follows = await prisma.follower.findMany({
    where: {
      followingProfileEmail: session?.user?.email || '',
    }
  })
  const profiles = await prisma.profile.findMany({
    where: {
      id: {in: follows.map(f => f.followedProfileId)}
    }
  })
    return (
        <div className="flex justify-center items-center flex-col gap-2 h-full pl-4 lg:pl-8">
            <div className="border border-2 border-black h-12 w-12 flex justify-center items-center rounded-full">
                <Send />
            </div>
            <div className="text-center">
                <h1 className="text-xl">Your messages</h1>
                <p className="mb-2">Send a message to start a chat.</p>
                <SendMessageDialog profiles={profiles} />
            </div>
        </div>
    )
}