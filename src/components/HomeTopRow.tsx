import { Follower, Profile } from "@prisma/client"
import NewStory from "./NewStory"
import { auth } from "@/auth";
import { prisma } from "@/db";
import MyStories from "./MyStories";
import OtherStories from "./OtherStories";

export default async function HomeTopRow({
    follows,
    profiles
}:{
    follows:Follower[],
    profiles:Profile[]
}) {
    const session = await auth();
    const sessionProfile = session?.user?.email;
    const myStories = await prisma.story.findMany({ where: {author: sessionProfile || ""}})
    const followedProfiles = await prisma.profile.findMany({ where: {id: {in: follows.map(f => f.followedProfileId)}}})
    const otherStories = await prisma.story.findMany({ where: {author: {in: followedProfiles.map(f => f.email)}}})
    const otherProfiles = await prisma.profile.findMany({ where: {email: {in: otherStories.map(s => s.author)}}})
    return (
        <div className="flex gap-3 lg:justify-center max-w-full overflow-x-auto">
            <div>
                <NewStory />
                <p className="text-center text-gray-400 text-sm">New Story</p>
            </div>
            {(myStories.length > 0) ?  (
                <MyStories myStories={myStories} /> ) :
                null
            }
            <OtherStories otherProfiles={otherProfiles} otherStories={otherStories} />
        </div>
    )
}