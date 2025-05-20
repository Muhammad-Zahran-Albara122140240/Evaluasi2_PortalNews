"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Redirect if already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/news-selection");
    }
  }, [status, router]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white bg-opacity-90 rounded-2xl shadow-xl overflow-hidden p-8">
        <div className="text-center mb-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          
          <h1 className="mt-4 text-3xl font-bold text-gray-800">Login Portal Berita</h1>
          <p className="mt-2 text-gray-600">Akses berita terkini dengan sekali klik</p>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Login dengan
            </span>
          </div>
        </div>
        
        <div className="mt-6">
          <button
            onClick={() => signIn("google", { callbackUrl: "/news-selection" })}
            className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transform transition-transform hover:scale-105"
          >
            <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" fill="white"/>
            </svg>
            Login with Google
          </button>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Dapatkan akses ke berita terbaru dan terpercaya
          </p>
        </div>

        <div className="mt-6 flex justify-center space-x-3">
          <div className="h-2 w-2 rounded-full bg-orange-500"></div>
          <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
          <div className="h-2 w-2 rounded-full bg-orange-500"></div>
        </div>
      </div>
    </div>
  );
}