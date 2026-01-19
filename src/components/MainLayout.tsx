"use client";
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from "@/src/components/Sidebar"; 

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Definimos las rutas donde NO queremos ver la navegación
  const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/onboarding' || pathname === '/';

  if (isAuthPage) {
    return <div className="min-h-screen bg-black">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-black flex text-[#F9F6EE] group">
      <div 
        onMouseEnter={() => setIsSidebarOpen(true)} 
        onMouseLeave={() => setIsSidebarOpen(false)}
        className="z-50"
      >
        <Sidebar />
      </div>

      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'pl-64' : 'pl-20'}`}>
        <div className="max-w-7xl mx-auto p-8 md:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}