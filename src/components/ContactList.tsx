import { shortTimeAgo } from "@/utils";
import { Message, Profile } from "@prisma/client";
import Link from "next/link";

export default function ContactList({
  profiles,
  lastMessages,
}: {
  profiles: Profile[];
  lastMessages: { contactId: string; message: Message | null }[];
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      {profiles.map((profile) => {
        const lastMessageObj = lastMessages.find(
          (lm) => lm.contactId === profile.id
        );
        const lastMessage = lastMessageObj?.message;

        return (
          <Link key={profile.id} href={`/inbox/${profile.id}`}>
            <div className="p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center gap-4">
                <img
                  src={profile.avatar || ""}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="font-medium">{profile.username}</span>
                  {lastMessage && (
                    <div className="flex gap-1 text-sm text-gray-600">
                      <span className="truncate max-w-[200px]">
                        {lastMessage.content}
                      </span>
                      <span>•</span>
                      <span>{shortTimeAgo(lastMessage.createdAt)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
