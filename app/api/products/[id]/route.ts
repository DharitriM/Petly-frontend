import { supabaseServer } from "@/lib/supabaseServerClient";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { id?: string } }
) {
    const { id } = params;

    const { data, error } = await supabaseServer
        .from("product_list")
        .select(`id, name, description, price, original_price, weight, dimensions, quantity, in_stock, rating, reviews_count, images, category_id, brand_id, pet_type_id,
      category:category_id(name),
      brand:brand_id(name), 
      pet_type:pet_type_id(name)`)
        .eq("id", id)
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
}

export async function PUT(
    req: Request,
    { params }: { params: { id?: string } }
) {
    const { id } = params;
    const body = await req.json();
    const { data, error } = await supabaseServer
        .from("product_list")
        .update(body)
        .eq("id", id)
        .select()
        .single();
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(data, { status: 200 });
}

export async function DELETE(
    req: Request,
    { params }: { params: { id?: string } }
) {
    const { id } = params;
    const { data, error } = await supabaseServer
        .from("product_list")
        .delete()
        .eq("id", id)
        .select()
        .single();
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(data, { status: 200 });
}