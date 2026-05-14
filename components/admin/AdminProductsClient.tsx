"use client";

import { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import LogoutButton from "./LogoutButton";

export default function AdminProductsClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Record<string, any> | null>(null);
  const [refreshSignal, setRefreshSignal] = useState(0);
  const [totalProducts, setTotalProducts] = useState<number | null>(null);
  const [availableProducts, setAvailableProducts] = useState<number | null>(
    null,
  );
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // debounce the search input to avoid filtering on every keystroke
  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(id);
  }, [search]);

  // fetch product counts for stats widget
  useEffect(() => {
    let mounted = true;
    async function loadCounts() {
      try {
        const res = await fetch("/api/admin/products");
        if (!res.ok) throw new Error("Failed to load products");
        const data = await res.json();
        if (!mounted) return;
        const total = Array.isArray(data) ? data.length : 0;
        const available = Array.isArray(data)
          ? data.filter((p: any) => p.is_available).length
          : 0;
        setTotalProducts(total);
        setAvailableProducts(available);
      } catch (err) {
        console.error("Failed to fetch product counts", err);
        if (mounted) {
          setTotalProducts(null);
          setAvailableProducts(null);
        }
      }
    }

    loadCounts();
    return () => {
      mounted = false;
    };
  }, [refreshSignal]);

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
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Manajemen Produk
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Kelola katalog produk, sesuaikan harga, dan perbarui gambar menu
              Anda.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input Group */}
            <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500 overflow-hidden transition-all">
              <div className="pl-3 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari produk..."
                className="px-3 py-2.5 w-full sm:w-64 outline-none text-sm text-gray-700"
              />
              <button
                onClick={() => setRefreshSignal((s) => s + 1)}
                className="px-4 py-2.5 bg-gray-50 border-l border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 text-sm font-medium transition-colors"
                title="Search / Refresh"
              >
                Cari
              </button>
            </div>

            <button
              onClick={openNew}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-medium transition-all transform active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Tambah
            </button>

            <div className="pl-2 border-l border-gray-300">
              <LogoutButton />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Product List Section (Left Column) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800">
                  Daftar Produk
                </h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Live (Refresh: {refreshSignal})
                </span>
              </div>
              <div className="p-6">
                <ProductList
                  onEdit={handleEdit}
                  refreshSignal={refreshSignal}
                  search={debouncedSearch}
                  onDeleted={() => setRefreshSignal((s) => s + 1)}
                />
              </div>
            </div>
          </div>

          {/* Sidebar Section (Right Column) */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Stats Widget */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Statistik
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3">
                  <div className="text-blue-600 text-[10px] font-bold uppercase tracking-wider mb-1">
                    Total Produk
                  </div>
                  <div className="text-2xl font-black text-blue-900">
                    {totalProducts !== null
                      ? totalProducts.toLocaleString("id-ID")
                      : "—"}
                  </div>
                </div>
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-3">
                  <div className="text-emerald-600 text-[10px] font-bold uppercase tracking-wider mb-1">
                    Tersedia
                  </div>
                  <div className="text-2xl font-black text-emerald-900">
                    {availableProducts !== null
                      ? availableProducts.toLocaleString("id-ID")
                      : "—"}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Widget */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Aksi Cepat
              </h4>
              <div className="space-y-3">
                <button
                  onClick={() => setRefreshSignal((s) => s + 1)}
                  className="w-full flex justify-center items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Refresh Data
                </button>
                <button
                  onClick={openNew}
                  className="w-full flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Tambah Produk Baru
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Modal / Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          <div
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setModalOpen(false)}
          />
          <div className="bg-white rounded-2xl shadow-2xl z-10 w-full max-w-2xl overflow-hidden transform transition-all">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-xl font-bold text-gray-900">
                {editing ? "Edit Produk" : "Tambah Produk Baru"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <ProductForm
                initial={editing ?? undefined}
                onSaved={handleSaved}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
