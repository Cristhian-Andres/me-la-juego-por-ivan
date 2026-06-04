import type { Metadata, Viewport } from "next";
import { fredokaOne } from "@/lib/fonts";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

// Reemplaza con tu Measurement ID de Google Analytics (G-XXXXXXXXXX)
const GA_ID = "G-XH4X7Y0PQ0";

export const metadata: Metadata = {
  title: "Me la juego por Iván y Aida",
  description: "Crea tu imagen personalizada y demuestra que te la juegas por la vida con Iván y Aida",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className={`${fredokaOne.className} min-h-full flex flex-col bg-white`}>
        {children}
      </body>
      <GoogleAnalytics gaId={GA_ID} />
    </html>
  );
}
