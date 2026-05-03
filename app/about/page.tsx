import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="bg-background">
        {/* Hero */}
        <section
          className="w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/img/background/NawaSena barista.png')",
          }}
        >
          <div className="bg-gradient-to-r from-white/80 via-white/60 to-transparent">
            <div className="max-w-6xl mx-auto px-4 py-20">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Tentang <span className="text-primary">NawaSena</span>
              </h1>
              <p className="mt-4 text-foreground/70 max-w-2xl">
                Kami adalah kafe yang berdedikasi untuk menghadirkan kopi
                berkualitas tinggi dengan pelayanan terbaik, inovasi digital,
                dan komunitas yang hangat.
              </p>
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
              <p className="text-foreground/70">
                Dengan barista profesional dan biji kopi pilihan dari berbagai
                daerah, kami menghadirkan pengalaman minum kopi yang tak
                terlupakan. Setiap minuman disiapkan dengan teliti dan penuh
                keahlian untuk memastikan kualitas terbaik.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center">
                  ☕
                </div>
                <div>
                  <h3 className="font-semibold">Suasana Modern & Nyaman</h3>
                  <p className="text-sm text-foreground/60">
                    Tempat berkumpul pecinta kopi sejati
                  </p>
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
                desc: "Menggunakan bahan terbaik dan proses brewing yang sempurna.",
              },
              {
                title: "Pelanggan Pertama",
                desc: "Kepuasan pelanggan adalah prioritas utama.",
              },
              {
                title: "Keberlanjutan",
                desc: "Peduli terhadap lingkungan dan praktik yang berkelanjutan.",
              },
              {
                title: "Komunitas",
                desc: "Membangun komunitas yang solid dan ramah.",
              },
              {
                title: "Inovasi",
                desc: "Terus berinovasi dalam menu dan layanan.",
              },
              {
                title: "Efisiensi",
                desc: "Pelayanan cepat tanpa mengorbankan kualitas.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h5 className="font-semibold mb-2">{v.title}</h5>
                <p className="text-foreground/70 text-sm">{v.desc}</p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <div className="text-2xl font-bold text-primary opacity-90">
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
