"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/src/lib/supabase';
import Link from 'next/link';
import Typewriter from '@/src/components/Typewriter';
import { 
  CalendarIcon, 
  BeakerIcon, 
  PlusIcon, 
  UserGroupIcon, 
  TicketIcon,
  BuildingOfficeIcon,
  BellIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import StatusPopup from '@/src/components/StatusPop';
import ErrorModal from '@/src/components/ErrorModal';

export default function CalendarPage() {
  return (
    <main className="min-h-screen bg-black text-[#F9F6EE] flex flex-col md:flex-row relative">
      <div className="flex-1 p-8 md:p-16 max-w-7xl mx-auto w-full">
        
        <header className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16 relative">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-500 italic">Temporada 2026</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter uppercase leading-none">
              Tu <span className="text-red-600">Agenda</span>
            </h1>
            <Typewriter text="Organiza tus ensayos y fechas importantes." speed={40} className="text-zinc-500 text-xs font-mono mt-2" />
            
            <div className="flex flex-wrap gap-3">
              <Link href="/calendar/nuevo_proyecto" className="bg-[#F9F6EE] text-black px-5 py-3 rounded-full hover:bg-red-600 hover:text-white transition-all flex items-center gap-2 group shadow-xl">
                <PlusIcon className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Nuevo Evento</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Aquí iría el resto del contenido del calendario... */}

      </div>
    </main>
  );
}