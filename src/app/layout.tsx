import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: brand.name,
  description: `${brand.name} Home`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
