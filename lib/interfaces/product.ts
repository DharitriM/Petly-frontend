export interface Product {
  id: string;
  name: string;
  price: number;
  original_price: number;
  rating: number;
  reviews: number;
  images: string[];
  category: string;
  pet_type: string;
  brand: string;
  in_stock: boolean;
  created_at: string;
  created_by: string;
}
