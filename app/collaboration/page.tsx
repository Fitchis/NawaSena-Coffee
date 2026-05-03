"use client";

import React, { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Award, Briefcase, Check, ArrowRight } from "lucide-react";

export default function CollaborationPage() {
  const [program, setProgram] = useState("Program Sponsorship");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");

  return (
    <>
      <Header />

      <main className="bg-background">
        {/* Hero with background image */}
        <section className="w-full">
          <div
            className="h-64 md:h-96 w-full bg-cover bg-center relative"
            style={{ backgroundImage: "url('/img/background/collab.png')" }}
          >
            {/* tinted overlay to match design */}
            <div className="absolute inset-0 bg-[#A61515]/55" />

            <div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex items-end md:items-center pb-6 md:pb-0">
              <div className="text-white max-w-2xl">
                <p className="uppercase text-sm tracking-wider text-white/90 mb-2">
                  Mari Berkembang Bersama
                </p>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Program Kolaborasi
                </h1>
                <p className="mt-4 text-white/90 text-base md:text-lg">
                  Bergabunglah dengan NawaSena Cafe dan wujudkan visi bisnis
                  Anda melalui kerja sama strategis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Programs */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <p className="text-[#FF4545]">Program Kerja sama</p>
            <h2 className="text-4xl font-semibold text-foreground">
              Pilihan Kolaborasi Kami
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg p-6 bg-gradient-to-br from-white to-amber-50 border border-border shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                  <Award size={22} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-1">
                    Program Sponsorship
                  </h3>
                  <p className="text-foreground/70 mb-4">
                    Jadilah mitra kami dalam acara-acara khusus dan dapatkan
                    visibilitas brand yang lebih luas lewat event dan aktivitas
                    pemasaran bersama.
                  </p>

                  <ul className="space-y-2">
                    <li className="flex items-start gap-3 text-foreground/70">
                      <span className="mt-1 text-emerald-500">
                        <Check size={16} />
                      </span>
                      <span>Logo brand di materi event dan promosi</span>
                    </li>
                    <li className="flex items-start gap-3 text-foreground/70">
                      <span className="mt-1 text-emerald-500">
                        <Check size={16} />
                      </span>
                      <span>Booth eksklusif & sampling produk</span>
                    </li>
                    <li className="flex items-start gap-3 text-foreground/70">
                      <span className="mt-1 text-emerald-500">
                        <Check size={16} />
                      </span>
                      <span>Mention di social media resmi NawaSena</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-6 bg-gradient-to-br from-white to-sky-50 border border-border shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-sky-100 flex items-center justify-center text-sky-700">
                  <Briefcase size={22} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-1">
                    Program Pengadaan Tenant
                  </h3>
                  <p className="text-foreground/70 mb-4">
                    Perluas jangkauan bisnis Anda dengan membuka tenant di
                    lokasi strategis NawaSena — akses pelanggan dan dukungan
                    marketing dari kami.
                  </p>

                  <ul className="space-y-2">
                    <li className="flex items-start gap-3 text-foreground/70">
                      <span className="mt-1 text-emerald-500">
                        <Check size={16} />
                      </span>
                      <span>Lokasi premium dengan traffic tinggi</span>
                    </li>
                    <li className="flex items-start gap-3 text-foreground/70">
                      <span className="mt-1 text-emerald-500">
                        <Check size={16} />
                      </span>
                      <span>Dukungan marketing & pelatihan barista</span>
                    </li>
                    <li className="flex items-start gap-3 text-foreground/70">
                      <span className="mt-1 text-emerald-500">
                        <Check size={16} />
                      </span>
                      <span>Konsultasi manajemen & paket onboarding</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact form */}
        <section className="bg-background py-12">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Hubungi Kami Sekarang</h2>
              <p className="text-foreground/70">
                Isi formulir di bawah dan kami akan menghubungi Anda melalui
                WhatsApp
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // validate
                  if (!program || !name || !email || !phone || !description) {
                    alert("Mohon lengkapi semua field yang wajib.");
                    return;
                  }

                  const whatsappNumber = "62881026970075";
                  const lines = [
                    "Halo NawaSena,",
                    "",
                    "Saya ingin mengajukan kolaborasi.",
                    "",
                    `Program: ${program}`,
                    `Nama: ${name}`,
                    `Email: ${email}`,
                    `Telepon: ${phone}`,
                    `Instansi: ${company || "-"}`,
                    "",
                    "Deskripsi:",
                    description,
                  ];

                  const message = encodeURIComponent(lines.join("\n"));
                  const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;
                  window.open(url, "_blank");
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm mb-1">
                    Pilih Program Kolaborasi *
                  </label>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-2 px-3 py-2 border rounded-lg">
                      <input
                        type="radio"
                        name="program"
                        checked={program === "Program Sponsorship"}
                        onChange={() => setProgram("Program Sponsorship")}
                      />
                      <span>Program Sponsorship</span>
                    </label>
                    <label className="flex items-center gap-2 px-3 py-2 border rounded-lg">
                      <input
                        type="radio"
                        name="program"
                        checked={program === "Program Pengadaan Tenant"}
                        onChange={() => setProgram("Program Pengadaan Tenant")}
                      />
                      <span>Program Pengadaan Tenant</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1">Nama *</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-border rounded-md px-3 py-2"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Email *</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-border rounded-md px-3 py-2"
                    placeholder="Masukkan email Anda"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Nomor Telepon *</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-border rounded-md px-3 py-2"
                    placeholder="Masukkan nomor telepon Anda"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    Asal Instansi / Perusahaan (Opsional)
                  </label>
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full border border-border rounded-md px-3 py-2"
                    placeholder="Masukkan nama instansi atau perusahaan Anda"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    Kebutuhan / Deskripsi *
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-border rounded-md px-3 py-2 h-32"
                    placeholder="Jelaskan kebutuhan kolaborasi Anda secara detail"
                  />
                </div>

                <div>
                  <Button
                    type="submit"
                    className="w-full bg-red-600 text-white"
                  >
                    Kirim ke WhatsApp
                  </Button>
                </div>
              </form>
            </div>

            <div className="text-center text-sm text-foreground/70 mt-4">
              Atau hubungi kami langsung melalui: <br />{" "}
              <a href="tel:+628812345678" className="text-primary">
                +62 881 026 970 075
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
