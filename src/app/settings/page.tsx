"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/src/lib/supabase';
import { 
  UserIcon, 
  BellIcon, 
  ShieldCheckIcon, 
  PaintBrushIcon,
  ArrowLeftIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import StatusPopup from '@/src/components/StatusPop';
import Link from 'next/link';

export default function SettingsPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [campoEditando, setCampoEditando] = useState<string | null>(null);
  const [valorTemporal, setValorTemporal] = useState<any>("");
  const [popup, setPopup] = useState({ show: false, message: "", type: "success" as "success" | "error" });

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(data);
    }
    setLoading(false);
  }

  async function actualizarAjuste(columna: string, valor: any) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase
        .from('profiles')
        .update({ [columna]: valor })
        .eq('id', user?.id);

      if (error) throw error;

      setProfile({ ...profile, [columna]: valor });
      setCampoEditando(null);
      setPopup({ show: true, message: "Ajuste actualizado", type: "success" });
      setTimeout(() => setPopup({ ...popup, show: false }), 3000);
    } catch (err) {
      setPopup({ show: true, message: "Error al actualizar", type: "error" });
    }
  }

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-mono italic">Cargando Camerino...</div>;

  return (
    <main className="min-h-screen bg-black text-[#F9F6EE] p-8 md:p-16">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* HEADER */}
        <header className="space-y-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all uppercase text-[10px] font-mono">
            <ArrowLeftIcon className="w-4 h-4" /> Volver a Cartelera
          </Link>
          <h1 className="text-5xl font-bold uppercase tracking-tighter italic">Configuración <span className="text-red-600">Personal</span></h1>
        </header>

        <div className="grid grid-cols-1 gap-8">
          
          {/* SECCIÓN PERFIL */}
          <section className="bg-zinc-900/20 border border-zinc-900 rounded-[2.5rem] p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
              <UserIcon className="w-5 h-5 text-red-600" />
              <h2 className="text-[10px] font-mono uppercase tracking-widest font-bold">Identidad Artística</h2>
            </div>

            <div className="space-y-6">
              {/* EDITAR USERNAME */}
              <div className="flex justify-between items-center group">
                <div>
                  <p className="text-[8px] font-mono text-zinc-500 uppercase">Nombre de Usuario</p>
                  {campoEditando === 'username' ? (
                    <div className="flex items-center gap-2">
                      <input 
                        className="bg-black border-b border-red-600 outline-none text-sm font-bold uppercase"
                        value={valorTemporal}
                        onChange={(e) => setValorTemporal(e.target.value.toLowerCase())}
                        autoFocus
                      />
                      <button onClick={() => actualizarAjuste('username', valorTemporal)}><CheckIcon className="w-4 h-4 text-green-500"/></button>
                    </div>
                  ) : (
                    <p className="text-sm font-bold uppercase">@{profile?.username}</p>
                  )}
                </div>
                <button 
                  onClick={() => { setCampoEditando('username'); setValorTemporal(profile.username); }}
                  className="text-[10px] font-mono text-zinc-600 hover:text-red-600 uppercase opacity-0 group-hover:opacity-100 transition-all"
                >
                  Editar
                </button>
              </div>

              {/* EDITAR BIOGRAFÍA */}
              <div className="flex justify-between items-start group">
                <div className="flex-1">
                  <p className="text-[8px] font-mono text-zinc-500 uppercase">Reseña Artística</p>
                  {campoEditando === 'bio' ? (
                    <textarea 
                      className="w-full bg-black border border-zinc-800 p-3 rounded-xl mt-2 text-xs font-mono outline-none focus:border-red-600"
                      value={valorTemporal}
                      onChange={(e) => setValorTemporal(e.target.value)}
                      onBlur={() => actualizarAjuste('bio', valorTemporal)}
                      autoFocus
                    />
                  ) : (
                    <p className="text-xs text-zinc-400 font-mono mt-1 italic">{profile?.bio || "Sin biografía definida."}</p>
                  )}
                </div>
                <button onClick={() => { setCampoEditando('bio'); setValorTemporal(profile.bio); }} className="text-[10px] font-mono text-zinc-600 hover:text-red-600 uppercase opacity-0 group-hover:opacity-100 transition-all ml-4">Editar</button>
              </div>
            </div>
          </section>

          {/* SECCIÓN PREFERENCIAS */}
          <section className="bg-zinc-900/20 border border-zinc-900 rounded-[2.5rem] p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
              <PaintBrushIcon className="w-5 h-5 text-red-600" />
              <h2 className="text-[10px] font-mono uppercase tracking-widest font-bold">Interfaz y Sistema</h2>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-bold uppercase">Notificaciones por Email</p>
                <p className="text-[10px] font-mono text-zinc-500 uppercase italic">Recibe avisos de ensayos y cambios de libreto.</p>
              </div>
              <input 
                type="checkbox" 
                className="w-5 h-5 accent-red-600 bg-zinc-900 border-zinc-800 rounded"
                checked={profile?.notificaciones}
                onChange={(e) => actualizarAjuste('notificaciones', e.target.checked)}
              />
            </div>
          </section>

          <button 
            onClick={() => supabase.auth.signOut()}
            className="w-full py-4 border border-red-600/30 text-red-600 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-lg"
          >
            Cerrar Sesión del Camerino
          </button>
        </div>
      </div>

      <StatusPopup show={popup.show} message={popup.message} type={popup.type} />
    </main>
  );
}