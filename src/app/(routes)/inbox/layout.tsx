import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function InboxLayout({
    contactList,
    chat
}:{
    contactList: React.ReactNode,
    chat: React.ReactNode
}) {
    const session = await auth();
    if (!session) {
        return redirect("/")
    }
    return (
        <div className="flex h-full">
            <div className="w-[35%] pr-2 border-r border-gray-300">
                {contactList}
            </div>
            <div className="w-[65%]">
                {chat}
            </div>
        </div>
    )
}