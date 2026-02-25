"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/src/lib/supabase';
import { 
  ArrowLeftIcon, DocumentIcon, UserGroupIcon, 
  CalendarIcon, VideoCameraIcon, PencilSquareIcon,
  CheckIcon, XMarkIcon
} from '@heroicons/react/24/outline';

export default function DetalleProyectoPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ESTADOS SIMPLIFICADOS PARA EDICIÓN
  const [campoEditando, setCampoEditando] = useState<string | null>(null);
  const [valorTemporal, setValorTemporal] = useState<any>("");

  useEffect(() => {
    if (id) traerDatosDelProyecto();
  }, [id]);

  async function traerDatosDelProyecto() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`*, project_characters (*)`)
        .eq('id', id)
        .single(); 
      if (error) throw error;
      setProject(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }

  // FUNCIÓN GENÉRICA DE ACTUALIZACIÓN
  async function guardarCambio() {
    if (!campoEditando) return;
    try {
      const { error } = await supabase
        .from('projects')
        .update({ [campoEditando]: valorTemporal })
        .eq('id', id);

      if (error) throw error;

      setProject((prev: any) => ({ ...prev, [campoEditando]: valorTemporal }));
      setCampoEditando(null);
    } catch (err) {
      console.error("Error al actualizar:", err);
      alert("No se pudo guardar el cambio.");
    }
  }

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-mono italic animate-pulse">Cargando Escenario...</div>;
  if (!project) return <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500">Proyecto no encontrado.</div>;

  return (
    <main className="min-h-screen bg-black text-[#F9F6EE] p-8 md:p-16">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* HEADER CON EDICIÓN DE TÍTULO Y DESCRIPCIÓN */}
        <header className="space-y-6">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all uppercase text-[10px] font-mono">
            <ArrowLeftIcon className="w-4 h-4" /> Volver a Proyectos
          </button>
          
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-4 w-full">
              {/* TÍTULO EDITABLE */}
              <div className="flex items-center gap-4 group">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: project.theme_color }} />
                {campoEditando === 'title' ? (
                  <div className="flex items-center gap-2 flex-1">
                    <input 
                      className="bg-zinc-900 border-b-2 border-red-600 outline-none text-5xl font-bold uppercase italic w-full"
                      value={valorTemporal}
                      onChange={(e) => setValorTemporal(e.target.value.toUpperCase())}
                      autoFocus
                    />
                    <button onClick={guardarCambio} className="p-2 bg-green-600 rounded-full"><CheckIcon className="w-4 h-4"/></button>
                  </div>
                ) : (
                  <h1 
                    className="text-6xl font-bold uppercase tracking-tighter italic cursor-pointer hover:text-red-600 transition-all"
                    onClick={() => { setCampoEditando('title'); setValorTemporal(project.title); }}
                  >
                    {project.title}
                  </h1>
                )}
              </div>

              {/* DESCRIPCIÓN EDITABLE */}
              {campoEditando === 'description' ? (
                <div className="flex flex-col gap-2 max-w-2xl">
                  <textarea 
                    className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-sm font-mono text-white outline-none focus:border-red-600"
                    value={valorTemporal}
                    onChange={(e) => setValorTemporal(e.target.value)}
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button onClick={guardarCambio} className="text-[10px] font-bold uppercase text-green-500">Guardar</button>
                    <button onClick={() => setCampoEditando(null)} className="text-[10px] font-bold uppercase text-zinc-500">Cancelar</button>
                  </div>
                </div>
              ) : (
                <p 
                  className="text-zinc-500 font-mono text-sm max-w-2xl cursor-pointer hover:text-zinc-300 transition-all"
                  onClick={() => { setCampoEditando('description'); setValorTemporal(project.description); }}
                >
                  {project.description || "Añadir descripción artística..."}
                </p>
              )}
            </div>
            
            {project.script_url && (
              <a href={project.script_url} target="_blank" className="bg-[#F9F6EE] text-black px-8 py-4 rounded-full font-bold uppercase text-xs flex items-center gap-2 hover:bg-red-600 hover:text-white transition-all shadow-2xl">
                <DocumentIcon className="w-4 h-4" /> Leer Libreto
              </a>
            )}
          </div>
        </header>

        {/* DASHBOARD DE DATOS EDITABLES */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* FECHA EDITABLE */}
          <div 
            className="bg-zinc-900/20 border border-zinc-900 p-8 rounded-[2.5rem] space-y-2 cursor-pointer hover:border-red-600 transition-all"
            onClick={() => { setCampoEditando('start_date'); setValorTemporal(project.start_date); }}
          >
            <CalendarIcon className="w-6 h-6 text-red-600" />
            <p className="text-[10px] font-mono text-zinc-500 uppercase">Estreno</p>
            {campoEditando === 'start_date' ? (
              <input 
                type="date" 
                className="bg-black text-white p-1 rounded border border-zinc-800"
                value={valorTemporal}
                onChange={(e) => setValorTemporal(e.target.value)}
                onBlur={guardarCambio}
                autoFocus
              />
            ) : (
              <p className="text-xl font-bold uppercase">{project.start_date || 'TBD'}</p>
            )}
          </div>
          
          <div className="bg-zinc-900/20 border border-zinc-900 p-8 rounded-[2.5rem] space-y-2">
            <UserGroupIcon className="w-6 h-6 text-red-600" />
            <p className="text-[10px] font-mono text-zinc-500 uppercase">Reparto Total</p>
            <p className="text-xl font-bold uppercase">{project.project_characters?.length} Personajes</p>
          </div>

          {/* COLOR EDITABLE */}
          <div className="bg-zinc-900/20 border border-zinc-900 p-8 rounded-[2.5rem] space-y-2 relative group">
            <div className="flex justify-between items-center">
              <input 
                type="color" 
                value={project.theme_color} 
                onChange={(e) => {
                  setCampoEditando('theme_color');
                  setValorTemporal(e.target.value);
                  // Guardado inmediato para el color por UX
                }}
                onBlur={guardarCambio}
                className="w-8 h-8 bg-transparent border-none cursor-pointer"
              />
              <p className="text-[10px] font-mono text-zinc-500 uppercase">Color Identidad</p>
            </div>
            <p className="text-xl font-bold uppercase">{project.theme_color}</p>
          </div>
        </section>

        {/* LISTADO DE PERSONAJES (EXISTENTE) */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold uppercase tracking-tight border-b border-zinc-900 pb-4">Elenco y <span className="text-red-600">Referencias</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.project_characters?.map((char: any) => (
              <div key={char.id} className="bg-zinc-950 border border-zinc-900 p-6 rounded-3xl flex gap-6 hover:border-zinc-700 transition-all group">
                <div className="w-24 h-24 rounded-2xl bg-zinc-900 flex-shrink-0 overflow-hidden border border-zinc-800 flex items-center justify-center">
                  {char.image_ref_url ? <img src={char.image_ref_url} className="w-full h-full object-cover" /> : <img src="/logo-pepe.png" className="w-10 h-10 object-contain opacity-50" />}
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="text-lg font-bold uppercase leading-none">{char.character_name}</h3>
                  <p className="text-[9px] font-mono text-zinc-600 uppercase mt-1 italic">{char.description}</p>
                  <div className="flex gap-4">
                    {char.video_ref_url && <a href={char.video_ref_url} target="_blank" className="text-[9px] font-bold text-red-600 flex items-center gap-1 hover:underline"><VideoCameraIcon className="w-3 h-3" /> Ver Referencia</a>}
                    <span className="text-[9px] font-mono text-zinc-500 bg-zinc-900 px-2 py-1 rounded">Estado: {char.invitation_status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ];
}