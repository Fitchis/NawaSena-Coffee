import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { CartProvider } from "@/context/cart-context";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NawaSena Cafe - Premium Coffee Experience",
  description:
    "Nikmati racikan kopi premium dari biji pilihan di NawaSena Cafe. Pesan langsung dari meja Anda, tanpa antri.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="bg-background">
      <body className="font-sans antialiased text-foreground">
        <CartProvider>
          <ToastProvider>
            {children}
            <ToastViewport />
          </ToastProvider>
        </CartProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
