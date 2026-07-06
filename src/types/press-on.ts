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

/** White backing that matches press-on PNG artwork */
export const pressOnImageFrameClass = 'bg-white'

/** Show full 1:1 artwork without cropping */
export const pressOnImageClass = 'w-full h-auto block'
