"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { getBrowserSupabase } from "@/lib/supabase/client";

type Product = {
  id?: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string | null;
  is_available?: boolean;
  category_id?: string | null;
};

export default function ProductForm({
  initial,
  onSaved,
}: {
  initial?: Partial<Product>;
  onSaved?: (p: Product) => void;
}) {
  const [name, setName] = useState(initial?.name || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [price, setPrice] = useState(initial?.price ?? 0);
  const [imageUrl, setImageUrl] = useState(initial?.image_url || "");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    initial?.image_url || null,
  );
  const [categories, setCategories] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [categoryId, setCategoryId] = useState<string | null>(
    initial?.category_id || null,
  );
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name,
      description,
      price: Number(price),
      image_url: imageUrl || null,
      is_available: true,
      category_id: categoryId ?? initial?.category_id ?? null,
    };

    try {
      // If a file is provided, upload via server endpoint which uses the
      // service role key. This avoids client permission issues.
      if (file) {
        try {
          const fd = new FormData();
          fd.append("file", file, file.name);
          const up = await fetch("/api/admin/upload", {
            method: "POST",
            body: fd,
          });
          const js = await up.json().catch(() => ({}));
          if (!up.ok) {
            console.error("Server upload failed", js);
            // fallback: if parsing FormData failed on server, send base64 JSON
            if (
              js?.error === "Failed to parse body as FormData." ||
              js?.contentType
            ) {
              try {
                // fallback: send raw ArrayBuffer with filename header to avoid JSON/base64 size limits
                const arrayBuffer = await file.arrayBuffer();
                const filename = `${Date.now()}_${file.name}`;
                const res = await fetch("/api/admin/upload-raw", {
                  method: "POST",
                  headers: {
                    "Content-Type": file.type || "application/octet-stream",
                    "X-Filename": filename,
                  },
                  body: arrayBuffer,
                });
                const js2 = await res.json().catch(() => ({}));
                if (!res.ok) {
                  console.error("Raw upload failed", js2);
                  toast({
                    title: "Upload gagal",
                    description:
                      js2.error?.message || JSON.stringify(js2.error),
                    variant: "destructive",
                  });
                } else {
                  payload.image_url = js2.publicUrl ?? payload.image_url;
                }
              } catch (e) {
                console.error("Raw fallback failed", e);
                toast({
                  title: "Upload gagal",
                  description: "Upload gagal",
                  variant: "destructive",
                });
              }
            } else {
              toast({
                title: "Upload gagal",
                description: js.error?.message || JSON.stringify(js.error),
                variant: "destructive",
              });
            }
          } else {
            payload.image_url = js.publicUrl ?? payload.image_url;
          }
        } catch (e) {
          console.error("Upload request failed", e);
          toast({
            title: "Upload gagal",
            description: "Permintaan upload gagal",
            variant: "destructive",
          });
        }
      }

      const method = initial?.id ? "PUT" : "POST";
      const url = initial?.id
        ? `/api/admin/products/${initial.id}`
        : "/api/admin/products";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      onSaved?.(data);
    } catch (err) {
      console.error(err);
      toast({
        title: "Gagal",
        description: "Gagal menyimpan produk",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    if (!file) return setPreview(initial?.image_url || null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file, initial?.image_url]);

  useEffect(() => {
    // load categories from dedicated categories endpoint
    let mounted = true;
    async function load() {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) return;
        const data = await res.json();
        const arr = (data || []).map((c: any) => ({
          id: String(c.id),
          name: c.name,
        }));
        if (mounted) setCategories(arr);
        if (mounted && !categoryId && arr.length > 0) setCategoryId(arr[0].id);
      } catch (e) {
        // ignore
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="text-sm block mb-1">Nama</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="text-sm block mb-1">Deskripsi</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          rows={3}
        />
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <label className="text-sm block mb-1">Harga</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="flex-1">
          <label className="text-sm block mb-1">Kategori</label>
          <select
            value={categoryId ?? ""}
            onChange={(e) => setCategoryId(e.target.value || null)}
            className="w-full border p-2 rounded"
          >
            <option value="">Pilih kategori</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="text-sm block mb-1">Gambar (upload)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="w-full"
          />
          <div className="text-sm mt-2">atau URL</div>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
            className="w-full border p-2 rounded mt-1"
          />
          {preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="preview"
              className="w-32 h-32 object-cover mt-2 rounded"
            />
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded disabled:opacity-60"
          disabled={saving}
        >
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
}
