'use client';

import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Navbar from '../components/Navbar';
import "./globals.css";

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist'
});

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={geist.variable}>
      <body className="bg-gray-900 text-white min-h-screen">
        <SessionProvider>
          <Navbar />
          <main className="container mx-auto pt-16 px-4">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
