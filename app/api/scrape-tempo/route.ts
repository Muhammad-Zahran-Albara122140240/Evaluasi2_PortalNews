// /app/api/scrape-tempo/route.ts
import { NextResponse } from 'next/server'
import axios from 'axios'
import * as cheerio from 'cheerio'

export async function GET() {
  const BASE_URL = 'https://www.tempo.co'
  const TARGET_URL = `${BASE_URL}/sains/teknologi-dan-inovasi`

  try {
    const { data } = await axios.get(TARGET_URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
      },
    })

    const $ = cheerio.load(data)
    const results: {
      title: string
      url: string
      slug: string
    }[] = []

    $('figure').each((_, el) => {
      const link = $(el).find('a').first()
      const title = link.text().trim()
      const href = link.attr('href') || ''
      const url = href.startsWith('http') ? href : `${BASE_URL}${href}`
      const slug = url.split('/').filter(Boolean).pop() || ''

      if (title && href) {
        results.push({ title, url, slug })
      }
    })

    return NextResponse.json(results)
  } catch (err) {
    console.error('❌ Tempo scrape error:', err)
    return NextResponse.json({ error: 'Failed to scrape Tempo' }, { status: 500 })
  }
}

