import { auth } from "@/auth";
import { prisma } from "@/db";
import { Avatar } from "@radix-ui/themes";
import { Story } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MyStoriesCarousel } from "./MyStoriesCarousel";

export default async function MyStories({ myStories }: { myStories: Story[] }) {
  const session = await auth();
  const myProfile = await prisma.profile.findFirst({
    where: { email: session?.user?.email || "" },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-24 flex flex-col items-center">
          <div className="p-1 rounded-full bg-gradient-to-tr from-orange-300 to-red-600">
            <div className="p-0.5 bg-white rounded-full cursor-pointer">
              <Avatar
                size="6"
                radius="full"
                fallback="avatar"
                src={myProfile?.avatar || ""}
              />
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm mt-1">My Stories</p>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] h-[90%] rounded-md bg-white border-white">
        <DialogHeader>
          <DialogTitle>
            <div className="flex gap-2 items-center">
                <img
                    src={myProfile?.avatar || ""}
                    className="rounded-full w-8 h-8"
                />
                <p className="text-sm">{myProfile?.username}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <MyStoriesCarousel myStories={myStories} />
      </DialogContent>
    </Dialog>
  );
}
