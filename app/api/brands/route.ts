import { supabaseServer } from "@/lib/supabaseServerClient";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabaseServer.from("brands").select("*");
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ brands: data });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, logo_url } = body;

  const { data, error } = await supabaseServer
    .from("brands")
    .insert([{ name, logo_url }])
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ brand: data[0] });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, name, logo_url } = body;

  const { data, error } = await supabaseServer
    .from("brands")
    .update({ name, logo_url })
    .eq("id", id)
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ brand: data[0] });
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;

  const { error } = await supabaseServer.from("brands").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}