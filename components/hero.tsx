"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center flex items-center"
      style={{
        backgroundImage: "url('/img/background/NawaSena-premium-coffee.png')",
      }}
    >
      {/* dark gradient overlay (left heavy) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      <div className="w-full max-w-6xl mx-auto px-6 py-24 relative z-10 flex items-center">
        <div className="max-w-2xl text-left">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 bg-black/40 text-white/90 rounded-full px-4 py-2 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M11.3 1.046a1 1 0 0 0-2.6 0l-.364 1.092a1 1 0 0 1-.948.69H6.07a1 1 0 0 0-.59 1.806l.884.684a1 1 0 0 1 .33.998l-.33 1.33a1 1 0 0 0 1.451 1.104l1.155-.59a1 1 0 0 1 1.017 0l1.155.59a1 1 0 0 0 1.451-1.104l-.33-1.33a1 1 0 0 1 .33-.998l.884-.684A1 1 0 0 0 13.93 3.828h-1.323a1 1 0 0 1-.948-.69L11.3 1.046z" />
              </svg>
              Premium Coffee Experience
            </span>
          </div>

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
                className="bg-[#FF4545] border border-white/20 text-white px-6 hover:bg-white/5"
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
