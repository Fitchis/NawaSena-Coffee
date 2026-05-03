'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle, Loader2 } from 'lucide-react'

interface OrderItem {
  id: string
  product_id: string
  quantity: number
  price: number
}

interface Order {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  delivery_address: string
  total_amount: number
  status: string
  created_at: string
  order_items: OrderItem[]
}

interface Props {
  params: {
    id: string
  }
}

export default function OrderConfirmationPage({ params }: Props) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // In a real app, you'd fetch the order from the API
    // For now, we'll just show a confirmation message
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="w-full max-w-2xl mx-auto px-4 py-12">
          <Card className="border-border bg-card">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle className="text-green-500" size={64} />
              </div>
              <CardTitle className="text-foreground text-3xl">Pesanan Berhasil Dibuat!</CardTitle>
              <CardDescription className="text-foreground/70 text-lg">
                Nomor pesanan: <span className="font-mono font-bold text-primary">{params.id}</span>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-6 space-y-3">
                <h3 className="font-semibold text-foreground mb-4">Informasi Pesanan</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-foreground/70">
                    <strong>Status:</strong> <span className="text-amber-600">Menunggu Konfirmasi</span>
                  </p>
                  <p className="text-foreground/70">
                    <strong>Perkiraan Waktu:</strong> 30-45 menit
                  </p>
                  <p className="text-foreground/70">
                    <strong>Metode Pengiriman:</strong> Delivery
                  </p>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Langkah Selanjutnya</h3>
                <ol className="space-y-3 text-sm text-foreground/70">
                  <li className="flex gap-3">
                    <span className="font-bold text-primary flex-shrink-0">1.</span>
                    <span>Kami akan segera mengonfirmasi pesanan Anda melalui email dan WhatsApp</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary flex-shrink-0">2.</span>
                    <span>Minuman akan disiapkan dan dikemas dengan hati-hati</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary flex-shrink-0">3.</span>
                    <span>Pesanan Anda akan diantar ke alamat yang Anda berikan</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary flex-shrink-0">4.</span>
                    <span>Setelah itu, nikmati kopi premium kami!</span>
                  </li>
                </ol>
              </div>

              <div className="bg-muted/50 rounded-lg p-6 space-y-3">
                <h3 className="font-semibold text-foreground">Hubungi Kami</h3>
                <p className="text-sm text-foreground/70">
                  Jika ada pertanyaan, hubungi kami di:
                </p>
                <div className="space-y-2 text-sm">
                  <a
                    href="https://wa.me/6212345678"
                    className="text-primary hover:text-primary/90 font-medium flex items-center gap-2"
                  >
                    💬 WhatsApp: (021) 1234-5678
                  </a>
                  <a
                    href="mailto:info@nawasena.com"
                    className="text-primary hover:text-primary/90 font-medium flex items-center gap-2"
                  >
                    📧 Email: info@nawasena.com
                  </a>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <Link href="/menu" className="w-full">
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  Lanjut Berbelanja
                </Button>
              </Link>
              <Link href="/" className="w-full">
                <Button variant="outline" className="w-full border-border">
                  Kembali ke Beranda
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  )
}
