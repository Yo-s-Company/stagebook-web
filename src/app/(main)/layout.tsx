import Link from "next/link";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Navbar Superior o Inferior */}
      <nav className="fixed bottom-0 w-full bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 p-4 flex justify-around items-center z-50 md:top-0 md:bottom-auto md:border-b md:border-t-0">
        <Link href="/dashboard" className="text-sm font-medium hover:text-red-600 transition-colors">Inicio</Link>
        <Link href="/projects" className="text-sm font-medium hover:text-red-600 transition-colors">Obras</Link>
        <Link href="/calendar" className="text-sm font-medium hover:text-red-600 transition-colors">Agenda</Link>
        <Link href="/settings" className="text-sm font-medium hover:text-red-600 transition-colors">Config</Link>
      </nav>

      {/* Espaciado para que el contenido no quede debajo del Nav */}
      <main className="pb-24 pt-6 md:pt-24 px-4 max-w-5xl mx-auto">
        {children}
      </main>
    </div>
  );
}