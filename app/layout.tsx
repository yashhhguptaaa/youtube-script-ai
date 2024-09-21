import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "sonner";

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
      <body className="flex flex-col min-h-screen">
        <Header />
        {children}
      </body>

      <Toaster duration={8000} position="bottom-left" />
    </html>
  );
}
