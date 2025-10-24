import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Story } from "@prisma/client"

export function MyStoriesCarousel({myStories}:{myStories:Story[]}) {
  return (
    <Carousel className="max-w-xs mx-auto">
      <CarouselContent>
        {myStories.map(story => (
            <CarouselItem key={story.id}>
            <div className="p-1">
                <Card className="p-0">
                <CardContent className="flex aspect-square items-center justify-center p-0">
                    <div>
                        <img src={story.image} alt="" className="rounded-md" />
                    </div>
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
  )
}
