import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  title: "Dix Health",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={` ${urbanist.variable} antialiased`}>{children}</body>
    </html>
  );
}
