import type { Metadata, Viewport } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";
import Footer from "./_components/footer";
import React from "react";
import ReactQueryProvider from "@/utils/providers/ReactQueryProvider";
import { ClerkProvider } from "@clerk/nextjs";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
export const metadata: Metadata = {
  title: "Zaap Eventos",
  description: "Uma empresa que garante qualidade para seu evento",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-BR">
        <ReactQueryProvider>
          <body className={`${rajdhani.className} text-white antialiased`}>
            {children}
            <Footer />
          </body>
        </ReactQueryProvider>
      </html>
    </ClerkProvider>
  );
}
