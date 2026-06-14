import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quad — Turn your syllabus into a semester plan",
  description:
    "Quad turns any college syllabus into a calendar, grade breakdown, and class cheat sheet in seconds. Upload a PDF or photo — AI does the rest.",
  openGraph: {
    title: "Quad — Turn your syllabus into a semester plan",
    description:
      "Upload your syllabus. Quad extracts every deadline, exam, and grade weight and sends it straight to your calendar.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-campus-bg text-campus-text">
        {children}
      </body>
    </html>
  );
}
