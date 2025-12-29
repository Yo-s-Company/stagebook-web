//Este layout es el primer archivo que se renderiza y envuelve a todas las paginas
import { Geist_Mono } from "next/font/google"; 
import "./globals.css"; //Le da estilos a todo el proyecto

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      {/* antialiased es una utilidad de Tailwind que hace que las fuentes se vean muchas mas suaves y finas en pantallas de altaresulcion*/}
      <body className={`${geistMono.variable} antialiased`}> 
        {children}
      </body>
    </html>
  );
}