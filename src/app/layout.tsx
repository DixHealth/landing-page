import type { Metadata } from "next";
import "./globals.css";
import { Figtree, Lato } from "next/font/google";
import { ThemeProvider } from "./provider";
import { Toaster } from "@/components/ui/toaster";
import { CookieConsent } from "@/components/CookieConsent";

// Omni: família única Lato. O Google Fonts só tem 100/300/400/700/900;
// os pesos 500/600 do sistema são aproximados pelo navegador.
const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
});

// Títulos na identidade dos vídeos (tema "Vídeos" e seção OMNIX).
const figtree = Figtree({
  weight: ["300", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  title: "DIX Health",
  description:
    "Software house, cloud e produtos próprios para quem faz a saúde funcionar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${lato.variable} ${figtree.variable}`}>
        {/* Produção: identidade OMNIX (tema "video") fixa. */}
        <ThemeProvider
          attribute="class"
          defaultTheme="video"
          forcedTheme="video"
          themes={["light", "dark", "video"]}
          enableSystem={false}
          disableTransitionOnChange
        >
          <CookieConsent />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
