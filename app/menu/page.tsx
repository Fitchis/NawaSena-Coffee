"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import {
  Loader2,
  ShoppingCart,
  Plus,
  Minus,
  Trash,
  User,
  QrCode,
  CreditCard,
  Phone,
  CheckCircle,
  Coffee,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useMemo, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  is_available: boolean;
  category_id: string;
  categories: {
    id: string;
    name: string;
  };
}

export default function MenuPage() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const {
    addItem,
    items: cartItems,
    total,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const router = useRouter();

  // open checkout modal when ?checkout=1 is present (use window.location to avoid CSR bailout)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkout")) {
      setIsCheckoutOpen(true);
    }
  }, []);

  // Checkout modal state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    customer_name: "",
    customer_phone: "",
  });
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);
  const [createdOrder, setCreatedOrder] = useState<any | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const countdownRef = useRef<number | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleCheckoutInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setCheckoutForm((p) => ({ ...p, [name]: value }));
  };

  // New flow: step 1 = info, step 2 = konfirmasi, step 3 = selesai (QRIS)
  const handleNextFromInfo = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!checkoutForm.customer_name || !checkoutForm.customer_phone) {
      toast({
        title: "Lengkapi data",
        description: "Mohon lengkapi semua data yang diperlukan",
        variant: "destructive",
      });
      return;
    }
    setCheckoutStep(2);
  };

  const handleCreateOrder = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Keranjang kosong",
        description: "Tambahkan produk sebelum checkout",
        variant: "destructive",
      });
      return;
    }

    setCheckoutLoading(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: checkoutForm.customer_name,
          customer_phone: checkoutForm.customer_phone,
          items: cartItems.map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
          })),
          total_amount: total,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Gagal membuat pesanan");
      }

      const result = await response.json();
      // keep order info to display QRIS
      setCreatedOrder(result.order || result);
      // clear cart so user can't accidentally resubmit
      clearCart();
      setCheckoutStep(3);
      // start auto-close countdown (60s)
      const start = 60; // seconds
      setCountdown(start);
      // ensure any previous timers cleared
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
        countdownRef.current = null;
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current as any);
        closeTimeoutRef.current = null;
      }

      countdownRef.current = window.setInterval(() => {
        setCountdown((prev) => {
          if (prev === null) return null;
          if (prev <= 1) {
            // start closing animation
            if (countdownRef.current) {
              clearInterval(countdownRef.current);
              countdownRef.current = null;
            }
            setIsClosing(true);
            // wait animation (400ms) then fully close
            closeTimeoutRef.current = window.setTimeout(() => {
              setIsCheckoutOpen(false);
              setCheckoutStep(1);
              setCreatedOrder(null);
              setIsClosing(false);
              setCountdown(null);
              if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current as any);
                closeTimeoutRef.current = null;
              }
            }, 400) as unknown as number;
            return 0;
          }
          return prev - 1;
        });
      }, 1000) as unknown as number;
    } catch (error) {
      console.error("[v0] Order error:", error);
      toast({
        title: "Gagal",
        description: `Gagal membuat pesanan: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      });
    } finally {
      setCheckoutLoading(false);
    }
  };

  // Modal state for product options
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Option selections
  const [sugarLevel, setSugarLevel] = useState("Normal");
  const [iceLevel, setIceLevel] = useState("Normal Ice");
  const [selectedAddons, setSelectedAddons] = useState<
    { id: string; name: string; price: number }[]
  >([]);

  const [availableAddons, setAvailableAddons] = useState<
    { id: string; name: string; price: number }[]
  >([]);
  const DEFAULT_ADDONS = [
    { id: "extra_shot", name: "Extra Shot", price: 5000 },
    { id: "whipped_cream", name: "Whipped Cream", price: 3000 },
    { id: "boba", name: "Boba", price: 5000 },
    { id: "jelly", name: "Jelly", price: 4000 },
    { id: "vanilla", name: "Vanilla Syrup", price: 3000 },
    { id: "hazelnut", name: "Hazelnut Syrup", price: 3000 },
  ];

  useEffect(() => {
    let mounted = true;
    fetch("/api/addons")
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        const parsed = (data || []).map((a: any) => ({
          id: a.id,
          name: a.name,
          price: a.price,
        }));
        setAvailableAddons(parsed.length ? parsed : DEFAULT_ADDONS);
      })
      .catch((err) => {
        console.error("Error fetching addons:", err);
        if (mounted) setAvailableAddons(DEFAULT_ADDONS);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const ADDONS = availableAddons;

  const addonTotal = useMemo(
    () => selectedAddons.reduce((s, a) => s + (a.price || 0), 0),
    [selectedAddons],
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error(" Error fetching products:", err);
      setError("Gagal memuat menu");
    } finally {
      setLoading(false);
    }
  };

  const categories = Array.from(
    new Map(
      products.map((p) => [p.categories.id, p.categories.name]),
    ).entries(),
  ).map(([id, name]) => ({ id, name }));

  const filteredProducts = (() => {
    if (selectedCategory === null) return products;
    const key = (selectedCategory || "").toLowerCase();
    if (key === "makanan") {
      return products.filter((p) =>
        (p.categories?.name || "").toLowerCase().includes("makanan"),
      );
    }
    if (key === "minuman") {
      // Group everything that's not 'makanan' into Minuman (includes 'kopi')
      return products.filter((p) => {
        const name = (p.categories?.name || "").toLowerCase();
        return !name.includes("makanan");
      });
    }

    return products;
  })();

  const handleAddToCart = (product: Product) => {
    // open modal to choose options
    setSelectedProduct(product);
    setSugarLevel("Normal");
    setIceLevel("Normal Ice");
    setSelectedAddons([]);
    setIsModalOpen(true);
  };

  const confirmAddWithOptions = () => {
    if (!selectedProduct) return;

    const itemPrice = selectedProduct.price;
    const addons = selectedAddons;

    addItem({
      product_id: selectedProduct.id,
      name: selectedProduct.name,
      price: itemPrice,
      image_url: selectedProduct.image_url,
      quantity: 1,
      options: { sugar: sugarLevel, ice: iceLevel },
      addons,
    });

    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Full-width hero background */}
        <div className="w-full">
          <div
            className="h-56 md:h-72 w-full bg-cover bg-center relative"
            style={{
              backgroundImage: "url('/img/background/NawaSena barista.png')",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-[#A61515]/40 via-[#A61515]/40 to-[#A61515]/40" />
            <div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex items-end pb-6">
              <div>
                <p className="text-sm text-white/80 uppercase mb-2 tracking-wider">
                  Jelajahi
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-0">
                  Menu Kami
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-6xl mx-auto px-4 py-12">
          {/* Category Filter: Kopi / Non-Kopi - styled like image */}
          <div className="mb-8">
            <div className="rounded-lg border border-border bg-card p-1 flex items-center gap-2 max-w-lg">
              <button
                onClick={() => setSelectedCategory("Minuman")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors duration-150 ${
                  selectedCategory === "Minuman"
                    ? "bg-[#D92A2A] text-white shadow-inner"
                    : "bg-white text-foreground"
                }`}
                aria-pressed={selectedCategory === "Minuman"}
              >
                <Coffee size={16} />
                <span
                  className={
                    selectedCategory === "Minuman"
                      ? "font-semibold"
                      : "font-medium text-foreground/70"
                  }
                >
                  Minuman
                </span>
              </button>

              <button
                onClick={() => setSelectedCategory("Makanan")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors duration-150 ${
                  selectedCategory === "Makanan"
                    ? "bg-[#D92A2A] text-white shadow-inner"
                    : "bg-white text-foreground"
                }`}
                aria-pressed={selectedCategory === "Makanan"}
              >
                <Coffee size={16} />
                <span
                  className={
                    selectedCategory === "Makanan"
                      ? "font-semibold"
                      : "font-medium text-foreground/70"
                  }
                >
                  Makanan
                </span>
              </button>
            </div>
          </div>

          {/* Products Grid + Cart Sidebar */}
          {loading ? (
            <div className="flex items-center justify-center min-h-96">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-12">{error}</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center text-foreground/60 py-12">
              Tidak ada produk tersedia
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="hover:shadow-lg transition-shadow border-border bg-card flex flex-col"
                    >
                      <div className="h-44 w-full bg-gray-100 overflow-hidden">
                        <img
                          src={product.image_url || "https://placehold.co/400"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <CardHeader className="pb-3">
                        <CardTitle className="text-foreground">
                          {product.name}
                        </CardTitle>
                        <CardDescription className="text-foreground/60">
                          {product.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="pb-3 flex-grow" />

                      <CardFooter className="pt-3 gap-2 flex items-center justify-between">
                        <div className="text-2xl font-bold text-primary">
                          Rp {product.price.toLocaleString("id-ID")}
                        </div>

                        <Button
                          onClick={() => handleAddToCart(product)}
                          className="bg-[#D92A2A] hover:bg-[#D92A2A]/90 text-white px-4 py-2"
                        >
                          <ShoppingCart size={18} className="mr-2" />
                          Tambah
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>

              <aside className="lg:col-span-1">
                <div className="sticky top-24 border border-border rounded-lg bg-card p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#D92A2A] text-primary-foreground p-2 rounded-md">
                        <ShoppingCart size={18} />
                      </div>
                      <h3 className="text-lg font-semibold">Keranjang</h3>
                    </div>
                    <div>
                      <span className="text-sm text-foreground/60 mr-3">
                        {cartItems.length} item
                      </span>
                      <button
                        onClick={() => clearCart()}
                        className="text-sm text-foreground/60 hover:underline"
                      >
                        Kosongkan
                      </button>
                    </div>
                  </div>

                  {cartItems.length === 0 ? (
                    <div className="text-center py-8 text-foreground/60">
                      <div className="w-24 h-24 rounded-full bg-[#FFF4F4] border border-[#F2CACA] mx-auto flex items-center justify-center mb-4">
                        <ShoppingCart size={36} className="text-[#D92A2A]" />
                      </div>
                      <div className="text-xl font-medium text-foreground mb-1">
                        Keranjang masih kosong
                      </div>
                      <div className="text-sm mt-2 text-foreground/60">
                        Tambahkan menu untuk mulai memesan
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((it) => {
                        const addonsSum = (it.addons || []).reduce(
                          (a, b) => a + (b.price || 0),
                          0,
                        );
                        const perUnit = it.price + addonsSum;
                        return (
                          <div
                            key={it.key}
                            className="bg-foreground/5 rounded-lg p-3"
                          >
                            <div className="flex items-start gap-3">
                              <img
                                src={
                                  it.image_url || "/img/placeholder-drink.png"
                                }
                                alt={it.name}
                                className="w-14 h-14 rounded-md object-cover"
                              />

                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div className="font-medium text-foreground">
                                    {it.name}
                                  </div>
                                  <button
                                    onClick={() => removeItem(it.key!)}
                                    className="text-rose-500"
                                  >
                                    <Trash size={16} />
                                  </button>
                                </div>

                                <div className="text-sm text-foreground/60">
                                  Rp {perUnit.toLocaleString("id-ID")}
                                </div>

                                <div className="mt-2 flex items-center gap-2 flex-wrap">
                                  {it.options?.sugar && (
                                    <span className="text-xs px-2 py-1 bg-foreground/10 rounded-full">
                                      {it.options.sugar}
                                    </span>
                                  )}
                                  {it.options?.ice && (
                                    <span className="text-xs px-2 py-1 bg-foreground/10 rounded-full">
                                      {it.options.ice}
                                    </span>
                                  )}
                                  {(it.addons || []).map((a: any) => (
                                    <span
                                      key={a.id}
                                      className="text-xs px-2 py-1 bg-foreground/10 rounded-full"
                                    >
                                      {a.name}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="flex flex-col items-center gap-2">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() =>
                                      updateQuantity(it.key!, it.quantity - 1)
                                    }
                                    className="w-8 h-8 rounded-md bg-white border flex items-center justify-center"
                                  >
                                    <Minus size={14} />
                                  </button>
                                  <div className="px-3 font-medium">
                                    {it.quantity}
                                  </div>
                                  <button
                                    onClick={() =>
                                      updateQuantity(it.key!, it.quantity + 1)
                                    }
                                    className="w-8 h-8 rounded-md bg-white border flex items-center justify-center"
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      <div className="pt-3 border-t border-border">
                        <div className="flex items-center justify-between font-semibold text-foreground">
                          <div>Total</div>
                          <div className="text-lg">
                            Rp {total.toLocaleString("id-ID")}
                          </div>
                        </div>

                        <div className="mt-4">
                          <Button
                            onClick={() => setIsCheckoutOpen(true)}
                            className="w-full bg-[#D92A2A] hover:opacity-95 text-white py-3"
                          >
                            Lanjutkan Pemesanan
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>
      {/* Product options modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          {/* product image */}
          {selectedProduct?.image_url && (
            <div className="-mx-6 mb-4 h-48 w-full overflow-hidden rounded-t-md">
              <img
                src={selectedProduct.image_url}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <DialogHeader>
            <DialogTitle>
              {selectedProduct ? selectedProduct.name : "Pilih Opsi"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 max-h-[60vh] overflow-auto pt-2">
            <div>
              <h4 className="font-semibold mb-2">Level Gula</h4>
              <div className="grid grid-cols-2 gap-2">
                {["Normal", "Half Sugar", "Less Sugar", "No Sugar"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSugarLevel(s)}
                    className={`py-2 px-3 rounded-md border ${sugarLevel === s ? "bg-[#D92A2A] text-white" : "bg-transparent"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Level Es</h4>
              <div className="grid grid-cols-3 gap-2">
                {["Normal Ice", "Less Ice", "No Ice"].map((i) => (
                  <button
                    key={i}
                    onClick={() => setIceLevel(i)}
                    className={`py-2 px-3 rounded-md border ${iceLevel === i ? "bg-[#D92A2A] text-white" : "bg-transparent"}`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Add-on</h4>
              <div className="space-y-2">
                {ADDONS.map((a) => {
                  const checked = selectedAddons.find((x) => x.id === a.id);
                  return (
                    <label
                      key={a.id}
                      className="flex items-center justify-between p-3 border rounded-md"
                    >
                      <div>
                        <div className="font-medium">{a.name}</div>
                        <div className="text-sm text-foreground/60">
                          +Rp {a.price.toLocaleString("id-ID")}
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={!!checked}
                        onChange={() => {
                          if (checked)
                            setSelectedAddons((prev) =>
                              prev.filter((x) => x.id !== a.id),
                            );
                          else setSelectedAddons((prev) => [...prev, a]);
                        }}
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <div>Harga dasar</div>
                <div>
                  Rp{" "}
                  {selectedProduct
                    ? selectedProduct.price.toLocaleString("id-ID")
                    : "0"}
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 font-semibold">
                <div>Total per item</div>
                <div>
                  Rp{" "}
                  {selectedProduct
                    ? (selectedProduct.price + addonTotal).toLocaleString(
                        "id-ID",
                      )
                    : "0"}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <div className="w-full flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="flex-1"
              >
                Batal
              </Button>
              <Button
                onClick={confirmAddWithOptions}
                className="flex-1 bg-[#D92A2A] text-white"
              >
                Tambahkan ke Keranjang
              </Button>
            </div>
          </DialogFooter>
          <DialogClose />
        </DialogContent>
      </Dialog>

      {/* Checkout modal (3-step) */}
      <Dialog
        open={isCheckoutOpen}
        onOpenChange={(open) => {
          if (!open) {
            setCheckoutStep(1);
            setCreatedOrder(null);
            if (countdownRef.current) {
              clearInterval(countdownRef.current);
              countdownRef.current = null;
            }
            if (closeTimeoutRef.current) {
              clearTimeout(closeTimeoutRef.current as any);
              closeTimeoutRef.current = null;
            }
            setCountdown(null);
            setIsClosing(false);
          }
          setIsCheckoutOpen(open);
        }}
      >
        <DialogContent>
          <div
            className={`transform transition-all duration-300 ${isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
          >
            <DialogHeader>
              <DialogTitle>
                {checkoutStep === 1
                  ? "Informasi Pemesan"
                  : checkoutStep === 2
                    ? "Konfirmasi Pesanan"
                    : "Pesanan Berhasil"}
              </DialogTitle>
            </DialogHeader>

            {/* step indicator */}
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`flex items-center gap-2 ${checkoutStep === 1 ? "font-semibold" : "text-foreground/60"}`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${checkoutStep === 1 ? "bg-[#D92A2A] text-white" : "bg-foreground/10 text-foreground/60"}`}
                >
                  1
                </div>
                <div>Data Diri</div>
              </div>
              <div
                className={`flex items-center gap-2 ${checkoutStep === 2 ? "font-semibold" : "text-foreground/60"}`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${checkoutStep === 2 ? "bg-[#D92A2A] text-white" : "bg-foreground/10 text-foreground/60"}`}
                >
                  2
                </div>
                <div>Konfirmasi</div>
              </div>
              <div
                className={`flex items-center gap-2 ${checkoutStep === 3 ? "font-semibold" : "text-foreground/60"}`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${checkoutStep === 3 ? "bg-[#D92A2A] text-white" : "bg-foreground/10 text-foreground/60"}`}
                >
                  3
                </div>
                <div>Selesai</div>
              </div>
            </div>

            {checkoutStep === 1 && (
              <form
                onSubmit={handleNextFromInfo}
                className="space-y-4 max-h-[60vh] overflow-auto pt-2"
              >
                {/* Ringkasan Pesanan (rounded card) */}
                <div className="p-4 rounded-xl bg-amber-50 border border-border">
                  <div className="text-sm text-foreground/70 font-semibold mb-2">
                    RINGKASAN PESANAN
                  </div>
                  {cartItems.map((it) => {
                    const addonsSum = (it.addons || []).reduce(
                      (a, b) => a + (b.price || 0),
                      0,
                    );
                    const line = (it.price + addonsSum) * it.quantity;
                    return (
                      <div key={it.key} className="mb-3">
                        <div className="font-medium">{it.name}</div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                              Normal
                            </span>
                            <span className="text-xs px-2 py-1 bg-sky-100 text-sky-800 rounded-full">
                              Normal Ice
                            </span>
                          </div>
                          <div className="font-semibold">
                            Rp {line.toLocaleString("id-ID")}
                          </div>
                        </div>
                        <div className="mt-3 border-t pt-3">
                          <div className="font-semibold">Total</div>
                          <div className="text-lg font-bold">
                            Rp {total.toLocaleString("id-ID")}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Input fields with icon and pale-blue background */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Nama Lengkap
                  </label>
                  <div className="flex items-center gap-3 bg-sky-50 rounded-lg p-2 border border-border">
                    <div className="p-2 rounded-full bg-white border">
                      <User size={18} className="text-foreground/70" />
                    </div>
                    <input
                      name="customer_name"
                      value={checkoutForm.customer_name}
                      onChange={handleCheckoutInput}
                      placeholder="Masukkan nama"
                      className="flex-1 bg-transparent outline-none px-2 text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Nomor Telepon
                  </label>
                  <div className="flex items-center gap-3 bg-sky-50 rounded-lg p-2 border border-border">
                    <div className="p-2 rounded-full bg-white border">
                      <Phone size={16} className="text-foreground/70" />
                    </div>
                    <input
                      name="customer_phone"
                      value={checkoutForm.customer_phone}
                      onChange={handleCheckoutInput}
                      placeholder="0853..."
                      className="flex-1 bg-transparent outline-none px-2 text-foreground"
                    />
                  </div>
                </div>

                <DialogFooter>
                  <div className="w-full flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsCheckoutOpen(false);
                        setCheckoutStep(1);
                      }}
                      className="flex-1 bg-foreground/5 border-border"
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-[#D92A2A] text-white"
                    >
                      Lanjut
                    </Button>
                  </div>
                </DialogFooter>
              </form>
            )}

            {checkoutStep === 2 && (
              <div className="space-y-4 max-h-[60vh] overflow-auto pt-2">
                <h4 className="font-semibold">Konfirmasi Pesanan</h4>

                {/* Pesanan card */}
                <div className="p-4 rounded-lg bg-foreground/5 border border-border">
                  <div className="text-sm text-foreground/70 font-semibold mb-2">
                    PESANAN
                  </div>
                  <div className="space-y-3">
                    {cartItems.map((it) => {
                      const addonsSum = (it.addons || []).reduce(
                        (a, b) => a + (b.price || 0),
                        0,
                      );
                      const line = (it.price + addonsSum) * it.quantity;
                      return (
                        <div
                          key={it.key}
                          className="flex items-start justify-between"
                        >
                          <div className="flex-1">
                            <div className="font-medium">
                              {it.name} x{it.quantity}
                            </div>
                            <div className="mt-2 flex items-center gap-2 flex-wrap">
                              {/* example option badges */}
                              <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                                Normal
                              </span>
                              <span className="text-xs px-2 py-1 bg-sky-100 text-sky-800 rounded-full">
                                Normal Ice
                              </span>
                              {(it.addons || []).map((a: any) => (
                                <span
                                  key={a.id}
                                  className="text-xs px-2 py-1 bg-foreground/10 rounded-full"
                                >
                                  {a.name}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="font-semibold">
                            Rp {line.toLocaleString("id-ID")}
                          </div>
                        </div>
                      );
                    })}

                    <div className="pt-3 border-t mt-3 flex items-center justify-between font-semibold">
                      <div>Total</div>
                      <div>Rp {total.toLocaleString("id-ID")}</div>
                    </div>
                  </div>
                </div>

                {/* Pemesan card */}
                <div className="p-4 rounded-lg bg-foreground/5 border border-border flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border">
                    <User size={20} />
                  </div>
                  <div>
                    <div className="font-medium">
                      {checkoutForm.customer_name || "Pengguna"}
                    </div>
                    <div className="text-sm text-foreground/60">
                      {checkoutForm.customer_phone || "-"}
                    </div>
                  </div>
                </div>

                {/* Instruksi pembayaran */}
                <div className="p-4 rounded-lg border border-border">
                  <div className="font-semibold mb-3">Instruksi Pembayaran</div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-md bg-amber-50 flex items-center justify-center">
                        <QrCode size={18} className="text-amber-700" />
                      </div>
                      <div>
                        <div className="font-medium">Scan QRIS</div>
                        <div className="text-sm text-foreground/60">
                          Scan QR code di kasir untuk pembayaran digital
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-md bg-amber-50 flex items-center justify-center">
                        <CreditCard size={18} className="text-amber-700" />
                      </div>
                      <div>
                        <div className="font-medium">Bayar di Kasir</div>
                        <div className="text-sm text-foreground/60">
                          Atau bayar langsung secara tunai di kasir
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <div className="w-full flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setCheckoutStep(1)}
                      className="flex-1"
                    >
                      ← Kembali
                    </Button>
                    <Button
                      onClick={handleCreateOrder}
                      className="flex-1 bg-[#D92A2A] text-white"
                      disabled={checkoutLoading}
                    >
                      {checkoutLoading ? "Memproses..." : "Konfirmasi Pesanan"}
                    </Button>
                  </div>
                </DialogFooter>
              </div>
            )}

            {checkoutStep === 3 && (
              <div className="space-y-6 text-center py-6">
                <div className="w-24 h-24 rounded-full bg-green-50 mx-auto flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-green-200">
                    <CheckCircle size={28} className="text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">Pesanan Diterima!</h3>
                <div className="text-sm text-foreground/60">
                  Pesanan atas nama{" "}
                  <span className="font-semibold">
                    {checkoutForm.customer_name}
                  </span>{" "}
                  telah diterima. Segera lakukan pembayaran.
                </div>

                <div className="p-4 rounded-lg bg-foreground/5">
                  <div className="text-sm text-foreground/60">
                    Total Pembayaran
                  </div>
                  <div className="text-2xl font-bold mt-2">
                    Rp{" "}
                    {Number(createdOrder?.total_amount ?? total).toLocaleString(
                      "id-ID",
                    )}
                  </div>
                </div>

                <div>
                  <div className="mb-2 text-sm font-medium">
                    Silakan scan QRIS untuk melakukan pembayaran
                  </div>
                  <div className="w-40 h-40 mx-auto bg-white border border-border flex items-center justify-center">
                    {/* placeholder QR box */}
                    <div className="text-sm text-foreground/60">QRIS</div>
                  </div>
                </div>

                <div className="text-sm text-foreground/60">
                  Pesanan Anda akan diproses setelah pembayaran
                </div>

                <div className="text-xs text-foreground/60">
                  Menutup otomatis dalam beberapa detik
                  {countdown ? ` (${countdown}s)` : "..."}
                </div>

                <div className="flex gap-3 justify-center mt-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setCheckoutStep(1);
                      setCreatedOrder(null);
                    }}
                    className="px-6"
                  >
                    Tutup
                  </Button>
                </div>
              </div>
            )}
          </div>

          <DialogClose />
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
}
