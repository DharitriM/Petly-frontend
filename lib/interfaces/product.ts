export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  original_price: number | null
  weight: number | null
  dimensions: string | null
  rating: number
  reviews_count: number
  quantity: number
  in_stock: boolean
  images: string[]
  category_id: string | null
  brand_id: string | null
  pet_type_id: string | null
  user_id: string | null
  created_at: string

  // These will be joined in API for UI convenience
  category?: { id: string; name: string }
  brand?: { id: string; name: string }
  pet_type?: { id: string; name: string }
}
