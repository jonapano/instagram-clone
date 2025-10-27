import { auth } from "@/auth";
import AllSearchResults from "@/components/AllSearchResults";
import Preloader from "@/components/Preloader";
import SearchForm from "@/components/SearchForm";
import SearchResults from "@/components/SearchResults";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function SearchPage({
    searchParams: {query},
}:{
    searchParams: {query:string}
}) {
    const session = await auth();
    if (!session) {
        return redirect("/")
    }
    return (
        <div>
            <div className="w-full">
                <div className="max-w-md mx-auto">
                    <SearchForm />
                    {typeof query !== 'undefined' && (
                        <Suspense fallback={<Preloader />}>
                            <SearchResults query={query} />
                        </Suspense>
                    )}
                </div>
            </div>
            {!query && (
                <AllSearchResults query={query} />
            )} 
        </div>
    )
}