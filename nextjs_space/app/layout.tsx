
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains",
  display: 'swap',
});

const manrope = Manrope({ 
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "ssvnauka — Scientific Media Platform v2.0",
  description: "Мы превращаем PDF-архивы в медиа-реактор. Читай. Исследуй. Создавай будущее.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "ssvnauka — Scientific Media Platform v2.0",
    description: "Мы превращаем PDF-архивы в медиа-реактор. Читай. Исследуй. Создавай будущее.",
    images: ["/og-image.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${manrope.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
