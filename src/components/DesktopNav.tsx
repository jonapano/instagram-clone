import logo from '../app/ig.png';
import { CameraIcon, HomeIcon, LayoutGridIcon, SearchIcon, Send, UserIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DesktopNav() {
    return (
        <div className="hidden lg:block px-4 pb-4 w-48 shadow-md shadow-gray-400">
            <div className="top-4 sticky">
                <Image className="" src={logo} alt="" />
                <div className="ml-1 inline-flex flex-col gap-6 mt-8 *:flex *:items-center *:gap-2">
                    <Link href="/" className="">
                        <HomeIcon />
                        Home
                    </Link>
                    <Link href="/search" className="">
                        <SearchIcon />
                        Search
                    </Link>
                    <Link href="/browse" className="">
                        <LayoutGridIcon />
                        Browse
                    </Link>
                    <Link href="/inbox" className="">
                        <Send />
                        Messages
                    </Link>
                    <Link href="/profile" className="">
                        <UserIcon />
                        Profile
                    </Link>
                    <Link href="/create" className="">
                        <CameraIcon />
                        Create
                    </Link>
                </div>
            </div>
        </div>
    )
}