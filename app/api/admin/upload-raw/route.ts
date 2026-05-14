import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const filenameHeader = req.headers.get("x-filename") || "";
    const contentTypeHeader =
      req.headers.get("content-type") || "application/octet-stream";
    if (!filenameHeader) {
      return new Response(
        JSON.stringify({ error: "Missing X-Filename header" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const arrayBuffer = await req.arrayBuffer();
    const uint8 = new Uint8Array(arrayBuffer);

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

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filenameHeader, uint8, {
        contentType: contentTypeHeader,
        upsert: false,
      });
    if (error) {
      console.error("Upload-raw error:", error);
      return new Response(JSON.stringify({ error }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filenameHeader);
    return new Response(JSON.stringify({ publicUrl: data.publicUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("upload-raw error:", err);
    return new Response(JSON.stringify({ error: err.message || String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
