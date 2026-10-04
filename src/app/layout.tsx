import CartDrawer from "@/components/cart/CartDrawer";
import CartProvider from "@/components/cart/CartProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { store } from "@/lib/product";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: `${store.name} — Funny Old Man Face Mask`, template: `%s · ${store.name}` },
  description: "Funny face masks that fit under your motorcycle helmet. Free shipping.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-neutral-50 text-neutral-900">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
