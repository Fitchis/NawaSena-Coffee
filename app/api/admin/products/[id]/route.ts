import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Admin GET product error", error);
      return NextResponse.json(
        { error: "Failed to fetch product" },
        { status: 500 },
      );
    }

    return NextResponse.json(data || null);
  } catch (err) {
    console.error("Admin API error", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const body = await req.json();
    const supabase = await createClient();

    // use service client for writes to bypass row-level security for admin
    const service = createServiceClient();
    const { data, error } = await service
      .from("products")
      .update(body)
      .eq("id", id)
      .select();

    if (error) {
      console.error("Admin PUT product error", error);
      return NextResponse.json(
        { error: "Failed to update product" },
        { status: 500 },
      );
    }

    return NextResponse.json(data?.[0] || null);
  } catch (err) {
    console.error("Admin API error", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const service = createServiceClient();

    const { error } = await service.from("products").delete().eq("id", id);

    if (error) {
      console.error("Admin DELETE product error", error);
      return NextResponse.json(
        { error: "Failed to delete product" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin API error", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
