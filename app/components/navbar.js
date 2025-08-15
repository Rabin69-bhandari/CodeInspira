import { auth } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';
import Link from "next/link";

export default async function NavBar() {
  const { userId } = await auth();

  return (
    <nav
      className="flex justify-between items-center p-4 bg-white text-[rgb(79,57,246)] shadow-sm border-b border-gray-200"
    >
      {/* Logo */}
      <div className='h-15 w-15 flex  justify-center b items-center rounded-full'>
        <img src="inspira.png" alt="Inspira Logo" className="h-full rounded-full" />
      </div>

      {/* Links */}
      <div className="flex gap-6 items-center font-medium">
        <Link href="/" className="hover:text-[rgb(60,45,200)] transition">Home</Link>
        <Link href="/about" className="hover:text-[rgb(60,45,200)] transition">About</Link>
        <Link href="/contact" className="hover:text-[rgb(60,45,200)] transition">Contact</Link>

        {/* If logged in → Show UserButton, else → Show Get Started */}
        {userId ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Link
            href="/sign-in"
            className="px-4 py-2 bg-[rgb(79,57,246)] text-white hover:bg-[rgb(60,45,200)] rounded-lg font-semibold transition"
          >
            Get Started
          </Link>
        )}
      </div>
    </nav>
  );
}
