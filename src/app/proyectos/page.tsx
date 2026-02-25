"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/src/lib/supabase";
import { 
  FolderIcon, 
  PlusIcon, 
  CalendarIcon, 
  UserGroupIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

interface Proyecto {
  id: string;
  title: string;
  description: string;
  theme_color: string;
  created_at: string;
  project_characters?: { id: string }[];
}

export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProyectos = async () => {
      // Traemos los proyectos y contamos sus personajes para el desglose
      const { data, error } = await supabase
        .from("projects")
        .select("*, project_characters(id)")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setProyectos(data);
      }
      setLoading(false);
    };

    fetchProyectos();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-mono italic animate-pulse">
      Cargando Cartelera...
    </div>
  );

  return (
    <main className="min-h-screen bg-black text-[#F9F6EE] p-8 md:p-16">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* HEADER ESTILO STAGEBOOK */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-zinc-900 pb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FolderIcon className="w-5 h-5 text-red-600" />
              <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-500 italic">Archivo General</span>
            </div>
            <h1 className="text-5xl font-bold uppercase tracking-tighter italic">
              Tus <span className="text-red-600">Producciones</span>
            </h1>
          </div>

          <Link 
            href="/proyectos/nuevo" 
            className="bg-[#F9F6EE] text-black px-6 py-3 rounded-full hover:bg-red-600 hover:text-white transition-all flex items-center gap-2 group shadow-xl"
          >
            <PlusIcon className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-inherit">Nuevo Proyecto</span>
          </Link>
        </header>

        {/* LISTADO DE PROYECTOS */}
        {proyectos.length === 0 ? (
          <div className="py-20 border-2 border-dashed border-zinc-900 rounded-[2.5rem] flex flex-col items-center justify-center space-y-4">
            <p className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest italic">Aún no has fundado ninguna producción.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {proyectos.map((proyecto) => (
              <Link
                key={proyecto.id}
                href={`/proyectos/${proyecto.id}`}
                className="group relative bg-zinc-950 border border-zinc-900 p-8 rounded-[2rem] hover:border-red-600/50 transition-all duration-500 overflow-hidden"
              >
                {/* Indicador de color dinámico */}
                <div 
                  className="absolute left-0 top-0 h-full w-1 transition-all group-hover:w-2" 
                  style={{ backgroundColor: proyecto.theme_color || '#dc2626' }}
                />

                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-start">
                    <p className="text-[10px] font-mono text-zinc-500 uppercase flex items-center gap-2">
                      <CalendarIcon className="w-3 h-3" />
                      {new Date(proyecto.created_at).toLocaleDateString()}
                    </p>
                    <ChevronRightIcon className="w-4 h-4 text-zinc-800 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                  </div>

                  <h2 className="text-2xl font-bold uppercase tracking-tight group-hover:text-red-600 transition-colors">
                    {proyecto.title}
                  </h2>
                  
                  <p className="text-[11px] text-zinc-500 font-mono line-clamp-2 italic uppercase leading-relaxed">
                    {proyecto.description || 'Sin descripción artística.'}
                  </p>

                  <div className="pt-4 flex items-center gap-4 text-zinc-600 text-[9px] font-mono uppercase tracking-widest">
                    <span className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
                      <UserGroupIcon className="w-3 h-3 text-red-600" />
                      {proyecto.project_characters?.length || 0} Reparto
                    </span>
                    <span className="text-zinc-800">ID: {proyecto.id.slice(0, 8)}</span>
                  </div>
                </div>

                {/* Decoración de fondo sutil */}
                <div className="absolute -bottom-4 -right-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                   <FolderIcon className="w-32 h-32 rotate-12" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}