'use client'

import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Jam Operasional */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={24} />
              <h3 className="text-xl font-semibold">Jam Operasional</h3>
            </div>
            <p className="text-primary-foreground/90">
              <strong>Senin - Jumat:</strong><br />
              06:00 - 21:00
            </p>
            <p className="text-primary-foreground/90">
              <strong>Sabtu - Minggu:</strong><br />
              07:00 - 22:00
            </p>
          </div>

          {/* Kontak */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold mb-4">Kontak</h3>
            <div className="flex items-start gap-2">
              <MapPin size={20} className="flex-shrink-0 mt-1" />
              <p className="text-primary-foreground/90">
                Jl. Kopi No. 123<br />
                Kota
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={20} className="flex-shrink-0" />
              <a href="tel:+62212345678" className="text-primary-foreground/90 hover:text-primary-foreground">
                (021) 1234-5678
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={20} className="flex-shrink-0" />
              <a href="mailto:info@nawasena.com" className="text-primary-foreground/90 hover:text-primary-foreground">
                info@nawasena.com
              </a>
            </div>
          </div>

          {/* About */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold mb-4">NawaSena Cafe</h3>
            <p className="text-primary-foreground/90">
              Tempat terbaik untuk menikmati kopi premium dan berbagi momen berharga bersama orang-orang terkasih.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/80">
          <p>&copy; {new Date().getFullYear()} NawaSena Cafe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
