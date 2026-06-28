import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const portfolioDir = path.join(root, 'public', 'portfolio')
const outputFile = path.join(root, 'src', 'data', 'portfolio.json')

const imageExt = /\.(jpe?g|png|webp|gif|avif)$/i
const skipFiles = new Set(['.gitkeep', 'desktop.ini', 'thumbs.db'])

const categoryOrder = ['Nail Art', 'Gel Nails', 'Press-Ons', 'Gallery']

function humanize(text) {
  return text
    .replace(/\.[^.]+$/, '')
    .replace(/^\d+[-_.\s]*/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function formatCategory(folderName) {
  return folderName
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function numericSortKey(filename) {
  const match = filename.match(/^(\d+)/)
  return match ? parseInt(match[1], 10) : 999999
}

function walk(dir, category = 'Gallery') {
  if (!fs.existsSync(dir)) return []

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const items = []

  for (const entry of entries) {
    if (skipFiles.has(entry.name) || entry.name.startsWith('.')) continue

    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      items.push(...walk(fullPath, formatCategory(entry.name)))
      continue
    }

    if (!imageExt.test(entry.name)) continue

    const relativePath = path
      .relative(path.join(root, 'public'), fullPath)
      .split(path.sep)
      .join('/')

    items.push({
      file: entry.name,
      category,
      src: `/${relativePath}`,
      sortOrder: numericSortKey(entry.name),
    })
  }

  return items
}

function sortPortfolioItems(items) {
  return items.sort((a, b) => {
    const categoryDiff =
      categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
    if (categoryDiff !== 0) return categoryDiff

    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder

    return a.file.localeCompare(b.file, undefined, { numeric: true, sensitivity: 'base' })
  })
}

function buildPortfolio() {
  fs.mkdirSync(portfolioDir, { recursive: true })
  fs.mkdirSync(path.dirname(outputFile), { recursive: true })

  const discovered = sortPortfolioItems(walk(portfolioDir))

  const items = discovered.map((item, index) => {
    const title = humanize(item.file) || `Design ${item.sortOrder}`
    return {
      id: String(index + 1),
      title,
      category: item.category,
      src: item.src,
      alt: `Uniska Nails Studio — ${title}`,
      sortOrder: item.sortOrder,
    }
  })

  fs.writeFileSync(outputFile, `${JSON.stringify(items, null, 2)}\n`)
  console.log(`Portfolio: ${items.length} image(s) found in public/portfolio/`)
}

buildPortfolio()
