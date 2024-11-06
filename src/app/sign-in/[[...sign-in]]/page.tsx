import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center border-2 border-white">
      <SignIn />
    </div>
  );
}