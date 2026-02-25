"use client";
import React, { useState } from 'react';
import { 
  UserIcon, 
  BellAlertIcon, 
  SpeakerWaveIcon, 
  MoonIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

export default function SettingsPage() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="min-h-screen bg-black text-[#F9F6EE] p-8 md:p-16 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-500 italic">Preferencias</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter uppercase leading-none">
            Ajustes de <span className="text-red-600">Camerino</span>
          </h1>

          <div className="mt-8 bg-green-950/40 border border-green-600/50 rounded-xl p-5 flex items-start gap-4 shadow-[0_0_20px_rgba(22,163,74,0.1)]">
            <div className="bg-green-600/20 p-2 rounded-full">
              <CheckIcon className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h2 className="text-green-400 font-bold uppercase tracking-widest text-sm mb-1">
                Prueba de Despliegue Exitosa
              </h2>
              <p className="text-green-200/70 font-mono text-xs leading-relaxed">
                Proyecto StageBook actualizado y desplegado simultáneamente en <span className="text-white font-bold">Microsoft Azure</span> y <span className="text-white font-bold">GitHub Pages</span>. 
              </p>
            </div>
          </div>

        </header>
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-500 italic">Preferencias</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter uppercase leading-none">
            Ajustes de <span className="text-red-600">Camerino</span>
          </h1>

          <div className="mt-8 bg-green-950/40 border border-green-600/50 rounded-xl p-5 flex items-start gap-4 shadow-[0_0_20px_rgba(22,163,74,0.1)]">
            <div className="bg-green-600/20 p-2 rounded-full">
              <CheckIcon className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h2 className="text-green-400 font-bold uppercase tracking-widest text-sm mb-1">
                Prueba de Despliegue Exitosa
              </h2>
              <p className="text-green-200/70 font-mono text-xs leading-relaxed">
                Proyecto StageBook actualizado y desplegado simultáneamente en <span className="text-white font-bold">Microsoft Azure</span> y <span className="text-white font-bold">GitHub Pages</span>. 
              </p>
            </div>
          </div>

        </header>

        <div className="space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
              <UserIcon className="w-6 h-6 text-red-600" />
              <h2 className="text-lg font-bold uppercase tracking-widest">Credencial de Artista</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Nombre en el programa</label>
                <input 
                  type="text" 
                  className="mt-1 w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Rol principal</label>
                <select className="mt-1 w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-white focus:border-red-600 outline-none transition-all appearance-none">
                  <option>Director</option>
                  <option>Productor</option>
                  <option>Actor / Actriz</option>
                  <option>Traspunte / Stage Manager</option>
                  <option>Diseñador Tecnico</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
              <BellAlertIcon className="w-6 h-6 text-red-600" />
              <h2 className="text-lg font-bold uppercase tracking-widest">Alertas de Prevencion</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm">Avisos de Primera, Segunda y Tercera llamada</p>
                  <p className="text-xs text-zinc-500 font-mono mt-1">Recibir notificaciones push en el dispositivo.</p>
                </div>
                <button 
                  onClick={() => setPushNotifications(!pushNotifications)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${pushNotifications ? 'bg-red-600' : 'bg-zinc-700'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${pushNotifications ? 'translate-x-7' : 'translate-x-1'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <SpeakerWaveIcon className="w-4 h-4 text-zinc-400" />
                    <p className="font-bold text-sm">Sonido de Intercomunicador</p>
                  </div>
                  <p className="text-xs text-zinc-500 font-mono mt-1">Reproducir tono al recibir mensajes de cabina.</p>
                </div>
                <button 
                  onClick={() => setSoundAlerts(!soundAlerts)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${soundAlerts ? 'bg-red-600' : 'bg-zinc-700'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${soundAlerts ? 'translate-x-7' : 'translate-x-1'}`}></div>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
              <MoonIcon className="w-6 h-6 text-red-600" />
              <h2 className="text-lg font-bold uppercase tracking-widest">Iluminacion</h2>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm">Modo Blackout (Oscuro)</p>
                <p className="text-xs text-zinc-500 font-mono mt-1">Mantener la interfaz oscura para no deslumbrar en sala.</p>
              </div>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-red-600' : 'bg-zinc-700'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${darkMode ? 'translate-x-7' : 'translate-x-1'}`}></div>
              </button>
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-red-700 transition-all text-xs shadow-[0_0_15px_rgba(220,38,38,0.3)] flex items-center gap-2">
              <CheckIcon className="w-5 h-5" />
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}