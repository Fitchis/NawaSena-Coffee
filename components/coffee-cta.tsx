"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CoffeeCta() {
  return (
    <section
      className="relative min-h-[60vh] flex items-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/img/background/Premium coffee beans.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="w-full max-w-6xl mx-auto px-6 py-20 relative z-10 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold">
          Pesan dari Meja Anda, Tanpa Antri
        </h2>
        <p className="mt-4 text-sm md:text-base text-white/80 max-w-2xl mx-auto">
          Gunakan sistem pemesanan digital kami untuk pengalaman yang lebih
          cepat dan nyaman.
        </p>

        <div className="mt-8">
          <Link href="/menu">
            <Button className="bg-red-500 hover:bg-red-500/90 text-white px-6">
              Mulai Pesan →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
