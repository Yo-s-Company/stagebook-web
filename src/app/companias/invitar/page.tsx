"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function InvitacionPage() {
  return (
    <div className="min-h-screen bg-black text-[#F9F6EE] p-8 md:p-12 font-mono flex flex-col items-center pt-20">
      <div className="w-full max-w-xl">
        <Link 
          href="/companias/nueva" 
          className="text-zinc-500 hover:text-red-500 transition-colors mb-8 inline-flex items-center gap-2 text-sm uppercase tracking-widest"
        >
          <span>←</span> Volver a la compañía
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#050505] border border-zinc-800 p-8 md:p-10 rounded-3xl"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-black uppercase tracking-tight mb-2">
              Invitar <span className="text-red-600">Talento</span>
            </h1>
            <p className="text-zinc-500 text-sm">
              Envía una invitación para unirse a tu espacio de trabajo.
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs text-zinc-500 mb-2 uppercase tracking-widest">
                Correo Electrónico
              </label>
              <input 
                type="email" 
                placeholder="actor@stagebook.com"
                className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-[#F9F6EE] focus:outline-none focus:border-red-600 transition-colors placeholder:text-zinc-700"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-500 mb-2 uppercase tracking-widest">
                Rol en la Compañía
              </label>
              <select className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-[#F9F6EE] focus:outline-none focus:border-red-600 transition-colors appearance-none cursor-pointer">
                <option value="actor">Actor / Actriz</option>
                <option value="director">Director(a)</option>
                <option value="dramaturgo">Dramaturgo(a)</option>
                <option value="productor">Productor(a)</option>
                <option value="staff">Staff Técnico</option>
              </select>
            </div>

            <button 
              type="submit"
              className="w-full mt-4 bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition-colors uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(220,38,38,0.2)]"
            >
              Enviar Invitación
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}