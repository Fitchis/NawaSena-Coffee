import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="bg-white">
        {/* Hero */}
        <section className="w-full">
          <div
            className="h-56 md:h-96 w-full bg-cover bg-center relative"
            style={{
              backgroundImage: "url('/img/background/about-bg.png')",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-[#A61515]/40 via-[#A61515]/40 to-transparent" />

            <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 h-full flex items-end">
              <div>
                <p className="text-sm text-white/80 uppercase mb-2 tracking-wider">
                  Tentang
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  Tentang NawaSena
                </h1>
                <p className="mt-4 text-white max-w-2xl">
                  Kami adalah kafe yang berdedikasi untuk menghadirkan kopi
                  berkualitas tinggi dengan pelayanan terbaik, inovasi digital,
                  dan komunitas yang hangat.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Profil + Card */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Profil Cafe
              </h2>
              <p className="text-foreground/70 mb-4">
                NawaSena Cafe didirikan dengan visi untuk menciptakan tempat
                yang nyaman bagi para pencinta kopi untuk bertemu, belajar, dan
                menikmati minuman berkualitas premium. Kami percaya bahwa setiap
                cangkir kopi memiliki cerita dan keunikan tersendiri.
              </p>
              <p className="text-foreground/70 mb-4">
                Dengan barista profesional dan biji kopi pilihan dari berbagai
                daerah, kami menghadirkan pengalaman minum kopi yang tak
                terlupakan. Setiap minuman disiapkan dengan teliti dan penuh
                keahlian untuk memastikan kualitas terbaik.
              </p>
              <p className="text-foreground/70">
                Lokasi kami yang strategis dan suasana yang nyaman menjadikan
                NawaSena Cafe sebagai pilihan utama bagi mereka yang menghargai
                kopi berkualitas dan pelayanan prima.
              </p>
            </div>

            <div className="rounded-lg overflow-hidden border border-border">
              <div
                className="relative h-48 md:h-56 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/img/background/hero-bg.png')",
                }}
              >
                <div className="absolute inset-0 bg-linear-to-tr from-[#A61515]/80 via-[#A61515]/40 to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center px-6">
                  <div className="text-center text-white">
                    <h3 className="font-semibold text-lg">
                      Suasana Modern & Nyaman
                    </h3>
                    <p className="text-sm opacity-80 mt-1">
                      Tempat berkumpul pecinta kopi sejati
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visi & Misi */}
        <section className="bg-background py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold">🎯 Visi & Misi Kami</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h4 className="font-semibold mb-3">Visi</h4>
                <p className="text-foreground/70">
                  Menjadi cafe pilihan utama yang dikenal karena kualitas kopi
                  premium, inovasi dalam pelayanan digital, dan komitmen
                  terhadap kepuasan pelanggan.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h4 className="font-semibold mb-3">Misi</h4>
                <ol className="list-decimal list-inside text-foreground/70 space-y-1">
                  <li>
                    Menyediakan kopi berkualitas tinggi dari biji pilihan
                    terbaik
                  </li>
                  <li>
                    Memberikan pelayanan yang ramah, profesional, dan memuaskan
                  </li>
                  <li>
                    Mengintegrasikan teknologi digital untuk kemudahan pemesanan
                  </li>
                  <li>
                    Membangun komunitas pecinta kopi yang solid dan engaged
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Nilai-Nilai */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">✨ Nilai-Nilai Kami</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "Kualitas",
                desc: "Kami berkomitmen menggunakan bahan terbaik dan proses brewing yang sempurna untuk setiap cangkir",
                icon: "sparkle.png",
              },
              {
                title: "Pelanggan Pertama",
                desc: "Kepuasan pelanggan adalah prioritas utama kami dalam setiap aspek pelayanan",
                icon: "heart.png",
              },
              {
                title: "Keberlanjutan",
                desc: "Kami peduli terhadap lingkungan dan mendukung praktik kopi yang berkelanjutan",
                icon: "leaf.png",
              },
              {
                title: "Komunitas",
                desc: "Kami membangun komunitas yang solid di mana pelanggan merasa seperti keluarga",
                icon: "people.png",
              },
              {
                title: "Inovasi",
                desc: "Terus berinovasi dalam menu dan layanan untuk memberikan pengalaman terbaik",
                icon: "recycle.png",
              },
              {
                title: "Efisiensi",
                desc: "Pelayanan cepat tanpa mengorbankan kualitas adalah komitmen kami",
                icon: "lightning.png",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="bg-card border border-border rounded-lg p-6 flex items-start gap-4"
              >
                <img
                  src={`/img/icon/${v.icon}`}
                  alt={v.title}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                />

                <div>
                  <h5 className="font-semibold mb-2">{v.title}</h5>
                  <p className="text-foreground/70 text-sm">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mengapa Memilih Kami */}
        <section className="bg-background py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold">❤️ Mengapa Memilih Kami?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 ">
              {[
                "Kopi Premium",
                "Barista Berpengalaman",
                "Pesan Online",
                "Suasana Nyaman",
                "Harga Kompetitif",
                "Program Member",
              ].map((t, i) => (
                <div
                  key={t}
                  className="bg-card border border-border rounded-lg p-6 flex items-start gap-4"
                >
                  <div className="text-2xl font-bold text-[#D92A2A] opacity-90">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h4 className="font-semibold">{t}</h4>
                    <p className="text-foreground/70 text-sm">
                      Deskripsi singkat tentang {t.toLowerCase()}.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
