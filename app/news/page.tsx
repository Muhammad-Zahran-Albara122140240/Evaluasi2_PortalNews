"use client";

import { scrapeBeritaList } from '@/lib/scraper';
import { useState, useEffect } from 'react';
import Link from 'next/link';

function removeDuplicateBerita(berita: any[]) {
  const seen = new Map();

  for (const item of berita) {
    const key = item.slug;

    if (!seen.has(key)) {
      seen.set(key, item);
    } else {
      const existing = seen.get(key);
      if (!existing.image && item.image) {
        seen.set(key, item); // Replace jika yang baru punya gambar
      }
    }
  }

  return Array.from(seen.values());
}

export default function BeritaPage({ beritalist = [] }: { beritalist?: any[] }) {
  const [berita, setBerita] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        let data;
        if (beritalist.length === 0) {
          data = await scrapeBeritaList();
        } else {
          data = beritalist;
        }

        const uniqueBerita = removeDuplicateBerita(data);
        setBerita(uniqueBerita);
      } catch (error) {
        console.error("Error loading berita:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [beritalist]);

  return (
    <div className="bg-orange-50 min-h-screen">
      <header className="bg-white py-6 shadow-md">
        <div className="px-4 max-w-xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-orange-500 text-center">
            Berita Nasional CNN Indonesia
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <div className="flex justify-center items-center col-span-full h-64">
              <p className="text-orange-500 text-2xl font-bold">Memuat berita...</p>
            </div>
          ) : berita.length > 0 ? (
            berita.map((item, i) => (
              <Link
                key={`${item.slug}-${i}`}
                href={`/news/${item.slug}`}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 block"
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
                  <h2 className="text-orange-700 hover:text-orange-500 font-bold text-lg mb-2">
                    {item.title}
                  </h2>
                  <div className="text-gray-500 text-sm mt-2">
                    {item.date || 'Tanggal tidak tersedia'}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">Tidak ada berita ditemukan</p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-orange-600 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} CNN Indonesia</p>
        </div>
      </footer>
    </div>
  );
}
