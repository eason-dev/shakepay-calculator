import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shakepay ShakingSats Calculator - Calculate Your Bitcoin Earnings",
  description: "Calculate your potential Bitcoin earnings from Shakepay's ShakingSats rewards program. Track your sats accumulation over time with our interactive calculator and charts.",
  keywords: [
    "Shakepay",
    "ShakingSats",
    "Bitcoin calculator",
    "BTC earnings",
    "satoshis",
    "crypto rewards",
    "Bitcoin rewards calculator",
    "Shakepay calculator"
  ],
  authors: [{ name: "Eason Chang" }],
  creator: "Eason Chang",
  publisher: "Eason Chang",
  metadataBase: new URL('https://shakepay-calculator.vercel.app'), // TODO: Update with your actual domain
  openGraph: {
    title: "Shakepay ShakingSats Calculator",
    description: "Calculate your potential Bitcoin earnings from Shakepay's ShakingSats rewards. See how your sats add up over time!",
    url: 'https://shakepay-calculator.vercel.app', // TODO: Update with your actual domain
    siteName: "Shakepay ShakingSats Calculator",
    images: [
      {
        url: '/og-image.png', // TODO: Create an OG image at public/og-image.png (1200x630px)
        width: 1200,
        height: 630,
        alt: 'Shakepay ShakingSats Calculator Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Shakepay ShakingSats Calculator",
    description: "Calculate your potential Bitcoin earnings from Shakepay's ShakingSats rewards!",
    images: ['/og-image.png'], // TODO: Create an OG image
    creator: '@easondev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
