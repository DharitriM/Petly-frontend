export interface Product {
  id: string
  name: string
  description?: string
  price: number
  original_price?: number
  weight?: number
  dimensions?: string // e.g. "20x10x5 cm"
  rating: number
  reviews_count: number
  stock_quantity: number
  in_stock: boolean
  images: string[]
  category_id?: string | null
  brand_id?: string | null
  pet_type_id?: string | null
  user_id?: string | null // user who introduced the product
  created_at: string
}
