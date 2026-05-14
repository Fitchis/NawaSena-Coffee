import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { filename, contentType, base64 } = body || {};
    if (!filename || !base64) {
      return new Response(
        JSON.stringify({ error: "Missing filename or base64" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
    const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "Image";

    if (!url || !serviceKey) {
      return new Response(
        JSON.stringify({ error: "Missing supabase configuration" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const supabase = createClient(url, serviceKey, {
      auth: { persistSession: false },
    });

    // decode base64
    const binary = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filename, binary, {
        contentType: contentType || "application/octet-stream",
        upsert: false,
      });

    if (error) {
      console.error("Upload error (base64):", error);
      return new Response(JSON.stringify({ error }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filename);
    return new Response(JSON.stringify({ publicUrl: data.publicUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("upload-base64 error:", err);
    return new Response(JSON.stringify({ error: err.message || String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
