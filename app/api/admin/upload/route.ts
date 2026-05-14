export const runtime = "edge";

import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    let formData: FormData | null = null;
    try {
      formData = await req.formData();
    } catch (fdErr: any) {
      const ct = req.headers.get("content-type") || "not-provided";
      console.error("Failed to parse FormData:", fdErr);
      return new Response(
        JSON.stringify({
          error: "Failed to parse body as FormData.",
          contentType: ct,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const file = formData.get("file") as any;
    if (!file) {
      return new Response(JSON.stringify({ error: "no file provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    // accept either SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY (user may have set the latter)
    const serviceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
    const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "Image";

    const missing: string[] = [];
    if (!url) missing.push("NEXT_PUBLIC_SUPABASE_URL");
    if (!serviceKey)
      missing.push(
        "SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY",
      );
    if (missing.length) {
      const msg = `Missing SUPABASE config on server: ${missing.join(", ")}`;
      console.error(msg);
      return new Response(JSON.stringify({ error: msg }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = url!;
    const supabaseKey = serviceKey!;

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });

    const arrayBuffer = await file.arrayBuffer();
    const uint8 = new Uint8Array(arrayBuffer);
    const filename = `${Date.now()}_${file.name}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filename, uint8, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (error) {
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
    console.error(err);
    return new Response(JSON.stringify({ error: err.message || String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
