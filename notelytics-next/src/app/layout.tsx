import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notelytics - AI Notebook",
  description: "Your AI Notebook for Smarter Studying",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
