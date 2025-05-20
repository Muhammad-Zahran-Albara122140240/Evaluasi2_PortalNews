import axios from 'axios'
import * as cheerio from 'cheerio'
import { Berita } from '@/types/news'
// Ganti URL target di bawah
const BASE_URL = 'https://www.cnnindonesia.com'

export async function scrapeBeritaList(): Promise<Berita[]> {
  console.log('Starting to scrape news from CNN Indonesia...')
  const { data } = await axios.get(`${BASE_URL}/nasional`)
  const $ = cheerio.load(data)
  const results: Berita[] = []

  console.log('HTML loaded, searching for articles...')
  const articleCount = $('article').length
  console.log(`Found ${articleCount} article elements`)

  $('article').each((i, el) => {
    const anchor = $(el).find('a').first()
    const title = anchor.text().trim()
    const href = anchor.attr('href') || ''
    const fullUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`
    const slug = fullUrl.split('/').filter(Boolean).pop() || ''

    const imgElement = $(el).find('img').first()
    let image = imgElement.attr('src') || ''
    if (image && !image.startsWith('http')) {
      image = `${BASE_URL}${image}`
    }
    
    // Only extract date from URL format
    let date = ''
    
    // Log original URL for debugging
    console.log(`\nArticle ${i+1}: "${title}"`)
    console.log(`URL: ${href}`)
    
    // CNN Indonesia URL date pattern: /YYYYMMDDHHMMSS-XX-XXXXXX/
    const dateMatch = href.match(/\/(\d{8})\d+-\d+-\d+\//)
    
    if (dateMatch && dateMatch[1]) {
      // Log the match for debugging
      console.log(`Date pattern matched: ${dateMatch[0]}`)
      console.log(`Date code extracted: ${dateMatch[1]}`)
      
      const dateCode = dateMatch[1]
      // Extract year, month, day from the 8-digit code
      const year = dateCode.substring(0, 4)
      const month = dateCode.substring(4, 6)
      const day = dateCode.substring(6, 8)
      
      console.log(`Parsed date components: Year=${year}, Month=${month}, Day=${day}`)
      
      // Format the date in Indonesian style
      const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ]
      
      // Convert month to number and subtract 1 to get the correct index (01 → 0)
      const monthIndex = parseInt(month, 10) - 1
      date = `${day} ${months[monthIndex]} ${year}`
      console.log(`Formatted date: ${date}`)
    } else {
      // URL pattern doesn't match
      console.log(`No date pattern found in URL`)
      
      // Fallback to today's date
      const now = new Date()
      date = now.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
      console.log(`Using fallback date: ${date}`)
    }

    if (title && href) {
      results.push({ title, url: fullUrl, slug, date, image })
    }
  })

  return results
}

// gunakan ini di file utils atau wherever kamu simpan scraping
export async function scrapeBeritaDetailHTML(url: string): Promise<string> {
  const { data } = await axios.get(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    },
  })

  const $ = cheerio.load(data)

  const paragraphs: string[] = []

  $('.detail-text p').each((_, el) => {
    const text = $(el).text().trim()
    if (text.length > 0) {
      paragraphs.push(`<p>${text}</p>`)
    }
  })

  const imageUrl = $('.detail-text img').first().attr('src') || ''

  let result = ''

  if (imageUrl) {
    result += `<img src="${imageUrl}" alt="Gambar berita" style="max-width:100%; height:auto;" />\n\n`
  }

  result += paragraphs.join('\n')

  return result
}
