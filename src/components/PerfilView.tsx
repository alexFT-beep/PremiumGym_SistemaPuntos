import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Mail, Phone, LogOut, RotateCcw, Save, CheckCircle2 } from 'lucide-react';

export const PerfilView: React.FC = () => {
  const { currentUser, updateUserProfile, logout, resetDemoData } = useApp();

  if (!currentUser) return null;

  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(name, phone);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-purple/30 pb-4">
        <div>
          <h2 className="text-3xl font-heading font-black text-white uppercase tracking-tight flex items-center gap-3">
            <span>MI <span className="text-yellow">PERFIL DE CLUB</span></span>
            <User className="w-8 h-8 text-yellow" />
          </h2>
          <p className="text-xs text-gray-300 font-light mt-1">
            Administra tus datos visibles en la comunidad y consulta las estadísticas de tu cuenta.
          </p>
        </div>

        <span className="text-xs font-bold text-yellow bg-purple/40 px-3 py-1 rounded-full border border-yellow/40">
          Cuenta Demo Activa
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Quick Stats Card */}
        <div className="bg-[#222630] border border-purple/40 rounded-2xl p-6 text-center flex flex-col justify-between">
          <div>
            <div className="relative w-28 h-28 mx-auto mb-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full rounded-full object-cover border-4 border-yellow shadow-[0_0_25px_rgba(245,184,0,0.3)]"
              />
              <span className="absolute bottom-0 right-0 bg-purple text-yellow font-bold text-[10px] px-2.5 py-0.5 rounded-full border border-yellow/50 uppercase">
                {currentUser.tier}
              </span>
            </div>

            <h3 className="text-xl font-heading font-black text-white">{currentUser.name}</h3>
            <p className="text-xs text-gray-400 font-light mt-0.5">{currentUser.email}</p>

            <div className="mt-4 pt-4 border-t border-purple/20 space-y-2 text-left">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Puntos Disponibles:</span>
                <span className="font-heading font-black text-yellow text-sm">{currentUser.points} pts</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Total Visitas:</span>
                <span className="font-bold text-white">{currentUser.visitsCount} asistencias</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Posición Ranking:</span>
                <span className="font-bold text-yellow">Puesto #{currentUser.rank}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Fecha Registro:</span>
                <span className="text-gray-300 font-mono">{currentUser.joinDate}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-purple/20 space-y-2">
            <button
              onClick={resetDemoData}
              className="w-full bg-[#16181E] hover:bg-amber-500/20 text-amber-400 font-heading font-bold text-xs py-2.5 px-4 rounded-xl border border-amber-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer Demostración</span>
            </button>

            <button
              onClick={logout}
              className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 font-heading font-bold text-xs py-2.5 px-4 rounded-xl border border-red-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar Sesión Demo</span>
            </button>
          </div>
        </div>

        {/* Right Column: Editable Profile Form */}
        <div className="lg:col-span-2 bg-[#222630] border border-purple/40 rounded-2xl p-6">
          <h3 className="text-lg font-heading font-black text-white uppercase mb-4 pb-2 border-b border-purple/20 flex items-center gap-2">
            <User className="w-5 h-5 text-yellow" />
            Editar Datos del Perfil (Modo Demo)
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-heading font-bold text-gray-300 uppercase mb-1">
                Nombre de Visualización
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-[#16181E] border border-purple/30 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-yellow transition-colors"
                />
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-heading font-bold text-gray-300 uppercase mb-1">
                Correo Electrónico (Simulado)
              </label>
              <div className="relative opacity-70">
                <input
                  type="email"
                  value={currentUser.email}
                  disabled
                  className="w-full bg-[#16181E] border border-purple/20 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-400 cursor-not-allowed"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              </div>
              <p className="text-[10px] text-gray-500 mt-1">El correo procede de la simulación con Google.</p>
            </div>

            <div>
              <label className="block text-xs font-heading font-bold text-gray-300 uppercase mb-1">
                Número de Celular (WhatsApp)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#16181E] border border-purple/30 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-yellow transition-colors"
                />
                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              </div>
              <p className="text-[10px] text-gray-400 mt-1">Utilizado para confirmaciones de canjes vía WhatsApp.</p>
            </div>

            <div className="pt-4 border-t border-purple/20 flex items-center justify-between">
              {isSaved ? (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> ¡Datos actualizados!
                </span>
              ) : (
                <span className="text-[11px] text-gray-400">Los cambios se guardan localmente.</span>
              )}

              <button
                type="submit"
                className="bg-yellow hover:bg-yellow-light text-dark font-heading font-bold text-xs py-3 px-6 uppercase tracking-wider rounded-xl shadow-[0_0_15px_rgba(245,184,0,0.4)] transition-all cursor-pointer flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
