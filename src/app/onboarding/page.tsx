"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/src/lib/supabase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function OnboardingPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  // 1. Cargar nombre inicial si viene de Google
  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setFullName(user.user_metadata.display_name || '');
    };
    getUserData();
  }, []);

  useEffect(() => {
  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    // Si ni siquiera está logueado, mándalo al login
    if (!user) {
      router.push('/login');
      return;
    }

    // Si ya tiene username, mándalo al dashboard (ya no debe estar aquí)
    const { data: profile } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', user.id)
      .single();

    if (profile?.username) {
      router.push('/dashboard');
    }
  };
  checkUser();
}, []);

  // 2. Función para subir la foto
  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) return;

      const file = event.target.files[0];
      const { data: { user } } = await supabase.auth.getUser();
      const fileExt = file.name.split('.').pop();
      const filePath = `${user?.id}-${Math.random()}.${fileExt}`;

      // Subir imagen al bucket 'avatars'
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Obtener la URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);
    } catch (error) {
      alert('Error subiendo la foto');
    } finally {
      setUploading(false);
    }
  };

  // 3. Guardar todo el perfil
  const handleFinish = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('profiles')
      .update({ 
        username: username.toLowerCase().trim(), 
        full_name: fullName,
        avatar_url: avatarUrl,
        updated_at: new Date() 
      })
      .eq('id', user?.id);

    if (!error) {
      router.push('/dashboard');
    } else {
      alert("Error: Revisa que el @username no esté ya ocupado.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-[#F9F6EE] flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tighter uppercase font-mono">
            Prepara tu <span className="text-red-600">Camerino</span>
          </h1>
          <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-2">Personaliza tu ficha artística</p>
        </div>

        <div className="space-y-6 bg-zinc-900/20 p-8 rounded-3xl border border-zinc-800 backdrop-blur-sm">
          
          {/* Selector de Foto */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-28 h-28 group">
              <div className={`w-full h-full rounded-full border-2 overflow-hidden flex items-center justify-center transition-all 
                ${avatarUrl ? 'border-purple-500' : 'border-dashed border-zinc-700 group-hover:border-red-600'}`}>
                {avatarUrl ? (
                  <Image src={avatarUrl} alt="Avatar" fill className="object-cover" />
                ) : (
                  <span className="text-[10px] text-zinc-600 font-mono text-center px-2">
                    {uploading ? "SUBIENDO..." : "SUBIR FOTO"}
                  </span>
                )}
              </div>
              <input 
                type="file" 
                accept="image/*" 
                onChange={uploadAvatar}
                disabled={uploading}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 block mb-1 ml-1">Nombre Público</label>
              <input 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-transparent border-b border-zinc-800 py-2 outline-none focus:border-[#F9F6EE] transition-colors font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 block mb-1 ml-1">@Username</label>
              <input 
                placeholder="ej: el_protagonista"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent border-b border-zinc-800 py-2 outline-none focus:border-red-600 transition-colors font-mono text-red-500"
              />
            </div>
          </div>

          <button 
            onClick={handleFinish}
            disabled={loading || !username || uploading}
            className="w-full bg-[#F9F6EE] text-black font-mono py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-red-600 hover:text-white transition-all disabled:opacity-30"
          >
            {loading ? "CONFIGURANDO ESCENA..." : "ENTRAR A ELENCO"}
          </button>
        </div>
      </div>
    </main>
  );
}