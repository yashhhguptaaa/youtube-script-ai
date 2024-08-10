import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Youtube Script Writer AI",
  description: "Generate Youtube scripts with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Header */}
      <Header />
      <body>{children}</body>

      {/* Toaster   */}
    </html>
  );
}
