"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Typewriter from "@/src/components/Typewriter";
import ScrollingTypewriter from "@/src/components/ScrollingTypewriter";

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-[#F9F6EE] selection:bg-red-600 selection:text-white transition-colors overflow-hidden">
      
      {/* NAVEGACIÓN SUPERIOR */}
      <nav className="w-full p-8 flex justify-between items-center z-50">
        {/* LOGO Y FIRMA */}
        <div className="flex items-center gap-4 group">
          <div className="relative w-10 h-10 transition-transform group-hover:rotate-12">
            <Image
              src="/logo.png"
              alt="StageBook Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">
              Desarrollado por
            </span>
            <span className="text-[11px] text-purple-500 font-black uppercase tracking-widest">
              Yo´s Company
            </span>
          </div>
        </div>

        {/* ACCIONES DE USUARIO */}
        <div className="flex items-center gap-6">
          <Link 
            href="/login" 
            className="text-[10px] font-mono font-bold uppercase tracking-widest hover:text-red-600 transition-colors"
          >
            Entrar
          </Link>
          <Link 
            href="/register" 
            className="text-[10px] font-mono bg-[#F9F6EE] text-black px-8 py-3 rounded-full font-black uppercase tracking-tighter hover:bg-red-600 hover:text-white transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            Registro
          </Link>
        </div>
      </nav>

      {/* TÍTULO HERO CENTRAL */}
      <section className="flex-1 flex flex-col items-center justify-center -mt-20 relative">
        <div className="absolute w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        
        <h1 className="text-7xl md:text-[10rem] font-black tracking-[ -0.05em] leading-none mb-4">
          STAGE<span className="text-red-600 italic">BOOK</span>
        </h1>
        
        <div className="h-6">
          <Typewriter 
            text="ARTISTIC PLANNER & PORTFOLIO" 
            speed={80} 
            className="text-zinc-500 text-[10px] md:text-xs font-mono uppercase tracking-[0.5em]"
          />
        </div>
      </section>

      {/* FOOTER / CONTENIDO INFERIOR */}
      <main className="pb-20 px-10 md:px-24 grid grid-cols-1 md:grid-cols-2 items-end gap-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
              Control total en el <br />
              <span className="text-red-600 italic">escenario</span>
            </h2>
            <div className="h-1.5 w-40 bg-purple-600 rounded-full shadow-[0_0_15px_rgba(147,51,234,0.5)]" />
          </div>
                  
          <div className="max-w-md space-y-1">
            <div className="text-zinc-300 font-mono text-sm leading-relaxed">
              <ScrollingTypewriter />
            </div>
            <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-tight italic">
              Evoluciona tus proyectos a la era digital del teatro.
            </p>
          </div>

          <Link 
            href="/dashboard" 
            className="inline-block px-10 py-5 bg-red-600 text-white rounded-xl font-black uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-[0_10px_30px_rgba(220,38,38,0.3)] hover:-translate-y-1 active:translate-y-0"
          >
            ¡EXPLÓRALA!
          </Link>
        </div>

        {/* ELEMENTO DECORATIVO DERECHO */}
        <div className="hidden md:flex justify-end italic font-mono text-[8px] text-zinc-800 uppercase tracking-[1em] vertical-text">
          StageBook // 2026 // Season Premiere
        </div>
      </main>
    </div>
  );
}