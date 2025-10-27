import { prisma } from "@/db"
import { Avatar } from "@radix-ui/themes"
import Link from "next/link"
import PostsGrid from "./PostsGrid"

export default async function AllSearchResults({query}:{query:string}){
    const profiles = await prisma.profile.findMany({
        take: 10,
    })
    const posts = await prisma.post.findMany({
        take: 100,
    })
    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-lg mt-4">
                Search results for "{query}"
            </h1>
            {profiles?.length > 0 && (
                <div className="grid mt-4 sm:grid-cols-2 gap-2">
                    {profiles.map(profile => (
                        <Link
                            key={profile.id} 
                            href={`/users/${profile.username}`} 
                            className="flex gap-2 bg-gray-200 border border-gray-300 p-2 rounded-full"
                        >
                            <div className="">
                                <Avatar
                                    size="4"
                                    radius="full" 
                                    fallback="user avatar" 
                                    src={profile.avatar || ''} 
                                />
                            </div>
                            <div>
                                <h3>{profile.name}</h3>
                                <h4 className="text-gray-500 text-sm">
                                    @{profile.username}
                                </h4>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            <div className="mt-4">
                <PostsGrid posts={posts} />
            </div>
        </div>
    )
}