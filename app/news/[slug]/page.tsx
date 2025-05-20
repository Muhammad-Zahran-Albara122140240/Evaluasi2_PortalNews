import { scrapeBeritaList } from '@/lib/scraper';
import { scrapeBeritaDetailHTML } from '@/lib/scraper';
import { notFound } from 'next/navigation';

type Params = {
  params: { slug: string }
}

export default async function BeritaDetailPage({ params }: Params) {
  const list = await scrapeBeritaList();
  const berita = list.find((item) => item.slug === params.slug);

  if (!berita) return notFound();

  const htmlContent = await scrapeBeritaDetailHTML(berita.url);

  return (
    <main className="bg-gray-50 min-h-screen py-6 px-4 md:px-8 lg:px-16">
      <div className="w-full max-w-screen-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{berita.title}</h1>
        <p className="text-gray-500 mb-6">{berita.date || "Hari Ini"}</p>
        
        <article
          className="prose prose-lg md:prose-xl lg:prose-xl max-w-none w-full text-gray-700 prose-img:mx-auto prose-img:w-full text-justify"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </main>
  );
}
