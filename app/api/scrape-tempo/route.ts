import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

const TARGET_URL = 'https://tempo.co/ekonomi/ekonomi';

export async function GET() {
  try {
    const { data: html } = await axios.get(TARGET_URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
      },
    });

    const $ = cheerio.load(html);
    const figureElements = $('figure').slice(0, 10);
    const articles: {
      title: string;
      image?: string;
      url?: string;
      date: string;
    }[] = [];

    for (let i = 0; i < figureElements.length; i++) {
      const el = figureElements[i];

      const title = $(el).find('figcaption a').first().text().trim();
      const relativeUrl = $(el).find('figcaption a').first().attr('href');
      const image = $(el).find('img').first().attr('src');
      const url = relativeUrl ? `https://tempo.co${relativeUrl}` : undefined;

      let date = getTodayDate(); // fallback

      if (url) {
        try {
          const detailRes = await axios.get(url, {
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
            },
          });
          const $$ = cheerio.load(detailRes.data);
          const extractedDateFull = $$('p.text-neutral-900.text-sm').first().text().trim();

          // Ambil hanya bagian tanggal tanpa jam, contoh: "19 Mei 2025 | 12.00 WIB" => "19 Mei 2025"
          const extractedDate = extractedDateFull.split('|')[0].trim();
          if (extractedDate) date = extractedDate;
        } catch (err) {
          console.warn(`Gagal ambil tanggal untuk: ${url}`);
        }
      }

      if (title && url) {
        articles.push({ title, url, image, date });
      }
    }

    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Scrape failed:', error);
    return NextResponse.json(
      { error: 'Failed to scrape the page' },
      { status: 500 }
    );
  }
}

// ✅ Format fallback tanggal hari ini → 20 Mei 2025
function getTodayDate(): string {
  const localeDate = new Date().toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  });
  return localeDate;
}
