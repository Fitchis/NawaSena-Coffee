'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Zap, Gift, Tag } from 'lucide-react'

const promos = [
  {
    id: '1',
    title: 'Happy Hour',
    description: 'Diskon 20% untuk semua minuman setiap Senin-Rabu pukul 14:00-17:00',
    discount: '20%',
    icon: Zap,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    id: '2',
    title: 'Member Reward',
    description: 'Daftar WhatsApp membership dan dapatkan 1 minuman gratis di kunjungan ke-5',
    discount: 'Gratis',
    icon: Gift,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    id: '3',
    title: 'Paket Hemat',
    description: 'Beli 2 minuman sekaligus dan hemat hingga Rp 10.000 untuk setiap pesanan',
    discount: 'Hemat',
    icon: Tag,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
]

export function Promos() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Promo & Penawaran</h2>
          <p className="text-lg text-foreground/70">Dapatkan penawaran terbaik dari kami</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promos.map((promo) => {
            const Icon = promo.icon
            return (
              <Card key={promo.id} className="border-border bg-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${promo.bgColor} flex items-center justify-center mb-3`}>
                    <Icon className={`${promo.color}`} size={24} />
                  </div>
                  <CardTitle className="text-foreground">{promo.title}</CardTitle>
                  <CardDescription className="text-foreground/60">{promo.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-primary text-primary-foreground">
                    {promo.discount}
                  </Badge>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
