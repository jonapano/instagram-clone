'use client';
import { postStory } from "@/actions";
import { TextArea } from "@radix-ui/themes";
import { Button } from "@/components/ui/button"
import { CloudUploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DialogClose } from "@/components/ui/dialog"

export default function NewStoryForm() {
    const [imageUrl, setImageUrl] = useState('');
        const [file, setFile] = useState<File|null>(null);
        const [isUploading, setIsUploading] = useState(false);
        const fileInRef = useRef<HTMLInputElement>(null);
        const router = useRouter();
        useEffect(() => {
            if (file) {
                setIsUploading(true);
                const data = new FormData();
                data.set("file", file);
                fetch("/api/upload", {
                    method: "POST",
                    body: data,
                }).then(response => {
                    response.json().then(url => {
                        setImageUrl(url);
                        setIsUploading(false);
                    });
                });
            }
        }, [file]);
    return (
         <form 
        className="max-w-md mx-auto"
        action={async data => {
            const id = await postStory(data);
            router.push(`/`);
            router.refresh(); 
        }}>
            <input type="hidden" name="image" value={imageUrl} />
            <div className="flex flex-col gap-4">
                <div>
                    <div className="min-h-64 p-2 bg-gray-400 rounded-md relative">
                        {imageUrl && (
                            <img src={imageUrl} className="rounded-md" alt="" />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <input
                            onChange={ev => setFile(ev.target.files?.[0] || null)} 
                            className="hidden"
                            type="file" 
                            ref={fileInRef} />
                            <Button
                            disabled={isUploading} 
                            onClick={() => fileInRef?.current?.click()}
                            type="button" 
                            variant="ghost"
                            className="cursor-pointer">
                                {!isUploading && (
                                    <CloudUploadIcon size={16} />
                                )}
                                {isUploading ? 'Uploading...' : 'Choose image'}
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <TextArea name="caption" className="h-16" placeholder="Add a caption..." />
                </div>
                <DialogClose asChild>
                    <Button type="submit" variant="outline" className="mx-auto cursor-pointer">Publish</Button>
                </DialogClose>
            </div>
        </form>
    )
}