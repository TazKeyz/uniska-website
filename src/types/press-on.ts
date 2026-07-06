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

/** Portrait frame ratio (width × height ≈ 926×1080) matching full press-on artwork */
export const pressOnImageFrameClass = 'aspect-[926/1080]'
