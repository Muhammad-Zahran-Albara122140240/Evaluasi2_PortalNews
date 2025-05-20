"use client";

import { useState, useEffect } from 'react';

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('http://localhost:3000/api/scrape-tempo', {
          cache: 'no-store',
        });
        
        if (!res.ok) throw new Error('Gagal ambil data');
        
        const newsData = await res.json();
        setData(newsData); // <- benar
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-orange-500 text-2xl font-bold">Berita lagi dikumpulin, sabar ya...</div>
      </div>
    );
  }

  return (
    <div className="bg-orange-50 min-h-screen">
      {/* Header */}
      <header className="bg-white py-6 shadow-md">
        <div className="px-4 max-w-xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-orange-500 text-center">
            Berita Kompas Nasional
          </h1>
        </div>
      </header>

      {/* News Content */}
      <main className="container mx-auto px-4 py-8">
        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map((item, i) => (
            <div 
              key={i} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {item.image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-orange-700 hover:text-orange-500 font-bold text-lg block mb-2"
                >
                  {item.title}
                </a>
                <div className="text-gray-500 text-sm mt-2">
                  {item.date || 'Tanggal tidak tersedia'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-orange-600 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Kompas</p>
        </div>
      </footer>
    </div>
  );
}