export type PressOnProduct = {
  id: string
  name: string
  file: string
  price: number
  priceDisplay: string
  coverSrc: string
  fullSrc: string
  alt: string
  sortOrder: number
}

/** Square frame ratio (1:1) matching full press-on artwork */
export const pressOnImageFrameClass = 'aspect-square'
