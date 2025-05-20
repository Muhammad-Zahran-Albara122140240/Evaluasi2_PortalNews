"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Use a different name than 'default' for the component
export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Redirect if user is logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/news-selection");
    }
  }, [status, router]);
  
  // Show loading state while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 w-6 h-6 rounded-full bg-orange-500 animate-ping opacity-75"></div>
            <div className="relative w-6 h-6 rounded-full bg-orange-500"></div>
          </div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Only render the actual content if not authenticated
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Welcome to my Portal News!!!
          </h1>
          
          <p className="text-xl text-gray-700 mb-10">
            Silahkan log in untuk melihat berita.
          </p>
          
          <Link 
            href="/login" 
            className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform transition-transform hover:scale-105 focus:outline-none"
          >
            Login Sekarang
          </Link>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-orange-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="text-lg font-semibold mb-2 text-orange-500">Berita Terkini</h3>
              <p className="text-gray-600">Dapatkan informasi terbaru dari berbagai sumber tepercaya.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-yellow-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-lg font-semibold mb-2 text-orange-500">Artikel Lengkap</h3>
              <p className="text-gray-600">Nikmati beragam artikel dengan pembahasan mendalam.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-orange-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <h3 className="text-lg font-semibold mb-2 text-orange-500">Notifikasi</h3>
              <p className="text-gray-600">Dapatkan pemberitahuan untuk berita penting yang perlu Anda ketahui.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}