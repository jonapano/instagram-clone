import { auth } from "@/auth";
import PostsGrid from "@/components/PostsGrid";
import Preloader from "@/components/Preloader";
import ProfileNav from "@/components/ProfileNav";
import ProfilePageInfo from "@/components/ProfilePageInfo";
import { prisma } from "@/db";
import { redirect } from "next/navigation";
import { Suspense } from "react";


export default async function bookmarkedPage() {
    const session = await auth();
    const profile = await prisma.profile.findFirst({where:{email:session?.user?.email as string}});
    if (!profile) {
        return redirect('/settings');
    }
    const bookmarks = await prisma.bookmark.findMany({
        where: {
            author: session?.user?.email as string
        }
    })
    const posts = await prisma.post.findMany({
        where: {
            id: {in: bookmarks.map(b => b.postId)}
        }
    })
    return (
        <div>
            <ProfilePageInfo 
                profile={profile} 
                isOurProfile={true} 
                ourFollow={null} />
            <ProfileNav 
                username={profile.username || ''} 
                isOurProfile={true} />
            <div className="mt-4">
                <Suspense fallback={<Preloader />}>
                    <PostsGrid posts={posts} />   
                </Suspense>
            </div>
        </div>
    )
}