// app/layout.tsx
import { Geist_Mono } from "next/font/google"; 
import "./globals.css"; 
import MainLayout from "@/src/components/MainLayout"; 

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geistMono.variable} antialiased bg-black`}> 
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}