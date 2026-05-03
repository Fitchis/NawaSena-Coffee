"use server";

import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url?: string | null;
};

export async function FeaturedMenu() {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, description, price, image_url")
    .eq("is_available", true)
    .order("created_at", { ascending: false })
    .limit(4);

  const items: Product[] = (products as any) || [];

  if (error) {
    console.error("Error fetching products for FeaturedMenu:", error);
  }

  return (
    <section className="py-16 bg-background">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-red-500 font-semibold">
              PILIHAN TERBAIK
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Minuman Rekomendasi
            </h2>
          </div>
          <div>
            <Link href="/menu" className="text-sm text-red-500 hover:underline">
              Lihat Semua Menu →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <Card
              key={item.id}
              className="hover:shadow-lg transition-shadow border-border bg-card rounded-lg overflow-hidden"
            >
              <div className="h-44 w-full bg-gray-100 overflow-hidden">
                <img
                  src={item.image_url || "/img/placeholder-drink.png"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <CardHeader className="pt-4 pb-2 px-4">
                <CardTitle className="text-foreground text-lg">
                  {item.name}
                </CardTitle>
                <CardDescription className="text-foreground/60">
                  {item.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-4 pt-2 pb-4 flex items-center justify-between">
                <p className="text-lg font-bold text-red-500">
                  Rp {Number(item.price).toLocaleString("id-ID")}
                </p>
                <Link href={`/menu`}>
                  <Button className="bg-red-500 hover:bg-red-500/90 text-white px-4 py-2 rounded-md">
                    Pesan
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
