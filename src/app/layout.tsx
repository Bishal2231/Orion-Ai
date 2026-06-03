import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Orion AI — The Next Frontier of Artificial Intelligence",
  description:
    "Orion is a state-of-the-art AI model built for reasoning, code generation, creative writing, and deep analysis. Experience the future of intelligence.",
  keywords: ["AI", "artificial intelligence", "Orion", "language model", "API", "chat"],
  openGraph: {
    title: "Orion AI — The Next Frontier of Artificial Intelligence",
    description: "Experience the future of intelligence with Orion AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ParticleBackground />
        <Navbar />
        <main style={{ paddingTop: "var(--nav-height)", position: "relative", zIndex: 1 }}>
          {children}
        </main>
      </body>
    </html>
  );
}
