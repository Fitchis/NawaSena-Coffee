"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

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
  search,
  onDeleted,
}: {
  onEdit?: (p: Product) => void;
  refreshSignal?: number;
  search?: string;
  onDeleted?: () => void;
}) {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingName, setDeletingName] = useState<string | null>(null);
  const { toast } = useToast();

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

  useEffect(() => {
    // if refreshSignal triggered, load already called; otherwise no-op
  }, [search]);

  function requestDelete(id: string, name: string) {
    setDeletingId(id);
    setDeletingName(name);
    setConfirmOpen(true);
  }

  async function handleDelete(id?: string) {
    if (!id) return;
    setConfirmOpen(false);
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed");
      setItems((s) => s.filter((x) => x.id !== id));
      onDeleted?.();
      toast({
        title: "Berhasil",
        description: "Produk dihapus",
        variant: "default",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Gagal",
        description: "Gagal menghapus produk",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setDeletingId(null);
      setDeletingName(null);
    }
  }

  if (loading)
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between border p-3 rounded animate-pulse"
          >
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-muted rounded" />
              <div className="w-48">
                <div className="h-4 bg-muted rounded mb-2" />
                <div className="h-3 bg-muted rounded w-32" />
              </div>
            </div>
            <div className="w-32 h-8 bg-muted rounded" />
          </div>
        ))}
      </div>
    );

  const q = (search || "").trim().toLowerCase();
  const filtered = q
    ? items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q),
      )
    : items;

  return (
    <div className="space-y-3">
      {filtered.length === 0 ? (
        <div className="text-center text-foreground/60 py-8">
          Tidak ada produk
        </div>
      ) : (
        filtered.map((p) => {
          const shortDesc = p.description
            ? (() => {
                const words = p.description!.split(/\s+/).filter(Boolean);
                const limit = 12;
                return words.length > limit
                  ? words.slice(0, limit).join(" ") + "..."
                  : words.join(" ");
              })()
            : "";

          return (
            <div
              key={p.id}
              className="flex items-center justify-between border p-3 rounded hover:shadow-lg transition"
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
                  {shortDesc && (
                    <div className="text-sm text-foreground/60">
                      {shortDesc}
                    </div>
                  )}
                  <div className="text-sm text-foreground/60 mt-1">
                    Rp {Number(p.price).toLocaleString("id-ID")}
                  </div>
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
                  onClick={() => requestDelete(p.id, p.name)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Hapus
                </button>
              </div>
            </div>
          );
        })
      )}
      {/* Confirmation dialog */}
      <Dialog open={confirmOpen} onOpenChange={(o) => setConfirmOpen(o)}>
        <DialogContent>
          <DialogTitle>Hapus Produk</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus produk "{deletingName}"? Tindakan
            ini tidak dapat dikembalikan.
          </DialogDescription>
          <DialogFooter>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmOpen(false)}
                className="px-4 py-2 bg-white border rounded"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deletingId ?? undefined)}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Hapus
              </button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
