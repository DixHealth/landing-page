import type { Metadata } from "next";
import "./globals.css";
import { Urbanist } from "next/font/google";
import { ThemeProvider } from "./provider";
import { Toaster } from "@/components/ui/toaster";

const urbanist = Urbanist({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  title: "Dix Health",
  description:
    "Especialista em Cloud, BI, integração de sistemas e desenvolvimento",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={` ${urbanist.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
