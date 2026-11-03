import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KRISHNA EXPORT. INDUSTRIES — Daily Wholesale Price Poster",
  description: "Official wholesale product collection and daily rates poster for Trupti Cotton Seed Refined Oil and Krishna Groundnut Oil.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+Devanagari:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className="antialiased min-h-screen text-slate-900 font-bahnschrift"
      >
        {children}
      </body>
    </html>
  );
}
