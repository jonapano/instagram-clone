import { auth } from "@/auth";
import ContactList from "@/components/ContactList";
import { prisma } from "@/db";
export default async function DefaultContactListPage() {
    const session = await auth();
    if (!session?.user?.email) {
        return <div>Please log in.</div>;
    }
    const sessionProfile = await prisma.profile.findFirstOrThrow({
        where:{email:session?.user?.email as string}
    })
    const messages = await prisma.message.findMany({
        where: {
        OR: [
            { senderId: sessionProfile.id },
            { receiverId: sessionProfile.id },
        ],
        },
    });
    const contactIds = messages.map((m) =>
        m.receiverId === sessionProfile.id ? m.senderId : m.receiverId
    );

    const uniqueContactIds = [...new Set(contactIds)];

    const profiles = await prisma.profile.findMany({
        where: {
        id: { in: uniqueContactIds },
        },
    });

    const lastMessages = await Promise.all(
        uniqueContactIds.map(async (contactId) => {
            const message = await prisma.message.findFirst({
            where: {
                OR: [
                { senderId: sessionProfile.id, receiverId: contactId },
                { senderId: contactId, receiverId: sessionProfile.id },
                ],
            },
            orderBy: {
                createdAt: 'desc',
            },
            });
            return { contactId, message };
        })
    );
    
    return (
        <ContactList profiles={profiles} lastMessages={lastMessages}/>
    );
}