import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: addons, error } = await supabase
      .from("addons")
      .select("id, name, price, is_active")
      .eq("is_active", true)
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching addons:", error);
      return NextResponse.json(
        { error: "Failed to fetch addons" },
        { status: 500 },
      );
    }

    return NextResponse.json(addons || []);
  } catch (err) {
    console.error("API error (/api/addons):", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
