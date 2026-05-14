"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#D92A2A] text-white py-12">
        <div className="w-full max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 items-start">
            {/* Left: Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/img/background/logo.png"
                  alt="NawaSena"
                  className="w-10 h-10 rounded-md"
                />
                <h3 className="text-xl font-semibold">NawaSena</h3>
              </div>
              <p className="text-white/80 max-w-sm">
                Kopi berkualitas premium dengan suasana nyaman. Pesan langsung
                dari meja Anda melalui website kami.
              </p>
            </div>

            {/* Center: Hours */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-2">
                <Clock size={20} className="text-white/90" />
                <h4 className="text-lg font-semibold">Jam Operasional</h4>
              </div>
              <p className="text-white/80">Senin - Minggu : 16.00 - 00.00</p>
            </div>

            {/* Right: Contact */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold">Kontak</h4>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 text-white/80" />
                <button
                  onClick={() => setMapOpen(true)}
                  className="text-white/80 hover:underline text-left"
                >
                  Jl. Sukodami II No.0, Mojo, Kec. Mulyorejo, Surabaya, Jawa
                  Timur 60285
                </button>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-white/80" />
                <a
                  href="tel:+6281390070770"
                  className="text-white/80 hover:underline"
                >
                  081390070770
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-white/80" />
                <a
                  href="mailto:info@nawasena.com"
                  className="text-white/80 hover:underline"
                >
                  info@nawasena.com
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 text-center text-white/60">
            <p>
              &copy; {new Date().getFullYear()} NawaSena Cafe. Semua hak cipta
              dilindungi.
            </p>
          </div>
        </div>
      </footer>
      {mapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMapOpen(false)}
          />

          <div className="relative w-full max-w-4xl h-[80vh] bg-white rounded-md overflow-hidden shadow-lg">
            <div className="flex items-center justify-end p-2 bg-white">
              <button
                onClick={() => setMapOpen(false)}
                className="text-gray-700 px-3 py-1 rounded hover:bg-gray-100"
              >
                Tutup
              </button>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d63319.94921506666!2d112.6962299!3d-7.297942!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb00578ee1d9%3A0x60bd89342c91a78c!2sKedai%20nawasena!5e0!3m2!1sen!2sid!4v1778784945055!5m2!1sen!2sid"
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      )}
    </>
  );
}
