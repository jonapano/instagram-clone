import { PlusIcon } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import NewStoryForm from "./NewStoryForm"

export default function NewStory() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <div className="size-[90px] text-white bg-gradient-to-tr from-orange-300 to-red-600 rounded-full flex items-center justify-center cursor-pointer">
                        <PlusIcon size="42" />
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New Story</DialogTitle>
                </DialogHeader>
                <NewStoryForm />

                </DialogContent>
            </form>
        </Dialog>
    )
}
