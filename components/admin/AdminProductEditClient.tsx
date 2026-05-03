"use client";

import ProductForm from "./ProductForm";

export default function AdminProductEditClient({
  initial,
}: {
  initial: Record<string, any> | null;
}) {
  function handleSaved() {
    window.location.href = "/admin/products";
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Produk</h1>
      <ProductForm initial={initial as any} onSaved={handleSaved} />
    </div>
  );
}
