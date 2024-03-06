import type { Metadata } from "next";
import { ABeeZee } from "next/font/google";
import "./globals.css";

const inter = ABeeZee({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Tic Tac Toe",
  description: "Play tic tac toe online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
