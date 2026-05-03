"use client";

import { useState } from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import LogoutButton from "./LogoutButton";

export default function AdminProductsClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Record<string, any> | null>(null);
  const [refreshSignal, setRefreshSignal] = useState(0);

  function openNew() {
    setEditing(null);
    setModalOpen(true);
  }

  function handleEdit(p: Record<string, any>) {
    setEditing(p);
    setModalOpen(true);
  }

  function handleSaved() {
    setModalOpen(false);
    setEditing(null);
    setRefreshSignal((s) => s + 1);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin - Produk</h1>
        <div className="flex items-center">
          <button
            onClick={openNew}
            className="mr-4 bg-primary text-white px-3 py-1 rounded"
          >
            Tambah Produk
          </button>
          <LogoutButton />
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-3">
          <h2 className="text-lg font-semibold mb-2">Daftar Produk</h2>
          <ProductList onEdit={handleEdit} refreshSignal={refreshSignal} />
        </div>
      </section>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setModalOpen(false)}
          />
          <div className="bg-white rounded shadow-lg p-6 z-10 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editing ? "Edit Produk" : "Tambah Produk"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500"
              >
                Tutup
              </button>
            </div>
            <ProductForm initial={editing ?? undefined} onSaved={handleSaved} />
          </div>
        </div>
      )}
    </div>
  );
}
