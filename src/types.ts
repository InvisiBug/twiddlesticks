export type Product = {
  id: number
  name: string
  price: number
  description: string
  longDescription: string
  tag: string
  image: string
  images: string[]
  details: string[]
}

export type Festival = {
  name: string
  date: string
  location: string
  hours: string
  note: string
}

export type Cart = Record<number, number>
