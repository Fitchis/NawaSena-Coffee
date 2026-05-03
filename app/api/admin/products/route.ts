import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Admin GET products error", error);
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: 500 },
      );
    }

    return NextResponse.json(data || []);
  } catch (err) {
    console.error("Admin API error", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // use service role client for writes to avoid RLS restrictions
    const supabase = createServiceClient();

    // ensure category_id is present (DB requires not null)
    if (!body.category_id) {
      // try to find an existing category
      const { data: cats } = await supabase
        .from("categories")
        .select("id")
        .limit(1);
      if (cats && cats.length > 0) {
        body.category_id = cats[0].id;
      } else {
        // create a default category
        const { data: newCat } = await supabase
          .from("categories")
          .insert([{ name: "Uncategorized" }])
          .select()
          .limit(1);
        body.category_id = newCat?.[0]?.id ?? null;
      }
    }

    const { data, error } = await supabase
      .from("products")
      .insert([body])
      .select();

    if (error) {
      console.error("Admin POST product error", error);
      return NextResponse.json(
        { error: "Failed to create product" },
        { status: 500 },
      );
    }

    return NextResponse.json(data?.[0] || null, { status: 201 });
  } catch (err) {
    console.error("Admin API error", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
