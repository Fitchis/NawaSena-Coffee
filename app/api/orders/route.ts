import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const { customer_name, customer_phone, items, total_amount, notes } = body;

    // Validate required fields
    if (!customer_name || !customer_phone || !items?.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Create order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user?.id || null,
        customer_name,
        customer_phone,
        total_amount,
        status: "pending",
        notes,
      })
      .select()
      .single();

    if (orderError) {
      console.error("[v0] Error creating order:", orderError);
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 },
      );
    }

    // Create order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("[v0] Error creating order items:", itemsError);
      // Delete the order if items creation fails
      await supabase.from("orders").delete().eq("id", order.id);
      return NextResponse.json(
        { error: "Failed to create order items" },
        { status: 500 },
      );
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ orders: [] });
    }

    const { data: orders, error } = await supabase
      .from("orders")
      .select(
        `
        id,
        customer_name,
        total_amount,
        status,
        created_at,
        order_items(id, product_id, quantity, price)
      `,
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[v0] Error fetching orders:", error);
      return NextResponse.json(
        { error: "Failed to fetch orders" },
        { status: 500 },
      );
    }

    return NextResponse.json({ orders: orders || [] });
  } catch (error) {
    console.error("[v0] API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
