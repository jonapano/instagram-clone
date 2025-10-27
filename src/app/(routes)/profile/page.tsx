import { prisma } from "@/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ProfilePageContent from "@/components/ProfilePageContent";


export default async function ProfilePage() {
    const session = await auth();
    const profile = await prisma.profile.findFirst({where:{email:session?.user?.email as string}});
    if (!session) {
        return redirect("/")
    }
    if (!profile) {
        return redirect('/settings');
    }
    return (
        <ProfilePageContent 
            ourFollow={null}
            profile={profile} 
            isOurProfile={true} 
        />
    );
}