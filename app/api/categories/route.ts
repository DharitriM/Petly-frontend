import { supabaseServer } from "@/lib/supabaseServerClient"
import { NextResponse } from "next/server"

export async function GET() {
  const { data, error } = await supabaseServer
    .from("products")
    .select(`
      id, name, description, price, original_price, weight, dimensions,
      rating, reviews_count, stock_quantity, in_stock, images,
      category:categories ( id, name ),
      brand:brands ( id, name ),
      pet_type:pet_types ( id, name ),
      created_at, user_id
    `)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ products: data })
}