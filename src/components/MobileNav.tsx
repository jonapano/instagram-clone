"use client"
import Link from "next/link";
import { CameraIcon, HomeIcon, LayoutGridIcon, SearchIcon, Send, UserIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const path = usePathname();
      const searchActive = path.includes('/search');
      const browseActive = path.includes('/browse');
      const inboxActive = path.includes('/inbox')
      const profileActive = path.includes('/profile');
      const homeActive = !searchActive && !browseActive && !inboxActive && !profileActive;
    return (
        <div className="block lg:hidden fixed bottom-0 left-0 right-0">
            <div className="flex text-gray-600 *:flex *:items-center">
              <div className="pl-2 bg-white rounded-t-xl w-full relative z-10 *:size-12 *:flex *:items-center *:justify-center justify-around">
                <Link href="/" className={homeActive ? "text-red-600" : "text-gray-600"}>
                  <HomeIcon />
                </Link>
                <Link href="/search" className={searchActive ? "text-red-600" : "text-gray-600"}>
                  <SearchIcon />
                </Link>
              </div>
              <div className="size-14 relative -top-4 justify-center w-[140px]">
                <div className="absolute bg-blue-500 bg-clip-text border-white border-t-transparent border-l-transparent border-[50px] rounded-full rotate-45">
                  <div className="border-4 border-transparent size-14">
                    <Link href="/create" className="-rotate-45 bg-gradient-to-tr from-orange-300 to-red-600 size-12 flex justify-center items-center text-white rounded-full">
                      <CameraIcon />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="pr-2 bg-white rounded-t-xl w-full relative z-10 *:size-12 *:flex *:items-center *:justify-center justify-around">
                <Link href="/browse" className={browseActive ? "text-red-600" : "text-gray-600"}>
                  <LayoutGridIcon />
                </Link>
                <Link href="/inbox" className={inboxActive ? "text-red-600" : "text-gray-600"}>
                  <Send />
                </Link>
                <Link href="/profile" className={profileActive ? "text-red-600" : "text-gray-600"}>
                  <UserIcon />
                </Link>
              </div>
            </div>
        </div>
    )
}