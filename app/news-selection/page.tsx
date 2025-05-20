"use client";
import React from 'react';
import { useRouter } from 'next/navigation'


export default function NewsSelectionPreview() {
  // Array of news sources with their details
  const router = useRouter()
  const newsSources = [
    {
      name: "CNN Indonesia",
      route: "/news",
      bgColor: "bg-red-600",
      hoverColor: "hover:bg-red-700",
      textColor: "white"
    },
    {
      name: "Kompas",
      route: "/news2",
      bgColor: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
      textColor: "white"
    },
    {
      name: "Tempo",
      route: "/news3",
      bgColor: "bg-green-600",
      hoverColor: "hover:bg-green-700",
      textColor: "white"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full">
        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
          Pilih Sumber Berita
        </h1>
        
        {/* News Source Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsSources.map((source, index) => (
            <div 
              key={index}
              onClick={() => router.push(source.route)}
              className={`${source.bgColor} ${source.hoverColor} transition-all duration-300 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 h-64 flex flex-col items-center justify-center text-white p-6 cursor-pointer`}
            >
              <div className="w-32 h-32 relative mb-4 bg-white rounded-full p-4 flex items-center justify-center">
                {source.name === "CNN Indonesia" && (
                  <div className="text-red-600 font-bold text-center">
                    <div className="text-2xl">CNN</div>
                    <div className="text-sm">INDONESIA</div>
                  </div>
                )}
                {source.name === "Kompas" && (
                  <div className="text-orange-500 font-bold text-center">
                    <div className="text-2xl">KOMPAS</div>
                  </div>
                )}
                {source.name === "Tempo" && (
                  <div className="text-green-600 font-bold text-center">
                    <div className="text-2xl">TEMPO</div>
                  </div>
                )}
              </div>
              <h2 className="text-xl font-bold text-center">
                {source.name}
              </h2>
            </div>
          ))}
        </div>
        
        {/* Optional instructions */}
        <p className="text-gray-600 text-center mt-8">
          Klik pada salah satu media di atas untuk melihat berita terkini
        </p>
      </div>
    </div>
  );
}