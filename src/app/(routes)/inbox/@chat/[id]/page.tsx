import { auth } from "@/auth";
import SendMessage from "@/components/SendMessage";
import { prisma } from "@/db";
import { Avatar } from "@radix-ui/themes";
import { format } from "date-fns";

export default async function ChatPage({ params }: { params: Promise<{ id: string }>}) {
    const session = await auth();
    if (!session?.user?.email) {
        return <div>Please log in.</div>;
    }
    const sessionProfile = await prisma.profile.findFirstOrThrow({
        where: { email: session?.user?.email },
    });
    const { id } =  await  params;
    const profile = await prisma.profile.findFirst({
        where: { id },
    });
    if (!profile) {
        return <div>Profile not found</div>;
    }
    const messages = await prisma.message.findMany({
        where: {
            OR: [
                { senderId: sessionProfile.id, receiverId: id },
                { senderId: id, receiverId: sessionProfile.id },
            ]
        },
        orderBy: {
            createdAt: 'asc'
        }
    });
    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-4 ml-4 pb-3 border-b">
                <Avatar 
                src={profile.avatar || ""}
                fallback="avatar"
                size="4" 
                radius="full"
                />
                {profile.username}
            </div>
            <div className="pl-4 pb-4 pt-3 flex flex-col gap-2">
                {messages.map(message => (
                    <div key={message.id} className={`${message.senderId === id ? 'self-start' : 'self-end'}`}>
                        <div className={`py-2 px-4 rounded-3xl ${message.senderId === id ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}>
                            {message.content}
                        </div>
                        <div className="flex justify-end text-sm pr-2">
                            {format(message.createdAt, 'HH:mm')}
                        </div>
                    </div>
                ))}
            </div>
            <SendMessage receiverId={id}/>
        </div>
    );
}