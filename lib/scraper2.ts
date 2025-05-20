import axios from 'axios'
import * as cheerio from 'cheerio'
import { Berita } from '@/types/news'

const BASE_URL = 'https://nasional.kompas.com'

export async function scrapeBeritaList(): Promise<Berita[]> {
  console.log('Scraping news from Kompas...')

  const { data } = await axios.get(BASE_URL, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    },
  })

  const $ = cheerio.load(data)
  const results: Berita[] = []

  $('div.latest__wrap').each((i, el) => {
    const anchor = $(el).find('a.latest__link')
    const title = anchor.text().trim()
    const href = anchor.attr('href') || ''
    const fullUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`
    const slug = fullUrl.split('/').filter(Boolean).pop() || ''

    let image = $(el).find('img').attr('src') || ''
    if (image && !image.startsWith('http')) {
      image = `${BASE_URL}${image}`
    }

    // Extract date from URL: /read/YYYY/MM/DD/
    let date = ''
    const dateMatch = href.match(/\/read\/(\d{4})\/(\d{2})\/(\d{2})\//)

    if (dateMatch) {
      const [, year, month, day] = dateMatch
      const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ]
      const monthIndex = parseInt(month, 10) - 1
      date = `${day} ${months[monthIndex]} ${year}`
    } else {
      const now = new Date()
      date = now.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    }

    if (title && href) {
      results.push({ title, url: fullUrl, slug, date, image })
    }
  })

  return results
}
