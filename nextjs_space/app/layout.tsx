import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import WhatsAppWidget from "@/components/WhatsAppWidget";

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

const SITE_URL = "https://ssvnauka.com";
const SITE_NAME = "ssvnauka";
const SITE_TITLE = "ssvnauka — Scientific Media Platform v2.0";
const SITE_DESCRIPTION =
  "Мы превращаем PDF-архивы в медиа-реактор. Читай. Исследуй. Создавай будущее.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — ssvnauka",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "ssvnauka", "Сушков", "хирургия", "лапароскопия", "онкохирургия",
    "научные статьи", "медицина", "научная платформа",
  ],
  authors: [{ name: "Prof. Sergiy Sushkov" }],
  creator: "Prof. Sergiy Sushkov",
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  verification: {
    google: "google9c6940bc8c5a4df7",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ru_RU",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "ru",
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#author`,
      name: "Сергей Сушков",
      alternateName: "Prof. Sergiy Sushkov",
      jobTitle: "Хирург, доктор медицинских наук",
      url: SITE_URL,
      sameAs: [
        "https://www.youtube.com/@SSVproff-22.06",
        "https://orcid.org/0000-0002-6951-9789",
      ],
    },
    {
      "@type": "MedicalOrganization",
      "@id": `${SITE_URL}/#medicalorg`,
      name: "Медицинский Центр МАРИЯ",
      url: SITE_URL,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "WhatsApp Community",
          url: "https://chat.whatsapp.com/BP1uBjDZEE70SlyKBmpZiZ",
          availableLanguage: ["Russian", "Ukrainian"],
        },
        {
          "@type": "ContactPoint",
          telephone: "+380-67-570-79-49",
          contactType: "Запись на консультацию",
        },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Сирохинская, 7-Б",
        addressLocality: "Харьков",
        addressCountry: "UA",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${manrope.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          {children}
        </Providers>
        <WhatsAppWidget />
      </body>
    </html>
  );
}
