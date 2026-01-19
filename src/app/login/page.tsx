"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Cursor from '@/src/components/Cursor'; 
import Typewriter from '@/src/components/Typewriter';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { supabase } from '@/src/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [buttonText, setButtonText] = useState("ENTRAR A ESCENA");

  const handleLogin = async () => {
    setError(false);
    setIsShaking(false);

    if (!email || !password) {
      setError(true);
      setIsShaking(true);
      setButtonText("LIBRETO INCOMPLETO");
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    setButtonText("VERIFICANDO CREDENCIALES...");

    const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(true);
      setIsShaking(true);
      
      if (authError.status === 400 || authError.message.includes("Invalid login credentials")) {
        setButtonText("DATOS INCORRECTOS");
      } else if (authError.message.includes("Email not confirmed")) {
        setButtonText("REVISA TU CORREO");
      } else {
        setButtonText("FALLO EN EL ESTRENO");
      }

      console.error("Error de acceso:", authError.message);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    // --- LÓGICA DE ÉXITO Y REDIRECCIÓN ---
    if (user) {
      setButtonText("¡TELÓN ARRIBA!");
      
      // Consultamos si el perfil ya tiene un username
      const { data: profile } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();

      setTimeout(() => {
        if (!profile?.username) {
          router.push('/onboarding');
        } else {
          router.push('/dashboard');
        }
      }, 800);
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) console.error(error.message);
  };

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-12">
      <div className={`w-full max-w-md space-y-8 transition-all ${isShaking ? '[animation:shake_0.15s_ease-in-out_infinite]' : ''}`}>
        
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="relative w-16 h-16 mb-4 opacity-80">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>
          <h1 className="text-3xl font-mono font-bold tracking-tighter text-[#F9F6EE]">
            STAGE<span className="text-red-600">BOOK</span>
          </h1>
          <div className="h-6">
            <Typewriter text="Identifícate para entrar a tu camerino..." speed={70} className="text-zinc-500 text-sm italic" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative group">
            <label className={`text-[10px] uppercase tracking-widest mb-2 block ml-2 transition-colors ${error ? 'text-red-500' : 'text-zinc-500'}`}>
              Correo del Artista
            </label>
            <div className={`flex items-center border-b-2 transition-colors duration-300 py-3 px-2 ${error ? 'border-red-600' : emailFocused ? 'border-purple-600' : 'border-zinc-800'}`}>
              <input
                type="email"
                className="bg-transparent flex-1 text-[#F9F6EE] font-mono outline-none placeholder:text-zinc-500/30"
                onFocus={() => { setEmailFocused(true); setError(false); }}
                onBlur={() => setEmailFocused(false)}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@ejemplo.com"
              />
              <Cursor isAnimating={emailFocused} colorClass={error ? "bg-red-600" : "bg-purple-600"} />
            </div>
          </div>

          <div className="relative group">
            <label className={`text-[10px] uppercase tracking-widest mb-2 block ml-2 transition-colors ${error ? 'text-red-500' : 'text-zinc-500'}`}>
              Clave de Acceso
            </label>
            <div className={`flex items-center border-b-2 transition-colors duration-300 py-3 px-2 ${error ? 'border-red-600' : passwordFocused ? 'border-red-600' : 'border-zinc-800'}`}>
              <input
                type={showPassword ? "text" : "password"}
                className="bg-transparent flex-1 text-[#F9F6EE] font-mono outline-none"
                onFocus={() => { setPasswordFocused(true); setError(false); }}
                onBlur={() => setPasswordFocused(false)}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-zinc-600 hover:text-zinc-400 px-2"
              >
                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
              <Cursor isAnimating={passwordFocused} colorClass="bg-red-600" />
            </div>
          </div>

          <button 
            onClick={handleLogin}
            className={`w-full font-mono py-4 rounded-full transition-all duration-300 font-bold active:scale-95 uppercase tracking-widest text-sm border-2 mt-4
              ${error ? 'bg-red-700 border-red-700 text-white' : 'bg-[#F9F6EE] border-zinc-800 text-black hover:bg-red-600 hover:text-white hover:border-red-600'}`}
          >
            {buttonText}
          </button>

          <button 
            onClick={handleGoogleLogin}
            className="w-full border border-zinc-800 text-zinc-400 font-mono py-4 rounded-full hover:bg-purple-900/10 hover:border-purple-600 transition-colors flex items-center justify-center gap-3 active:scale-95"
          >
            <span className="text-xs uppercase tracking-widest">Continuar con Google</span>
          </button>

          <div className="text-center pt-4">
            <Link href="/register" className="text-zinc-600 text-[10px] uppercase tracking-widest hover:text-[#F9F6EE] transition-colors">
              ¿Aún no tienes libreto? Registrate aquí
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}