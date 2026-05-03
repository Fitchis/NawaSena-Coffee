"use client";

import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string | null;
};

export default function ProductList({
  onEdit,
  refreshSignal,
}: {
  onEdit?: (p: Product) => void;
  refreshSignal?: number;
}) {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      setItems(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [refreshSignal]);

  async function handleDelete(id: string) {
    if (!confirm("Hapus produk ini?")) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed");
      setItems((s) => s.filter((x) => x.id !== id));
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus");
    }
  }

  if (loading) return <div>Memuat...</div>;

  return (
    <div className="space-y-3">
      {items.map((p) => (
        <div
          key={p.id}
          className="flex items-center justify-between border p-3 rounded"
        >
          <div className="flex items-center gap-3">
            {p.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.image_url}
                alt={p.name}
                className="w-14 h-14 object-cover rounded"
              />
            ) : (
              <div className="w-14 h-14 bg-muted rounded" />
            )}
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-foreground/60">Rp {p.price}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit?.(p)}
              className="px-3 py-1 bg-yellow-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(p.id)}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
