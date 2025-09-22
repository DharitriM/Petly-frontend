import { supabaseServer } from "@/lib/supabaseServerClient";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabaseServer.from("pet_types").select("*");
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ pet_types: data });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name } = body;

  const { data, error } = await supabaseServer
    .from("pet_types")
    .insert([{ name }])
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ pet_type: data[0] });
}
