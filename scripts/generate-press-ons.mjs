import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const shortDir = path.join(root, 'public', 'press-on', 'Short')
const fullDir = path.join(root, 'public', 'press-on', 'Full')
const outputFile = path.join(root, 'src', 'data', 'press-ons.json')

const imageExt = /\.(jpe?g|png|webp|gif|avif)$/i
const skipFiles = new Set(['.gitkeep', 'desktop.ini', 'thumbs.db'])

function pressOnName(filename) {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/^\d+\.\s*/, '')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function numericSortKey(filename) {
  const match = filename.match(/^(\d+)/)
  return match ? parseInt(match[1], 10) : 999999
}

function publicUrl(relativePath) {
  return `/${relativePath.split(path.sep).join('/')}`
}

function buildPressOns() {
  fs.mkdirSync(shortDir, { recursive: true })
  fs.mkdirSync(fullDir, { recursive: true })
  fs.mkdirSync(path.dirname(outputFile), { recursive: true })

  if (!fs.existsSync(shortDir)) {
    fs.writeFileSync(outputFile, '[]\n')
    console.log('Press-ons: 0 product(s) — add images to public/press-on/Short and Full')
    return
  }

  const shortFiles = fs
    .readdirSync(shortDir)
    .filter((name) => !skipFiles.has(name) && !name.startsWith('.') && imageExt.test(name))
    .sort((a, b) => numericSortKey(a) - numericSortKey(b) || a.localeCompare(b, undefined, { numeric: true }))

  const products = shortFiles.map((file, index) => {
    const name = pressOnName(file) || `Set ${index + 1}`
    const fullFile = fs.existsSync(path.join(fullDir, file))
      ? file
      : fs.readdirSync(fullDir).find((candidate) => pressOnName(candidate) === name)

    const coverSrc = publicUrl(path.relative(path.join(root, 'public'), path.join(shortDir, file)))
    const fullSrc = fullFile
      ? publicUrl(path.relative(path.join(root, 'public'), path.join(fullDir, fullFile)))
      : coverSrc

    return {
      id: String(index + 1),
      name,
      file,
      coverSrc,
      fullSrc,
      alt: `Uniska Nails Studio — ${name} press-on set`,
      sortOrder: numericSortKey(file),
    }
  })

  fs.writeFileSync(outputFile, `${JSON.stringify(products, null, 2)}\n`)
  console.log(`Press-ons: ${products.length} product(s) found in public/press-on/`)
}

buildPressOns()
