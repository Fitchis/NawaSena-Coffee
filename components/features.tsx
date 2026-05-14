"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Leaf, Smartphone, Wifi, MapPin } from "lucide-react";

const features = [
  {
    id: "1",
    title: "Biji Pilihan",
    description: "100% biji kopi arabika pilihan dari petani lokal terbaik",
    icon: Leaf,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: "2",
    title: "Pesan Digital",
    description: "Sistem QR menu & web ordering untuk kemudahan pelanggan",
    icon: Smartphone,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    id: "3",
    title: "WiFi Gratis",
    description: "Internet cepat untuk kerja atau bersantai tanpa batas",
    icon: Wifi,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    id: "4",
    title: "Lokasi Strategis",
    description: "Mudah dijangkau dengan parkir luas dan nyaman",
    icon: MapPin,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

export function Features() {
  return (
    <section id="tentang" className="py-16 bg-background">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm text-red-500 font-semibold">KENAPA NAWASENA</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Fasilitas & Keunggulan
          </h2>
          <p className="text-lg text-foreground/70">
            Mengapa memilih NawaSena Cafe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.id}
                className="border-border bg-card hover:shadow-lg transition-shadow text-center"
              >
                <CardHeader className="pb-3">
                  <div
                    className={`w-16 h-16 rounded-lg ${feature.bgColor} flex items-center justify-center mx-auto mb-3`}
                  >
                    <Icon className={`${feature.color}`} size={32} />
                  </div>
                  <CardTitle className="text-foreground">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-foreground/60">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
