"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
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
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cart-context";
import Link from "next/link";
import { Loader2, ArrowLeft, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, removeItem, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    delivery_address: "",
    notes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.customer_name ||
      !formData.customer_email ||
      !formData.delivery_address
    ) {
      toast({
        title: "Lengkapi data",
        description: "Mohon lengkapi semua data yang diperlukan",
        variant: "destructive",
      });
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Keranjang kosong",
        description: "Keranjang Anda kosong",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: formData.customer_name,
          customer_email: formData.customer_email,
          customer_phone: formData.customer_phone,
          delivery_address: formData.delivery_address,
          notes: formData.notes,
          items: items.map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
          })),
          total_amount: total,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Gagal membuat pesanan");
      }

      const result = await response.json();
      clearCart();
      router.push(`/order-confirmation/${result.order.id}`);
    } catch (error) {
      console.error("[v0] Order error:", error);
      toast({
        title: "Gagal",
        description: `Gagal membuat pesanan: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Keranjang Belanja Kosong
            </h2>
            <p className="text-foreground/70 mb-8">
              Silakan pilih minuman terlebih dahulu
            </p>
            <Link href="/menu">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Kembali ke Menu
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="w-full max-w-6xl mx-auto px-4 py-12">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/90 mb-8"
          >
            <ArrowLeft size={20} />
            Kembali ke Menu
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <Card className="sticky top-24 border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Ringkasan Pesanan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => {
                    const addonsSum = (item.addons || []).reduce(
                      (a, b) => a + (b.price || 0),
                      0,
                    );
                    const lineTotal = (item.price + addonsSum) * item.quantity;
                    return (
                      <div
                        key={item.key}
                        className="flex justify-between items-start gap-2"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-foreground">
                            {item.name}
                          </p>
                          <p className="text-sm text-foreground/60">
                            x{item.quantity}
                          </p>
                          {item.addons && item.addons.length > 0 && (
                            <p className="text-xs text-foreground/60">
                              {item.addons.map((a) => a.name).join(", ")}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground">
                            Rp {lineTotal.toLocaleString("id-ID")}
                          </p>
                          <button
                            onClick={() => removeItem(item.key!)}
                            className="text-xs text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between">
                      <span className="text-foreground font-semibold">
                        Total:
                      </span>
                      <span className="text-2xl font-bold text-primary">
                        Rp {total.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Data Pengiriman
                  </CardTitle>
                  <CardDescription className="text-foreground/60">
                    Lengkapi data untuk menyelesaikan pesanan
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmitOrder}>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Nama Lengkap *
                      </label>
                      <Input
                        type="text"
                        name="customer_name"
                        value={formData.customer_name}
                        onChange={handleInputChange}
                        placeholder="Masukkan nama Anda"
                        className="bg-input border-border text-foreground"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Email *
                      </label>
                      <Input
                        type="email"
                        name="customer_email"
                        value={formData.customer_email}
                        onChange={handleInputChange}
                        placeholder="email@contoh.com"
                        className="bg-input border-border text-foreground"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Nomor Telepon
                      </label>
                      <Input
                        type="tel"
                        name="customer_phone"
                        value={formData.customer_phone}
                        onChange={handleInputChange}
                        placeholder="+62 ..."
                        className="bg-input border-border text-foreground"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Alamat Pengiriman *
                      </label>
                      <textarea
                        name="delivery_address"
                        value={formData.delivery_address}
                        onChange={handleInputChange}
                        placeholder="Jalan, Nomor, Kota"
                        className="w-full p-3 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        rows={4}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Catatan Tambahan
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Contoh: tanpa es, tambah gula, dll"
                        className="w-full p-3 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        rows={3}
                      />
                    </div>
                  </CardContent>

                  <CardFooter className="gap-3">
                    <Link href="/menu" className="flex-1">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full border-border"
                      >
                        Batal
                      </Button>
                    </Link>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={18} className="mr-2 animate-spin" />
                          Memproses...
                        </>
                      ) : (
                        "Buat Pesanan"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
