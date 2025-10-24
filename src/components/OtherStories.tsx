import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Profile, Story } from "@prisma/client";
import { Avatar } from "@radix-ui/themes";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function OtherStories({
  otherProfiles,
  otherStories,
}: {
  otherProfiles: Profile[];
  otherStories: Story[];
}) {
  return (
    <div className="flex gap-3">
      {otherProfiles.map((profile) => (
        <Dialog key={profile.id}>
          <DialogTrigger asChild>
            <div className="w-24 flex flex-col justify-center items-center cursor-pointer">
              <div className="p-1 rounded-full bg-gradient-to-tr from-orange-300 to-red-600">
                <div className="p-0.5 bg-white rounded-full">
                  <Avatar
                    size="6"
                    radius="full"
                    fallback="avatar"
                    src={profile.avatar || ""}
                  />
                </div>
              </div>
              <p className="text-center text-gray-400 text-sm mt-1">
                {profile.username}
              </p>
            </div>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px] h-[90%] rounded-md">
            <DialogHeader>
              <DialogTitle>
                 <div className="flex gap-2 items-center">
                    <img
                        src={profile.avatar || ""}
                        className="rounded-full w-8 h-8"
                    />
                    <p className="text-sm">{profile.username}</p>
                </div>
              </DialogTitle>
            </DialogHeader>

            <Carousel className="max-w-xs mx-auto">
              <CarouselContent>
                {otherStories
                  .filter((story) => story.author === profile.email)
                  .map((story) => (
                    <CarouselItem key={story.id}>
                      <div className="p-1">
                        <Card className="p-0">
                          <CardContent className="flex aspect-square items-center justify-center p-0">
                            <img
                              src={story.image}
                              alt=""
                              className="rounded-md"
                            />
                          </CardContent>
                        </Card>
                        <p className="text-sm mt-1 text-center">
                          {story.caption}
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>

              <CarouselPrevious className="ml-2" />
              <CarouselNext className="mr-2" />
            </Carousel>

          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}