import { supabaseServer } from "@/lib/supabaseServerClient";
import { NextResponse } from "next/server";

// GET all products with relations
export async function GET() {
  const { data, error } = await supabaseServer
    .from("products")
    .select(`
      id,
      name,
      description,
      price,
      original_price,
      weight,
      dimensions,
      rating,
      reviews_count,
      stock_quantity,
      in_stock,
      images,
      created_at,
      categories(name),
      brands(name),
      pet_types(name)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ products: data });
}

// POST new product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      description,
      price,
      original_price,
      weight,
      dimensions,
      stock_quantity,
      images,
      category_id,
      brand_id,
      pet_type_id,
      user_id,
    } = body;

    const { data, error } = await supabaseServer
      .from("products")
      .insert([
        {
          name,
          description,
          price,
          original_price,
          weight,
          dimensions,
          stock_quantity,
          images,
          category_id,
          brand_id,
          pet_type_id,
          user_id,
        },
      ])
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ product: data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
