"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  XMarkIcon, 
  ArrowRightIcon, 
  ArrowLeftIcon, 
  CalendarDaysIcon,
  TicketIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function NuevoProyectoPage() {
  // --- ESTADOS: NAVEGACIÓN ---
  const [step, setStep] = useState(1); 

  // --- ESTADOS: PASO 1 (Datos de la Obra) ---
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [callTime, setCallTime] = useState('');
  const [showTime, setShowTime] = useState('');

  // --- ESTADOS: PASO 2 (Calendario) ---
  const [currentDate, setCurrentDate] = useState(new Date());
  const [workingDays, setWorkingDays] = useState<number[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  
  const selectorDays = [
    { id: 1, label: 'Lun' }, { id: 2, label: 'Mar' }, { id: 3, label: 'Mié' },
    { id: 4, label: 'Jue' }, { id: 5, label: 'Vie' }, { id: 6, label: 'Sáb' }, { id: 0, label: 'Dom' }
  ];

  // --- LÓGICA DEL CALENDARIO ---
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const days = [];
    
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= totalDays; i++) days.push(new Date(year, month, i));
    
    return days;
  };

  const toggleWorkingDay = (id: number) => {
    if (workingDays.includes(id)) {
      setWorkingDays(workingDays.filter(day => day !== id));
    } else {
      setWorkingDays([...workingDays, id]);
    }
  };

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date < startDate) {
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  const isWorkingDayInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    const isInRange = date >= startDate && date <= endDate;
    const isSelectedDayOfWeek = workingDays.includes(date.getDay());
    return isInRange && isSelectedDayOfWeek;
  };

  const isBoundaryDate = (date: Date) => {
    return (startDate && date.getTime() === startDate.getTime()) || 
           (endDate && date.getTime() === endDate.getTime());
  };

  // --- LÓGICA PARA CALCULAR FECHAS EXACTAS ---
  const getCalculatedDates = () => {
    if (!startDate || !endDate || workingDays.length === 0) return [];
    const dates = [];
    let current = new Date(startDate);
    
    while (current <= endDate) {
      if (workingDays.includes(current.getDay())) {
        dates.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const calculatedDates = getCalculatedDates();

  // Validaciones para habilitar botones
  const canProceedStep1 = eventName.trim() !== ''; // Al menos el nombre debe estar lleno
  const canProceedStep2 = workingDays.length > 0 && startDate && endDate;

  return (
    <div className="min-h-screen bg-black text-[#F9F6EE] p-8 flex flex-col items-center justify-center relative">
      
      {/* Botón de cerrar general */}
      <Link href="/calendar" className="absolute top-8 right-8 p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors">
        <XMarkIcon className="w-6 h-6" />
      </Link>

      {/* Indicador de progreso (Opcional, se ve muy pro) */}
      <div className="absolute top-12 flex gap-2">
        <div className={`h-1 w-12 rounded-full ${step >= 1 ? 'bg-red-600' : 'bg-zinc-800'}`}></div>
        <div className={`h-1 w-12 rounded-full ${step >= 2 ? 'bg-red-600' : 'bg-zinc-800'}`}></div>
        <div className={`h-1 w-12 rounded-full ${step >= 3 ? 'bg-red-600' : 'bg-zinc-800'}`}></div>
      </div>

      <div className="w-full max-w-md space-y-6">
        
        {/* ================= PASO 1: DATOS DE LA OBRA ================= */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm mb-6">
              <div className="text-center mb-6">
                <TicketIcon className="w-10 h-10 text-red-600 mx-auto mb-2" />
                <h2 className="text-xl font-bold uppercase tracking-widest">
                  Datos del <span className="text-red-600">Evento</span>
                </h2>
              </div>

              <div className="space-y-5">
                {/* Nombre */}
                <div>
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Nombre de la Obra/Evento</label>
                  <div className="relative mt-1">
                    <input 
                      type="text" 
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Lugar */}
                <div>
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Lugar / Teatro</label>
                  <div className="relative mt-1">
                    <MapPinIcon className="w-5 h-5 absolute left-3 top-3.5 text-zinc-500" />
                    <input 
                      type="text" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Horarios */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Llamado</label>
                    <div className="relative mt-1">
                      <ClockIcon className="w-4 h-4 absolute left-3 top-4 text-zinc-500" />
                      <input 
                        type="time" 
                        value={callTime}
                        onChange={(e) => setCallTime(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-9 pr-2 text-sm text-white focus:border-red-600 outline-none transition-all [color-scheme:dark]"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Función</label>
                    <div className="relative mt-1">
                      <TicketIcon className="w-4 h-4 absolute left-3 top-4 text-zinc-500" />
                      <input 
                        type="time" 
                        value={showTime}
                        onChange={(e) => setShowTime(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-9 pr-2 text-sm text-white focus:border-red-600 outline-none transition-all [color-scheme:dark]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setStep(2)}
              disabled={!canProceedStep1}
              className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                canProceedStep1 
                  ? 'bg-[#F9F6EE] text-black hover:bg-red-600 hover:text-white shadow-xl' 
                  : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
              }`}
            >
              Siguiente <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* ================= PASO 2: CALENDARIO (DÍAS Y RANGO) ================= */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4 text-center">
                Días de trabajo
              </h3>
              <div className="flex justify-between gap-2">
                {selectorDays.map((day) => (
                  <button
                    key={day.id}
                    onClick={() => toggleWorkingDay(day.id)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                      workingDays.includes(day.id)
                        ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.5)] scale-105'
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm mb-6">
              <div className="flex items-center justify-between mb-6">
                <button onClick={prevMonth} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-bold uppercase tracking-widest">
                  {months[currentDate.getMonth()]} <span className="text-red-600">{currentDate.getFullYear()}</span>
                </h2>
                <button onClick={nextMonth} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-7 text-center mb-2">
                {daysOfWeek.map(day => (
                  <div key={day} className="text-xs font-mono text-zinc-500 uppercase py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth().map((date, index) => {
                  if (!date) return <div key={index} className="h-10" />;

                  const isHighlighted = isWorkingDayInRange(date);
                  const isBoundary = isBoundaryDate(date);

                  return (
                    <button
                      key={index}
                      onClick={() => handleDateClick(date)}
                      className={`
                        h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 mx-auto
                        ${isHighlighted ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] scale-110' : ''}
                        ${isBoundary && !isHighlighted ? 'border-2 border-red-600 text-red-500' : ''}
                        ${!isHighlighted && !isBoundary ? 'hover:bg-zinc-800 hover:text-white' : ''}
                      `}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* BOTONES DE NAVEGACIÓN (Atrás y Siguiente) */}
            <div className="flex gap-4">
              <button 
                onClick={() => setStep(1)}
                className="flex-1 py-4 rounded-xl font-bold uppercase tracking-widest border border-zinc-700 hover:bg-zinc-800 transition-all text-xs flex items-center justify-center gap-2"
              >
                <ArrowLeftIcon className="w-4 h-4" /> Atrás
              </button>
              <button 
                onClick={() => setStep(3)}
                disabled={!canProceedStep2}
                className={`flex-[2] py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                  canProceedStep2 
                    ? 'bg-[#F9F6EE] text-black hover:bg-red-600 hover:text-white shadow-xl' 
                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                }`}
              >
                Siguiente <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= PASO 3: RESUMEN FINAL ================= */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
              
              <div className="text-center mb-6 border-b border-zinc-800 pb-6">
                <CalendarDaysIcon className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold uppercase tracking-tight mb-4">
                  Confirmar <span className="text-red-600">Agenda</span>
                </h2>
                
                {/* Mostramos los datos del Paso 1 en el resumen */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-left space-y-2 mb-4">
                  <p className="text-lg font-bold text-white">{eventName}</p>
                  {location && <p className="text-sm text-zinc-400 flex items-center gap-2"><MapPinIcon className="w-4 h-4"/> {location}</p>}
                  <div className="flex gap-4 mt-2">
                    {callTime && <p className="text-xs font-mono text-zinc-500">LLAMADO: <span className="text-white">{callTime}</span></p>}
                    {showTime && <p className="text-xs font-mono text-zinc-500">FUNCIÓN: <span className="text-white">{showTime}</span></p>}
                  </div>
                </div>

                <p className="text-zinc-400 font-mono text-sm">
                  Total a trabajar: <span className="text-white font-bold text-lg">{calculatedDates.length}</span> funciones
                </p>
              </div>

              {/* Lista de fechas exactas */}
              <div className="max-h-56 overflow-y-auto pr-2 space-y-2 mb-8 custom-scrollbar">
                {calculatedDates.map((date, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <span className="text-red-500 font-mono text-xs font-bold">#{i + 1}</span>
                    <span className="text-sm font-medium">
                      {daysOfWeek[date.getDay()]}, {date.getDate()} de {months[date.getMonth()]} de {date.getFullYear()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Botones finales */}
              <div className="flex gap-4">
                <button 
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 rounded-xl font-bold uppercase tracking-widest border border-zinc-700 hover:bg-zinc-800 transition-all text-xs flex items-center justify-center gap-2"
                >
                  <ArrowLeftIcon className="w-4 h-4" /> Atrás
                </button>
                <button 
                  className="flex-[2] py-3 rounded-xl font-bold uppercase tracking-widest bg-red-600 text-white hover:bg-red-700 transition-all text-xs shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                >
                  Guardar Evento
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}