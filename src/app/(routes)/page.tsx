import { auth, signIn } from "@/auth"
import Preloader from "@/components/Preloader";
import UserHome from "@/components/UserHome";
import { Suspense } from "react";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      {session && (
        <Suspense fallback={<Preloader />}>
          <UserHome session={session} />
        </Suspense>
      )}
      {!session && (
        <div className="flex min-h-screen items-center justify-center">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200">
            <h2 className="mb-4 text-center text-2xl font-semibold text-gray-800">
              Welcome Back
            </h2>
            <p className="mb-8 text-center text-sm text-gray-500">
              Sign in to continue to your account
            </p>

            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
              className="flex justify-center"
            >
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 cursor-pointer"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google Logo"
                  className="h-5 w-5"
                />
                Sign in with Google
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
