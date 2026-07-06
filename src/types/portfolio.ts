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

/** 3:4 frame matching portfolio photo dimensions (1080×1440) */
export const portfolioImageFrameClass = 'relative w-full aspect-[3/4]'

/** Fill the card without letterboxing */
export const portfolioImageClass = 'absolute inset-0 w-full h-full object-cover object-center'
