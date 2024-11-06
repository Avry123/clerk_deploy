import {  UserButton } from "@clerk/nextjs";
import {  auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        {userId ? (
          <div className="flex items-center gap-4">
            <p>Welcome, you're signed in!</p>
            <UserButton afterSignOutUrl="/"/>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link 
              href="/sign-in"
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}