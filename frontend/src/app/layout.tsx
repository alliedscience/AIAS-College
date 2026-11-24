import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#102D4F",
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    template: "%s | AIAS Education Portal",
    default: "AIAS Education Portal | Centralized Higher Education in Asansol",
  },
  description:
    "Official centralized education portal for Asansol Institute of Allied Sciences (AIAS), Bijoy Pal Memorial B.Ed College, Pramoth Nath Das Academy of Nursing, and P.N. Das Academy (D.El.Ed). Admissions open for 2026-2027.",
  keywords: [
    "Asansol Institute of Allied Sciences",
    "AIAS",
    "Bijoy Pal Memorial B.Ed College",
    "Pramoth Nath Das Academy of Nursing",
    "P.N. Das Academy D.El.Ed",
    "DMLT Asansol",
    "Diploma in Agriculture Asansol",
    "Veterinary Assistant Asansol",
    "B.Ed College Asansol",
    "GNM Nursing Asansol",
    "B.Sc Nursing Asansol",
    "Diamond Harbour Women's University",
    "MCCIS",
    "WBSCC Student Credit Card",
  ],
  authors: [{ name: "AIAS Educational Group" }],
  icons: {
    icon: "/AIAS LOGO PNG.png",
    apple: "/AIAS LOGO PNG.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://aias.edu.in",
    siteName: "AIAS Education Portal",
    title: "AIAS Education Portal | Premier Higher Education in Asansol",
    description:
      "Allied Sciences, Paramedical, Nursing, and Teacher Education in Asansol, West Bengal. 100% Placement Assistance, WBSCC & Scholarships.",
    images: [
      {
        url: "/images/campus-hero.svg",
        width: 1200,
        height: 630,
        alt: "Asansol Institute of Allied Sciences Campus",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-ivory text-navy font-sans antialiased flex flex-col">
        {children}
      </body>
    </html>
  );
}
