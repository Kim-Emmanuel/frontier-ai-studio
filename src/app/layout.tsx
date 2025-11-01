import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
// Client components used in the layout
import NavBar from "../components/NavBar";
import { ThemeProvider } from "../context/ThemeContext";

// Configure Inter font
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

// Configure JetBrains Mono font
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: true,
  fallback: ["Consolas", "Monaco", "Courier New", "monospace"],
});

// ✅ Move themeColor and viewport into their own export
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0ea072" },
    { media: "(prefers-color-scheme: dark)", color: "#0ea072" },
  ],
};

// ✅ Keep metadata clean — remove themeColor and viewport from here
export const metadata: Metadata = {
  title: {
    default: "Frontier AI Studio | Tech Portfolio",
    template: "%s | Frontier AI Studio",
  },
  description:
    "Modern tech portfolio showcasing AI and development expertise with cutting-edge 3D experiences. Built with Next.js, Three.js, and React Three Fiber.",
  keywords: [
    "AI",
    "Machine Learning",
    "Web Development",
    "3D Design",
    "Portfolio",
    "Three.js",
    "React Three Fiber",
    "Next.js",
    "TypeScript",
    "Frontend Development",
    "Full Stack",
  ],
  authors: [{ name: "Frontier AI Studio" }],
  creator: "Frontier AI Studio",
  publisher: "Frontier AI Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
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
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon-16x16.png",
    apple: [
      { url: "/apple-touch-icon.png" },
      {
        url: "/apple-touch-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Frontier AI Studio",
    title: "Frontier AI Studio | Tech Portfolio",
    description:
      "Modern tech portfolio showcasing AI and development expertise with cutting-edge 3D experiences.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Frontier AI Studio - Tech Portfolio with 3D Experiences",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@frontierAIstudio",
    creator: "@frontierAIstudio",
    title: "Frontier AI Studio | Tech Portfolio",
    description:
      "Modern tech portfolio showcasing AI and development expertise with cutting-edge 3D experiences.",
    images: ["/og-image.png"],
  },
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          {/* Animated background positioned behind content */}
          <div className="animated-background pointer-events-none" aria-hidden="true">
            <div className="gradient-orb gradient-orb-1" />
            <div className="gradient-orb gradient-orb-2" />

            <div className="floating-particles" aria-hidden="true">
              <div className="floating-particle particle-1" />
              <div className="floating-particle particle-2" />
              <div className="floating-particle particle-3" />
              <div className="floating-particle particle-4" />
              <div className="floating-particle particle-5" />
              <div className="floating-particle particle-6" />
            </div>
          </div>

          <NavBar />
          <main className="relative z-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
