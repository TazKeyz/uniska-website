export type PortfolioItem = {
  id: string
  title: string
  category: string
  src: string
  alt: string
  description?: string
  sortOrder?: number
}

export const DEFAULT_PORTFOLIO_CATEGORY = 'Nail Art'
export const PORTFOLIO_PREVIEW_COUNT = 6

/** Thumbnail grid — natural photo size, no crop */
export const portfolioImageClass = 'w-full h-auto block'
