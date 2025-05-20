// /app/api/scrape-kompas-home/route.ts
import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

export async function GET() {
  const BASE_URL = 'https://www.kompas.com'

  try {
    console.log('🟡 Launching Puppeteer...')
    const browser = await puppeteer.launch({ headless: 'new' })
    const page = await browser.newPage()

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
    )

    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 0 })

    await autoScroll(page)

const results = await page.evaluate(() => {
  const items: {
    title: string
    url: string
    category: string
    slug: string
    image: string
    date: string
  }[] = []

  const bulan = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]

  const nodes = document.querySelectorAll('.hlItem')
  nodes.forEach((node) => {
    const linkEl = node.querySelector('a')
    const titleEl = node.querySelector('h1.hlTitle')
    const categoryEl = node.querySelector('.hlChannel')
    const imageEl = node.querySelector('img.lozad.fade')

    const href = linkEl?.getAttribute('href') || ''
    const title = titleEl?.textContent?.trim() || ''
    const category = categoryEl?.textContent?.trim() || ''
    const image = imageEl?.getAttribute('data-src') || ''
    const url = href.startsWith('http') ? href : `https://www.kompas.com${href}`
    const slug = url.split('/').filter(Boolean).pop() || ''

    // ✅ Extract tanggal dari URL
    let date = ''
    const dateMatch = href.match(/\/read\/(\d{4})\/(\d{2})\/(\d{2})\//)
    if (dateMatch) {
      const [_, y, m, d] = dateMatch
      date = `${d} ${bulan[parseInt(m) - 1]} ${y}`
    }

    if (title && href) {
      items.push({ title, url, category, slug, image, date })
    }
  })

  return items
})



    console.log(`🎯 Total berita ditemukan: ${results.length}`)
    results.forEach((r, i) => {
      console.log(`✅ [${i + 1}] ${r.title} (${r.category})`)
      console.log(`    → ${r.url}`)
    })

    await browser.close()

    return NextResponse.json(results)
  } catch (err) {
    console.error('❌ Puppeteer scrape error:', err)
    return NextResponse.json({ error: 'Failed to scrape Kompas homepage' }, { status: 500 })
  }
}

async function autoScroll(page: puppeteer.Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0
      const distance = 300
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight
        window.scrollBy(0, distance)
        totalHeight += distance

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer)
          resolve()
        }
      }, 200)
    })
  })
}
