import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

const TARGET_URL = 'https://www.kompas.com/sains/indeks';

export async function GET() {
  try {
    const { data: html } = await axios.get(TARGET_URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
      },
    });

    const $ = cheerio.load(html);

    const articles: {
      title: string;
      url: string;
      date: string;
      image?: string;
    }[] = [];

    $('div.articleItem').each((_, el) => {
      const anchor = $(el).find('a.article-link');
      const url = anchor.attr('href');
      const title = $(el).find('h2.articleTitle').text().trim();

      if (!url || !title) return;

      // Ambil tanggal dari URL → /read/YYYY/MM/DD/
      const dateMatch = url.match(/\/read\/(\d{4})\/(\d{2})\/(\d{2})\//);
      let date = '';
      if (dateMatch) {
        const [_, year, month, day] = dateMatch;
        date = formatDate(`${year}-${month}-${day}`);
      } else {
        date = getTodayDate(); // fallback
      }

      // Gambar (jika ada)
      const image = $(el).find('.articleItem-img img').attr('src') || undefined;

      articles.push({
        title,
        url,
        date,
        image,
      });
    });

    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Scrape Kompas gagal:', error);
    return NextResponse.json({ error: 'Gagal scrape Kompas' }, { status: 500 });
  }
}

// Format YYYY-MM-DD → 20 Mei 2025
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  });
}

// Fallback: tanggal hari ini
function getTodayDate(): string {
  const today = new Date();
  return today.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  });
}
