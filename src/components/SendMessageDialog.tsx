"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@radix-ui/themes"
import { Check } from "lucide-react";
import ChatButton from "./ChatButton";
import { useState } from "react";
import { Profile } from "@prisma/client";

export function SendMessageDialog({
    profiles
}:{
    profiles:Profile[]
}) {
   const [selectedOption, setSelectedOption] = useState("");
   const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }
    const filteredProfiles = profiles.filter(profile => 
        profile.username?.toLowerCase().includes(value.toLowerCase())
    );
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
            <Button variant="solid">Send message</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white border-white">
          <DialogHeader>
            <DialogTitle className="text-center pb-3 border-b">New Message</DialogTitle>
            <DialogDescription>
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 border-b pb-2">
            <label htmlFor="search">To:</label>
            <input 
            value={value} 
            onChange={handleInputChange} 
            className="w-full focus:outline-none caret-black" 
            type="text" 
            id="search" 
            placeholder="Search..."
            />
          </div>
          <div>
            {filteredProfiles.map(profile => (
                <div key={profile.id} className="flex items-center hover:bg-gray-100 cursor-pointer rounded-md">
                    <label htmlFor={profile.id} className="w-full p-2 cursor-pointer flex justify-between items-center">
                      <div className="flex items-center gap-3">
                          <div className="rounded-full overflow-hidden">
                              <img 
                              src={profile.avatar || ''}
                              className="w-12 h-12 rounded-full"
                              />
                          </div>
                          <p>{profile.username}</p>
                      </div>
                      <div className="relative w-5 h-5">
                        <input
                        type="radio"
                        id={profile.id}
                        name="profile"
                        value={profile.id || ''}
                        checked={selectedOption === profile.id}
                        onChange={handleChange}
                        className="peer appearance-none w-5 h-5 border border-gray-400 rounded-full cursor-pointer checked:border-gray-600"
                        />
                        <Check className="absolute inset-0 m-auto w-4 h-4 text-gray-700 opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none" />
                      </div>
                    </label>
                </div>
            ))}
          </div>
          <div className="flex justify-center w-full">
            <ChatButton selectedOption={selectedOption}/>
          </div>
          <DialogFooter className="">
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
