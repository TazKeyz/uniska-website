import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import XLSX from 'xlsx'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const imageDir = path.join(root, 'public', 'press-on', 'Full')
const dataDir = path.join(root, 'data')
const spreadsheetPath = path.join(dataDir, 'press-ons.xlsx')
const csvPath = path.join(dataDir, 'press-ons.csv')
const outputFile = path.join(root, 'src', 'data', 'press-ons.json')

const imageExt = /\.(jpe?g|png|webp|gif|avif)$/i
const skipFiles = new Set(['.gitkeep', 'desktop.ini', 'thumbs.db'])
const DEFAULT_PRICE = 210

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

function formatZar(amount) {
  return `R${Number(amount).toFixed(2)}`
}

function parsePrice(value) {
  if (value === undefined || value === null || value === '') return DEFAULT_PRICE
  const cleaned = String(value).replace(/[rR\s,]/g, '')
  const parsed = Number.parseFloat(cleaned)
  return Number.isFinite(parsed) ? parsed : DEFAULT_PRICE
}

function readCsvRows() {
  if (!fs.existsSync(csvPath)) return []

  const lines = fs.readFileSync(csvPath, 'utf8').split(/\r?\n/).filter(Boolean)
  if (lines.length < 2) return []

  const headers = lines[0].split(',').map((header) => header.trim().toLowerCase())
  const fileIndex = headers.indexOf('file')
  const nameIndex = headers.indexOf('name')
  const priceIndex = headers.indexOf('price')

  return lines.slice(1).map((line) => {
    const cells = line.split(',').map((cell) => cell.trim())
    return {
      file: fileIndex >= 0 ? cells[fileIndex] : '',
      name: nameIndex >= 0 ? cells[nameIndex] : '',
      price: priceIndex >= 0 ? cells[priceIndex] : DEFAULT_PRICE,
    }
  })
}

function readSpreadsheetRows() {
  if (!fs.existsSync(spreadsheetPath)) return null

  const workbook = XLSX.readFile(spreadsheetPath)
  const sheet = workbook.Sheets[workbook.SheetNames[0]]
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' })

  return rows.map((row) => {
    const file = String(row.file ?? row.File ?? '').trim()
    const name = String(row.name ?? row.Name ?? '').trim()
    const price = row.price ?? row.Price ?? row['Price (ZAR)'] ?? DEFAULT_PRICE

    return { file, name, price }
  })
}

function writeSpreadsheet(rows) {
  const worksheet = XLSX.utils.json_to_sheet(
    rows.map((row) => ({
      file: row.file,
      name: row.name,
      price: row.price,
    })),
    { header: ['file', 'name', 'price'] },
  )

  worksheet['!cols'] = [{ wch: 28 }, { wch: 22 }, { wch: 12 }]

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Press-Ons')
  fs.mkdirSync(dataDir, { recursive: true })
  XLSX.writeFile(workbook, spreadsheetPath)
}

function pickImageFiles(dir) {
  const files = fs
    .readdirSync(dir)
    .filter((name) => !skipFiles.has(name) && !name.startsWith('.') && imageExt.test(name))

  const byProduct = new Map()

  for (const file of files) {
    const key = `${numericSortKey(file)}:${pressOnName(file)}`
    const existing = byProduct.get(key)

    if (!existing) {
      byProduct.set(key, file)
      continue
    }

    if (file.toLowerCase().endsWith('.png')) {
      byProduct.set(key, file)
    }
  }

  return [...byProduct.values()].sort(
    (a, b) =>
      numericSortKey(a) - numericSortKey(b) ||
      a.localeCompare(b, undefined, { numeric: true }),
  )
}

function findPricingRow(rowByFile, file, existingRows) {
  if (rowByFile.has(file)) return rowByFile.get(file)

  const name = pressOnName(file)
  return existingRows.find((row) => pressOnName(row.file) === name)
}

function ensureSpreadsheet(imageFiles) {
  fs.mkdirSync(dataDir, { recursive: true })

  const existingRows = readSpreadsheetRows() ?? readCsvRows()
  const rowByFile = new Map(
    existingRows.filter((row) => row.file).map((row) => [row.file, row]),
  )

  const mergedRows = imageFiles.map((file) => {
    const existing = findPricingRow(rowByFile, file, existingRows)
    return {
      file,
      name: existing?.name || pressOnName(file),
      price: parsePrice(existing?.price),
    }
  })

  mergedRows.sort(
    (a, b) =>
      numericSortKey(a.file) - numericSortKey(b.file) ||
      a.file.localeCompare(b.file, undefined, { numeric: true }),
  )

  const hasNewImages = imageFiles.some((file) => !findPricingRow(rowByFile, file, existingRows))
  const filesChanged =
    existingRows.length > 0 &&
    mergedRows.some((row) => {
      const prev = existingRows.find(
        (entry) => entry.name === row.name || pressOnName(entry.file) === row.name,
      )
      return prev && prev.file !== row.file
    })

  if (!fs.existsSync(spreadsheetPath)) {
    writeSpreadsheet(mergedRows)
    console.log(`Created ${path.relative(root, spreadsheetPath)} — edit prices here, then commit and push.`)
  } else if (hasNewImages || filesChanged) {
    writeSpreadsheet(mergedRows)
    console.log(`Updated ${path.relative(root, spreadsheetPath)} with new press-on image(s).`)
  }

  return new Map(mergedRows.map((row) => [row.file, row]))
}

function buildPressOns() {
  fs.mkdirSync(imageDir, { recursive: true })
  fs.mkdirSync(path.dirname(outputFile), { recursive: true })

  if (!fs.existsSync(imageDir)) {
    fs.writeFileSync(outputFile, '[]\n')
    console.log('Press-ons: 0 product(s) — add images to public/press-on/Full')
    return
  }

  const imageFiles = pickImageFiles(imageDir)

  if (imageFiles.length === 0) {
    fs.writeFileSync(outputFile, '[]\n')
    console.log('Press-ons: 0 product(s) — add images to public/press-on/Full')
    return
  }

  const pricingByFile = ensureSpreadsheet(imageFiles)

  const products = imageFiles.map((file, index) => {
    const pricing = pricingByFile.get(file)
    const name = pricing?.name || pressOnName(file) || `Set ${index + 1}`
    const price = parsePrice(pricing?.price)
    const imageSrc = publicUrl(path.relative(path.join(root, 'public'), path.join(imageDir, file)))

    return {
      id: String(index + 1),
      name,
      file,
      price,
      priceDisplay: formatZar(price),
      coverSrc: imageSrc,
      fullSrc: imageSrc,
      alt: `Uniska Nails Studio — ${name} press-on set`,
      sortOrder: numericSortKey(file),
    }
  })

  fs.writeFileSync(outputFile, `${JSON.stringify(products, null, 2)}\n`)
  console.log(
    `Press-ons: ${products.length} product(s) from public/press-on/Full + ${path.relative(root, spreadsheetPath)}`,
  )
}

buildPressOns()
