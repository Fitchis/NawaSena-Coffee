"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center flex items-center"
      style={{
        backgroundImage: "url('/img/background/hero-bg.png')",
      }}
    >
      {/* dark gradient overlay (left heavy) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      <div className="w-full max-w-6xl mx-auto px-6 py-24 relative z-10 flex items-center">
        <div className="max-w-2xl text-left">
          <div className="inline-flex items-center gap-3 mb-6"></div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
            Kopi Terbaik,
            <br />
            Momen Terbaik.
          </h1>

          <p className="mt-6 text-lg text-white/80 max-w-xl">
            Nikmati racikan kopi premium dari biji pilihan di NawaSena Cafe.
            Pesan langsung dari meja Anda, tanpa antri.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/menu">
              <Button
                size="lg"
                className="bg-[#D92A2A] border border-white/20 text-white px-6 hover:bg-white/5"
              >
                Pesan Sekarang -&gt;
              </Button>
            </Link>

            <Link href="#tentang">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border border-white/30 text-white/90 hover:bg-white/5 px-6"
              >
                Tentang Kami
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
