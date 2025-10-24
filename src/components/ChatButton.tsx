import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

export default function ChatButton({selectedOption}:{selectedOption:string}) {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/inbox/${selectedOption}`);
    }
    return (
        <form action={handleClick}>
           <Button className="w-90 cursor-pointer" variant="outline">Chat</Button> 
        </form>
    )
}