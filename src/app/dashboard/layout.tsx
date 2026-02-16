import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/admin/providers/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "A modern, reusable admin panel built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <div className={inter.variable}>{children}</div>
    </ThemeProvider>
  );
}
