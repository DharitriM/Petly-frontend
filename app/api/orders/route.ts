import { supabaseServer } from "@/lib/supabaseServerClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { data, error } = await supabaseServer
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      // If table doesn't exist or other error, fallback to empty array to not break the UI
      return NextResponse.json({ orders: [] });
    }

    return NextResponse.json({ orders: data });
  } catch (e: any) {
    return NextResponse.json({ orders: [] });
  }
}
