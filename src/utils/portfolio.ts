import portfolioItems from '../data/portfolio.json'
import { DEFAULT_PORTFOLIO_CATEGORY, type PortfolioItem } from '../types/portfolio'

const items = portfolioItems as PortfolioItem[]

function getNumericOrder(item: PortfolioItem) {
  if (item.sortOrder !== undefined && item.sortOrder < 999999) return item.sortOrder
  const filename = item.src.split('/').pop() ?? ''
  const match = filename.match(/^(\d+)/)
  return match ? parseInt(match[1], 10) : 999999
}

export function getNailArtPhoto(order: number): PortfolioItem | undefined {
  return items
    .filter((item) => item.category === DEFAULT_PORTFOLIO_CATEGORY)
    .find((item) => getNumericOrder(item) === order)
}
