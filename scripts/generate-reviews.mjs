import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const reviewsDir = path.join(__dirname, '..', 'src', 'data', 'reviews')
const outputFile = path.join(__dirname, '..', 'src', 'data', 'reviews.json')

function buildReviews() {
  fs.mkdirSync(reviewsDir, { recursive: true })
  fs.mkdirSync(path.dirname(outputFile), { recursive: true })

  const files = fs
    .readdirSync(reviewsDir)
    .filter((file) => file.endsWith('.json'))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  const items = files.map((file, index) => {
    const raw = JSON.parse(fs.readFileSync(path.join(reviewsDir, file), 'utf8'))
    return {
      id: String(index + 1),
      name: raw.name,
      initial: raw.initial ?? raw.name.charAt(0).toUpperCase(),
      rating: raw.rating ?? 5,
      text: raw.text,
      date: raw.date,
      sortOrder: raw.sortOrder ?? index + 1,
    }
  })

  items.sort((a, b) => a.sortOrder - b.sortOrder)

  fs.writeFileSync(outputFile, `${JSON.stringify(items, null, 2)}\n`)
  console.log(`Reviews: ${items.length} review(s) loaded from src/data/reviews/`)
}

buildReviews()
