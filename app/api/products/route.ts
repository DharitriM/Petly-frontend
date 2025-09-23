import { supabaseServer } from "@/lib/supabaseServerClient";
import { NextResponse } from "next/server";

// Handle GET (all or single)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    // GET single product
    const { data, error } = await supabaseServer
      .from("product_list")
      .select(`
        id, name, description, price, original_price, weight, dimensions,
        rating, reviews_count, quantity, in_stock, images,
        category:categories ( id, name ),
        brand:brands ( id, name ),
        pet_type:pet_types ( id, name ),
        created_at, user_id
      `)
      .eq("id", id)
      .single();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({
      product: { ...data, quantity: data.quantity },
    });
  }

  // GET all products
  const { data, error } = await supabaseServer
    .from("product_list")
    .select(`
      id, name, description, price, original_price, weight, dimensions,
      rating, reviews_count, quantity, in_stock, images,
      category:categories(id, name),
      brand:brands(id, name),
      pet_type:pet_types(id, name),
      created_at, user_id
    `);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({
    products: data?.map((p) => ({ ...p, quantity: p.quantity })),
  });
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
      quantity, // frontend sends "quantity"
      images,
      category_id,
      brand_id,
      pet_type_id,
      user_id,
    } = body;

    const { data, error } = await supabaseServer
      .from("product_list")
      .insert([
        {
          name,
          description,
          price,
          original_price,
          weight,
          dimensions,
          quantity: quantity, // store as "quantity"
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

    return NextResponse.json({
      product: { ...data, quantity: data.quantity },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// UPDATE product
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const {
      name,
      description,
      price,
      original_price,
      weight,
      dimensions,
      quantity,
      images,
      category_id,
      brand_id,
      pet_type_id,
    } = body;

    const { data, error } = await supabaseServer
      .from("product_list")
      .update({
        name,
        description,
        price,
        original_price,
        weight,
        dimensions,
        quantity: quantity,
        images,
        category_id,
        brand_id,
        pet_type_id,
      })
      .eq("id", params.id)
      .select("*")
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ product: { ...data, quantity: data.quantity } });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// DELETE product
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { error } = await supabaseServer
    .from("product_list")
    .delete()
    .eq("id", params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ success: true });
}