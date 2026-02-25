"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const miembrosCompania = [
  { id: 1, inicial: "O", nombre: "Oso", rol: "Director", estado: "Activo" },
  { id: 2, inicial: "V", nombre: "Valko", rol: "Productor", estado: "Activo" },
  { id: 3, inicial: "A", nombre: "Ana", rol: "Actriz Principal", estado: "Activo" },
  { id: 4, inicial: "C", nombre: "Carlos", rol: "Guionista", estado: "Pendiente" },
];

const proyectosCompania = [
  { id: 1, titulo: "Hamlet: El Retorno", estado: "Ensayo", actores: 12 },
  { id: 2, titulo: "Bodas de Sangre", estado: "Lectura", actores: 8 },
];

export default function TuCompaniaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-[#F9F6EE] p-8 md:p-12 font-mono">
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-zinc-900 pb-8 gap-6">
        <div className="flex items-center gap-6">
          {/* ESPACIO PARA IMAGEN DE PERFIL DE LA COMPAÑÍA */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-zinc-900 border-2 border-red-600 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(220,38,38,0.2)]">
            <span className="text-3xl font-black text-zinc-700">LOGO</span>
          </div>
          <div>
            <p className="text-zinc-500 text-xs tracking-[0.2em] mb-2 uppercase">• Perfil de Compañía</p>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              <span className="text-red-600">TU</span> COMPAÑÍA
            </h1>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button onClick={() => setIsModalOpen(true)} className="px-6 py-2 rounded-xl border border-zinc-800 hover:border-zinc-400 hover:bg-zinc-900 transition-all text-sm uppercase tracking-wider">
            Personalizar
          </button>
          <Link href="/companias/invitar" className="px-6 py-2 rounded-xl bg-red-600 text-[#F9F6EE] hover:bg-red-700 transition-all text-sm uppercase tracking-wider font-bold shadow-[0_0_15px_rgba(220,38,38,0.3)] flex items-center justify-center">
            + Invitar
          </Link>
        </div>
      </header>

      {/* SECCIÓN DE PROYECTOS DE LA COMPAÑÍA */}
      <section className="mb-16">
        <h2 className="text-xl mb-6 text-zinc-400 tracking-widest uppercase text-sm border-l-2 border-red-600 pl-3">
          Proyectos Actuales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {proyectosCompania.map((proyecto) => (
            <div key={proyecto.id} className="p-6 rounded-2xl bg-[#080808] border border-zinc-800 hover:border-red-900/50 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] bg-red-900/20 text-red-500 px-2 py-1 rounded uppercase tracking-tighter font-bold border border-red-900/30">
                  {proyecto.estado}
                </span>
                <span className="text-zinc-600 text-[10px] uppercase">{proyecto.actores} Actores</span>
              </div>
              <h3 className="text-2xl font-black uppercase italic group-hover:text-red-500 transition-colors">{proyecto.titulo}</h3>
              <button className="mt-4 text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors underline decoration-red-600 underline-offset-4">Ver libreto</button>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN DE ELENCO */}
      <section>
        <h2 className="text-xl mb-6 text-zinc-400 tracking-widest uppercase text-sm border-l-2 border-red-600 pl-3">
          Elenco y Equipo
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {miembrosCompania.map((miembro, index) => (
            <motion.div key={miembro.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="p-6 rounded-2xl bg-[#050505] border border-zinc-800 hover:border-zinc-500 transition-colors group relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-red-600 transition-colors">
                  <span className="text-xl font-bold text-[#F9F6EE]">{miembro.inicial}</span>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-md tracking-wider uppercase ${miembro.estado === 'Activo' ? 'bg-zinc-900 text-zinc-300' : 'bg-red-900/30 text-red-500'}`}>
                  {miembro.estado}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-1">{miembro.nombre}</h3>
              <p className="text-sm text-zinc-500">{miembro.rol}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-[#0a0a0a] border border-zinc-800 p-8 rounded-3xl w-full max-w-md relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-zinc-500 hover:text-white">✕</button>
              <h2 className="text-2xl font-bold mb-6 text-white uppercase tracking-wider">Ajustes de Compañía</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-zinc-500 mb-2 uppercase tracking-widest font-bold">Imagen de Perfil</label>
                  <div className="w-full border-2 border-dashed border-zinc-800 rounded-xl p-4 flex flex-col items-center gap-2 hover:border-red-600 transition-colors cursor-pointer">
                    <span className="text-[10px] text-zinc-500 uppercase">Click para subir imagen</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-2 uppercase tracking-widest font-bold">Nombre</label>
                  <input type="text" defaultValue="La Gran Obra" className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-[#F9F6EE] focus:border-red-600 outline-none transition-colors" />
                </div>
                <button className="w-full mt-4 bg-white text-black font-bold py-3 rounded-xl hover:bg-red-600 hover:text-white transition-all uppercase tracking-widest text-sm">
                  Guardar Cambios
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}