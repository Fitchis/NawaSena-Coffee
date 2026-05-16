"use client";

import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Award, Briefcase, Check, Handshake } from "lucide-react";

export default function CollaborationPage() {
  const { toast } = useToast();
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
              Event & Kolaborasi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Program Sponsorship */}
            <div className="rounded-2xl p-8 bg-gradient-to-br from-[#F4FAFF] to-[#E3F2FF] border border-blue-200 shadow-sm transition-transform transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6">
                <Handshake size={24} className="text-blue-600" />
              </div>

              <h3 className="font-bold text-2xl mb-3 text-gray-900">
                Program Sponsorship
              </h3>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Jadilah mitra kami dalam acara-acara khusus dan dapatkan
                visibilitas brand yang luar biasa
              </p>

              <div className="font-bold text-gray-900 mb-4">
                Benefit Program:
              </div>
              <ul className="space-y-3">
                {[
                  "Logo brand di event dan marketing materials",
                  "Booth/stand eksklusif di acara NawaSena",
                  "Mention di social media dan website",
                  "Paket produk khusus untuk pelanggan sponsor",
                  "Networking dengan komunitas kami",
                  "Harga khusus untuk pembelian dalam jumlah besar",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 text-gray-600 text-sm"
                  >
                    <span className="mt-0.5 shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full border border-red-500 text-red-500">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2: Program Pengadaan Tenant */}
            <div className="rounded-2xl p-8 bg-gradient-to-br from-[#F2FCF5] to-[#E3F8EB] border border-emerald-200 shadow-sm transition-transform transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6">
                <Award size={24} className="text-emerald-600" />
              </div>

              <h3 className="font-bold text-2xl mb-3 text-gray-900">
                Program Pengadaan Tenant
              </h3>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Perluas bisnis Anda melalui kerjasama tenant di lokasi strategis
                NawaSena
              </p>

              <div className="font-bold text-gray-900 mb-4">
                Benefit Program:
              </div>
              <ul className="space-y-3">
                {[
                  "Lokasi premium dengan traffic tinggi",
                  "Dukungan marketing dari NawaSena Cafe",
                  "Pelatihan barista profesional",
                  "Akses ke supplier terpercaya",
                  "Sistem POS dan digital terintegrasi",
                  "Konsultasi manajemen bisnis gratis",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 text-gray-600 text-sm"
                  >
                    <span className="mt-0.5 shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full border border-red-500 text-red-500">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Contact form */}
        <section className="bg-[#F5EDE3] py-12">
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
                    toast({
                      title: "Lengkapi field",
                      description: "Mohon lengkapi semua field yang wajib.",
                      variant: "destructive",
                    });
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
              <a href="tel:+6281390070770" className="text-[#D92A2A]">
                081390070770
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
