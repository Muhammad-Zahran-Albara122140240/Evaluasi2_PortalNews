import { scrapeBeritaList, scrapeBeritaDetailHTML } from '@/lib/scraper';
import { notFound } from 'next/navigation';

type Params = {
  params: { slug: string };
};

export default async function BeritaDetailPage({ params }: Params) {
  const list = await scrapeBeritaList();
  const berita = list.find((item) => item.slug === params.slug);

  if (!berita) return notFound();

  const htmlContent = await scrapeBeritaDetailHTML(berita.url);

  return (
    <main className="bg-gray-50 min-h-screen py-10 px-6 md:px-12">
      <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{berita.title}</h1>
        <p className="text-sm md:text-base text-gray-500 mb-8">{berita.date || "Hari Ini"}</p>

        <article
          className="prose prose-lg md:prose-xl lg:prose-xl max-w-none w-full text-gray-700 prose-img:mx-auto prose-img:w-full prose-figure:mx-auto prose-video:mx-auto prose-video:w-full"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </main>
  );
}
