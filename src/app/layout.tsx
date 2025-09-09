import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const siteUrl = "https://romeroarchitects.com"; // Update with your actual domain when available
const siteName = "Romero Architects";
const siteDescription = "We design spaces with purpose, elegance, and identity for homes and commercial spaces. Architectural Designer, Engineering Service, and Interior Design Studio based in Aruba.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "architecture",
    "architects",
    "Aruba architecture",
    "architectural designer",
    "engineering service",
    "interior design studio",
    "residential design",
    "commercial architecture",
    "home design Aruba",
    "commercial spaces",
    "modern architecture",
    "contemporary design",
    "architectural firm Aruba",
    "building design",
    "custom homes",
    "office buildings",
    "interior design Aruba",
    "architectural services Caribbean",
    "Oranjestad architects",
    "sustainable architecture",
  ],
  authors: [{ name: "Romero Architects" }],
  creator: "Romero Architects",
  publisher: "Romero Architects",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: "/og-image.jpg", // You'll need to create this image
        width: 1200,
        height: 630,
        alt: "Romero Architects - Modern Architecture Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@romeroarchitects", // Update with your actual Twitter handle if you have one
    creator: "@romeroarchitects",
    title: siteName,
    description: siteDescription,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Architecture",
};



// Structured data for the organization
const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": ["ArchitecturalService", "ProfessionalService", "LocalBusiness"],
  name: siteName,
  alternateName: "Romero Architects Aruba",
  description: siteDescription,
  url: siteUrl,
  logo: `${siteUrl}/white/4.png`,
  image: `${siteUrl}/og-image.jpg`,
  telephone: "+297 560 5563",
  email: "Info@romeroarchitects.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Morgenster 7",
    addressLocality: "Oranjestad",
    addressRegion: "Aruba",
    addressCountry: "AW",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "12.5211", // Oranjestad coordinates
    longitude: "-70.0362"
  },
  areaServed: [
    {
      "@type": "Place",
      name: "Aruba",
    },
    {
      "@type": "Place", 
      name: "Caribbean",
    }
  ],
  serviceType: [
    "Architectural Designer",
    "Engineering Service",
    "Interior Design Studio",
    "Residential Architecture",
    "Commercial Architecture",
    "Home Design",
    "Building Design",
    "Space Planning",
  ],
  priceRange: "$$",
  openingHours: "Mo-Fr 09:00-17:00", // Update with actual hours
  sameAs: [
    "https://www.facebook.com/profile.php?id=61577381315326",
    "https://www.instagram.com/romeroarchitects",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#171718" />
        <meta name="msapplication-TileColor" content="#171718" />
        
        {/* Favicons and app icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-romero-gray-dark`}
        itemScope
        itemType="https://schema.org/WebPage"
      >
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black px-4 py-2 rounded z-50"
        >
          Skip to main content
        </a>
        
        {/* Main content wrapper */}
        <main id="main-content" role="main">
          {children}
        </main>
        
        {/* Google Analytics - Replace with your tracking ID */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_TRACKING_ID'); // Replace with your actual tracking ID
          `}
        </Script>
      </body>
    </html>
  );
}
