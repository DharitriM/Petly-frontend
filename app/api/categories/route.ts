import { supabaseServer } from "@/lib/supabaseServerClient"
import { NextResponse } from "next/server"

export async function GET() {
  const { data, error } = await supabaseServer
    .from("categories")
    .select(`
      id, name, image_url, product_count, created_at
    `)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ categories: data })
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, image_url } = body;

  const { data, error } = await supabaseServer
    .from("categories")
    .insert([{ name, image_url }])
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ category: data[0] });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, name, image_url } = body;

  const { data, error } = await supabaseServer
    .from("categories")
    .update({ name, image_url })
    .eq("id", id)
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ category: data[0] });
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;

  const { error } = await supabaseServer.from("categories").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
} 