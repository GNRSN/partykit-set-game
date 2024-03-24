import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "./components/Footer";
import Header from "./components/Header";
import { Providers } from "./components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Match game",
  description:
    "Pattern matching game, realtime implementation using PartyKit with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div
            className="relative flex flex-col justify-between"
            style={{ minHeight: "100dvh" }}
          >
            <Header />
            <div className="flex-grow p-4 sm:p-6">
              <div className="m-auto flex w-full max-w-7xl flex-col items-start justify-start">
                {children}
              </div>
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
