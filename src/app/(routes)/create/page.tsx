import { auth } from "@/auth"
import CreatePageContent from "@/components/CreatePageContent"
import { redirect } from "next/navigation"

export default async function CreatePage() {
    const session = await auth()
    if (!session) {
        return redirect("/")
    }
    return (
        <CreatePageContent />
    )
}