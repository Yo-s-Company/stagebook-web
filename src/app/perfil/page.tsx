"use client";
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/src/lib/supabase';
// Asegúrate de que la ruta a tus interfaces sea correcta
import { ProfileState, CompaniaHistorial } from '@/src/interfaces'; 
import { 
  CameraIcon, 
  SparklesIcon, 
  AcademicCapIcon, 
  UserGroupIcon,
  LanguageIcon, 
  PlusIcon, 
  PencilSquareIcon, 
  GlobeAltIcon,
  ArrowPathIcon,
  CheckIcon,
  XMarkIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const highlights = [
  { id: 'habilidades', name: 'Habilidades', icon: SparklesIcon },
  { id: 'idiomas', name: 'Idiomas', icon: LanguageIcon },
  { id: 'formacion', name: 'Formación', icon: AcademicCapIcon },
  { id: 'companias', name: 'Compañías', icon: UserGroupIcon },
];

export default function PerfilProPage() {
  const [activeTab, setActiveTab] = useState('fotos');
  const [profile, setProfile] = useState<ProfileState>({ 
    id: '', 
    username: '', 
    bio: '', 
    avatar: '',
    habilidades: [], 
    idiomas: [], 
    formacion: [], 
    companias: [] 
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ username: '', bio: '' });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        const { data: compHistory } = await supabase
          .from('company_members')
          .select(`
            role,
            is_active,
            companies ( name )
          `)
          .eq('profile_id', user.id);
if (compHistory) {
  setProfile(prev => ({ 
    ...prev, 
    companias: compHistory.map(c => {

      const compañiaData = Array.isArray(c.companies) ? c.companies[0] : c.companies;
      
      return {
        nombre: compañiaData?.name || 'Compañía desconocida',
        rol: c.role, 
        estado: c.is_active ? 'Actual' : 'Pasada'
      };
    })
  }));
}
        if (profileData) {
          const formattedCompanies: CompaniaHistorial[] = compHistory?.map((c: any) => ({
            nombre: c.companies.name,
            rol: c.role,
            estado: c.is_active ? 'Actual' : 'Pasada'
          })) || [];

          setProfile({
            id: user.id,
            username: profileData.username || '', 
            bio: profileData.bio || '',
            avatar: profileData.avatar_url || '',
            habilidades: profileData.habilidades || [],
            idiomas: profileData.idiomas || [],
            formacion: profileData.formacion || [],
            companias: formattedCompanies
          });
          
          setEditForm({ 
            username: profileData.username || '', 
            bio: profileData.bio || '' 
          });
        }
      }
    } catch (error) {
      console.error('Error cargando perfil:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('profiles')
        .update({
          username: editForm.username,
          bio: editForm.bio
        })
        .eq('id', profile.id);

      if (error) throw error;

      setProfile(prev => ({ ...prev, ...editForm }));
      setIsEditing(false);
    } catch (error: any) {
      alert("Error al actualizar: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const filePath = `${profile.id}/avatar-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);

      await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', profile.id);

      setProfile(prev => ({ ...prev, avatar: publicUrl }));
    } catch (error: any) {
      alert('Error subiendo imagen: ' + error.message);
    } finally {
      setUploading(false);
    }
  }

  if (loading && !profile.id) {
    return <div className="p-20 text-center font-mono text-zinc-500 uppercase italic">Cargando Escenario...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto pb-20 px-4">
      <header className="flex flex-col md:flex-row items-center gap-10 py-12 border-b border-zinc-900">
        <div 
          className="w-40 h-40 rounded-full border-2 border-red-600 p-1 shrink-0 relative cursor-pointer" 
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-full h-full rounded-full bg-zinc-900 overflow-hidden flex items-center justify-center">
            {profile.avatar 
              ? <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover transition-transform group-hover:scale-110" /> 
              : <span className="text-4xl text-zinc-800 font-bold uppercase">{profile.username[0] || '?'}</span>
            }
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            {uploading ? <ArrowPathIcon className="w-8 h-8 text-white animate-spin" /> : <CameraIcon className="w-8 h-8 text-white" />}
          </div>
          <input type="file" ref={fileInputRef} className="hidden" onChange={uploadAvatar} accept="image/*" />
        </div>

        <div className="flex-1 space-y-5 w-full text-center md:text-left">
          {isEditing ? (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="bg-red-900/20 border border-red-900/50 p-3 rounded-lg flex items-start gap-3">
                <ExclamationTriangleIcon className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-[10px] text-red-200 font-mono leading-tight uppercase">
                  Atención: El cambio de nombre afecta tus invitaciones y enlaces activos.
                </p>
              </div>
              <input 
                value={editForm.username}
                onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-[#F9F6EE] font-bold outline-none focus:border-red-600"
                placeholder="Nombre de usuario"
              />
              <textarea 
                value={editForm.bio}
                onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded text-zinc-400 text-sm font-mono h-24 outline-none focus:border-red-600"
                placeholder="Biografía artística..."
              />
              <div className="flex gap-2 justify-center md:justify-start">
                <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white text-[10px] font-bold uppercase rounded">
                  <CheckIcon className="w-3 h-3" /> Guardar
                </button>
                <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 px-6 py-2 bg-zinc-800 text-white text-[10px] font-bold uppercase rounded">
                  <XMarkIcon className="w-3 h-3" /> Cancelar
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <h1 className="text-3xl font-bold tracking-tighter uppercase italic text-[#F9F6EE]">@{profile.username}</h1>
                <button onClick={() => setIsEditing(true)} className="px-6 py-1.5 bg-[#F9F6EE] text-black text-[10px] font-bold uppercase tracking-widest rounded-md hover:bg-red-600 hover:text-white transition-all">
                  Editar Perfil
                </button>
              </div>
              <p className="text-zinc-500 text-sm font-mono max-w-xl leading-relaxed">
                {profile.bio || "Agrega una descripción sobre tu trayectoria."}
              </p>
            </>
          )}
        </div>
      </header>

      <div className="py-10 flex flex-wrap justify-center md:justify-start gap-8 md:gap-12">
        {highlights.map((item) => (
          <div key={item.id} className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full border border-zinc-800 flex items-center justify-center bg-zinc-900/50">
              <item.icon className="w-6 h-6 text-zinc-500" />
            </div>
            <span className="text-[10px] font-mono font-bold uppercase text-zinc-500 tracking-widest">{item.name}</span>
            <div className="flex flex-col items-center">
              {item.id === 'companias' ? (
                profile.companias.slice(0, 3).map((c, i) => (
                  <span key={i} className="text-[8px] text-zinc-600 uppercase italic">{c.nombre}</span>
                ))
              ) : (
                (profile[item.id as keyof ProfileState] as string[])?.slice(0, 3).map((val, i) => (
                  <span key={i} className="text-[8px] text-zinc-600 uppercase">{val}</span>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-12 border-t border-zinc-900 mb-10">
        {['fotos', 'expediente'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-4 text-[10px] font-mono font-bold uppercase tracking-[0.3em] border-t-2 -mt-px transition-all
            ${activeTab === tab ? 'border-red-600 text-white' : 'border-transparent text-zinc-600 hover:text-zinc-400'}`}
          >
            {tab === 'fotos' ? 'Book Visual' : 'Trayectoria'}
          </button>
        ))}
      </div>

      <div className="animate-in fade-in duration-700 min-h-[300px]">
        {activeTab === 'fotos' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="aspect-[3/4] border-2 border-dashed border-zinc-900 rounded-2xl flex flex-col items-center justify-center hover:border-red-600 transition-all group">
              <CameraIcon className="w-8 h-8 text-zinc-800 group-hover:text-red-600 transition-colors" />
              <span className="text-[8px] font-mono uppercase mt-2 text-zinc-600 group-hover:text-red-600">Subir Foto</span>
            </button>
          </div>
        )}

        {activeTab === 'expediente' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h3 className="text-zinc-400 text-[10px] font-mono uppercase tracking-widest border-b border-zinc-900 pb-2 italic">Historial de Compañías</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.companias.length > 0 ? (
                profile.companias.map((c, i) => (
                  <div key={i} className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-xl flex justify-between items-center group hover:border-zinc-600 transition-all">
                    <div>
                      <p className="text-xs font-bold uppercase text-[#F9F6EE]">{c.nombre}</p>
                      <p className="text-[10px] text-zinc-500 font-mono italic">{c.rol}</p>
                    </div>
                    <span className={`text-[8px] px-2 py-1 rounded font-bold uppercase tracking-tighter ${c.estado === 'Actual' ? 'bg-green-900/20 text-green-500' : 'bg-zinc-800 text-zinc-500'}`}>
                      {c.estado}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-zinc-600 text-[10px] font-mono uppercase">Sin registros de compañías aún.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}