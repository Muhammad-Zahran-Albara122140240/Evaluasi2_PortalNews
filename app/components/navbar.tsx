"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false }); // nonaktifkan auto redirect
    setTimeout(() => {
      router.push('/');
    }, 1000); // delay 2 detik
  };

  return (
    <nav className="bg-gradient-to-r from-orange-500 to-yellow-400 shadow-lg px-8 py-4 flex justify-between items-center rounded-b-lg">
      <Link href="/" className="font-bold text-xl text-white flex items-center transition-transform hover:scale-105">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        Portal Berita
      </Link>

      {session ? (
        <div className="flex items-center gap-2"> {/* Reduced gap for tighter spacing */}
          <div className="bg-white bg-opacity-20 px-2 py-1 rounded-full flex items-center"> {/* Reduced padding */}
            {session.user?.image && (
              <Image 
                src={session.user.image} 
                alt="Profile" 
                width={40} // Increased width
                height={40} // Increased height
                className="rounded-full" 
              />
            )}
            <span className="text-md text-orange-500 font-medium ml-1">{session.user?.email}</span> {/* Increased text size and added margin */}
          </div>
          <button
            onClick={handleLogout}
            className="bg-white text-orange-500 font-semibold px-4 py-2 rounded-full shadow hover:shadow-lg transform transition-transform hover:scale-105 focus:outline-none"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          href="/login"
          className="bg-white text-orange-500 font-semibold px-6 py-2 rounded-full shadow hover:shadow-lg transform transition-transform hover:scale-105 focus:outline-none"
        >
          Login
        </Link>
      )}
    </nav>
  );
}
