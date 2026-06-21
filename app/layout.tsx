import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif, VT323 } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
})

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: ["400"],
})

const mcfont = localFont({
  src: "../public/fonts/Monocraft.ttf",
  variable: "--font-mc",
  weight: "400"
})

export const metadata: Metadata = {
  title: "Sunset Banking",
  description: "Sunset is a modern banking platform.",
  icons: {
    icon: "/icons/SunsetLogo.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexSerif.variable} ${vt323.variable} ${mcfont.variable}`}>
      <body>{children}</body> 
    </html>
  );
}
