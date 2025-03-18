import type { Metadata, Viewport } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";
import Footer from "./_components/footer";
import React from "react";
import ReactQueryProvider from "@/utils/providers/ReactQueryProvider";
import { NuqsAdapter } from "nuqs/adapters/next";
import { Toaster } from "react-hot-toast";

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
    <html lang="pt-BR">
      <ReactQueryProvider>
        <body
          className={`${rajdhani.className} flex min-h-screen w-screen flex-col overflow-x-hidden text-white antialiased`}
        >
          <NuqsAdapter>
            <Toaster />
            <main className="flex flex-grow flex-col items-center">
              {children}
            </main>
          </NuqsAdapter>
          <Footer />
        </body>
      </ReactQueryProvider>
    </html>
  );
}
