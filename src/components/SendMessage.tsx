"use client"
import { sendMessage } from "@/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SendMessage({receiverId}:{receiverId:string}) {
    const router = useRouter();
    const [text, setText] = useState("");
    const sendMessageWithId = sendMessage.bind(null, receiverId);
    return (
       <form action={async data => {
            await sendMessage(receiverId, data);
            setText("");
            router.refresh();
        }} className="pl-4">
            <div className="flex items-center gap-3 w-full border border-gray-600 rounded-full py-2 px-4">
                <input
                    name="text"
                    placeholder="Message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="flex-grow outline-none resize-none focus:resize-none h-6"
                />
                <button type="submit" className="cursor-pointer text-blue-600 text-sm">Send</button>
            </div>
        </form>
    )
}