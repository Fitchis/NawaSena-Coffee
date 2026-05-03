"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/cart-context";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart();
  const pathname = usePathname() || "/";

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/menu", label: "Menu" },
    { href: "/about", label: "Tentang" },
    { href: "/collaboration", label: "Kolaborasi" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b border-border">
      <div className="w-full max-w-6xl mx-auto px-4 h-16 grid grid-cols-2 md:grid-cols-3 items-center">
        {/* Logo (left) */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/img/background/logo.png"
              alt="NawaSena"
              className="w-10 h-10 object-contain bg-[#D92A2A] rounded-2xl p-1"
            />
            <div className="hidden sm:block">
              <div className="text-sm font-semibold text-foreground">
                NawaSena
              </div>
              <div className="text-xs text-foreground/60">COFFEE HOUSE</div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation (center) */}
        <nav className="hidden md:flex items-center justify-center gap-8">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-foreground hover:text-primary transition-colors font-medium ${
                  isActive
                    ? "text-white font-semibold bg-[#D92B2B] p-2 rounded-sm"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Section (desktop + mobile) */}
        <div className="flex items-center justify-end">
          {/* Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/menu?checkout=1"
              className={items.length > 0 ? "relative" : ""}
            >
              <Button variant="outline" className="border-border relative">
                <ShoppingCart size={18} />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {items.length}
                  </span>
                )}
              </Button>
            </Link>

            <Link href="/menu">
              <Button className="bg-[#FF4545] hover:opacity-95 text-white rounded-full px-4 py-2">
                Order Sekarang
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
              aria-label="toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="flex flex-col gap-2 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href))
                    ? "bg-muted text-primary font-semibold"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {items.length > 0 && (
              <Link href="/menu?checkout=1" onClick={() => setIsOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-border mt-2 relative"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Keranjang ({items.length})
                </Button>
              </Link>
            )}

            <Link href="/menu" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-2">
                Order Sekarang
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
