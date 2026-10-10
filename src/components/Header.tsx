import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LogOut, RotateCcw, QrCode, Award, Bell, Sparkles, UserCheck } from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentUser, 
    logout, 
    resetDemoData, 
    setShowQRScanner,
    setActiveTab,
    demoUsers,
    switchDemoUser
  } = useApp();

  const [showDemoMenu, setShowDemoMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  if (!currentUser) return null;

  return (
    <header className="sticky top-0 z-40 w-full header-scrolled transition-all duration-300 py-3 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo & Brand */}
        <button
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <img
            src="https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/PremiumGym_hy/logoPGcolorTransparente.webp"
            alt="Premium Gym Logo"
            className="w-10 h-10 md:w-11 md:h-11 object-contain transition-transform group-hover:scale-105"
          />
          <div>
            <div className="flex items-center gap-1.5 text-lg md:text-xl font-heading font-black tracking-widest text-white leading-none">
              <span>PREMIUM</span>
              <span className="text-yellow">GYM</span>
              <span className="text-purple-light text-xs font-bold px-1.5 py-0.5 rounded bg-purple/40 border border-purple-light/40">CLUB</span>
            </div>
            <span className="text-[10px] text-gray-400 font-light tracking-wider block mt-0.5 uppercase">
              Sistema de Puntos
            </span>
          </div>
        </button>

        {/* Right side actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Quick QR Visit Button */}
          <button
            onClick={() => setShowQRScanner(true)}
            className="hidden sm:flex items-center gap-2 bg-purple hover:bg-yellow text-white hover:text-dark font-heading font-bold text-xs md:text-sm px-4 py-2 uppercase tracking-wider rounded-lg border border-purple-light/40 transition-all duration-300 glow-button"
            title="Simular escaneo QR en recepción"
          >
            <QrCode className="w-4 h-4" />
            <span>Simular Visita</span>
          </button>

          {/* Points Badge */}
          <button
            onClick={() => setActiveTab('mis-puntos')}
            className="flex items-center gap-2 bg-[#222630] hover:border-yellow border border-purple/40 rounded-full px-3 py-1.5 transition-all duration-300 group cursor-pointer"
          >
            <Award className="w-4 h-4 text-yellow group-hover:scale-110 transition-transform" />
            <div className="flex items-baseline gap-1">
              <span className="font-heading font-black text-yellow text-sm md:text-base">
                {currentUser.points.toLocaleString()}
              </span>
              <span className="text-[10px] text-gray-300 uppercase font-semibold">pts</span>
            </div>
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-9 h-9 rounded-full bg-[#222630] border border-purple/30 flex items-center justify-center text-gray-300 hover:text-yellow hover:border-yellow/50 transition-all relative"
              title="Notificaciones"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-yellow animate-ping"></span>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-yellow"></span>
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-[#222630] border border-purple/40 rounded-xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center border-b border-purple/30 pb-2 mb-3">
                  <h4 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow" /> Notificaciones
                  </h4>
                  <span className="text-[10px] text-yellow bg-purple/40 px-2 py-0.5 rounded-full border border-purple-light/30">
                    Modo Club
                  </span>
                </div>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  <div className="bg-[#16181E] p-2.5 rounded-lg border border-purple/20 text-xs">
                    <div className="font-semibold text-white flex justify-between">
                      <span>¡Bono de Bienvenida Activo!</span>
                      <span className="text-[10px] text-gray-400">Hoy</span>
                    </div>
                    <p className="text-gray-300 text-[11px] mt-1">
                      Recuerda que cada visita al gimnasio te otorga 1 punto acumulable para el catálogo de recompensas.
                    </p>
                  </div>
                  <div className="bg-[#16181E] p-2.5 rounded-lg border border-yellow/20 text-xs">
                    <div className="font-semibold text-yellow flex justify-between">
                      <span>Nivel {currentUser.tier}</span>
                      <span className="text-[10px] text-gray-400">Actual</span>
                    </div>
                    <p className="text-gray-300 text-[11px] mt-1">
                      Estás en el puesto #{currentUser.rank} del ranking del club con {currentUser.points} puntos.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Demo Menu Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowDemoMenu(!showDemoMenu)}
              className="flex items-center gap-2 bg-[#222630] hover:border-purple-light border border-purple/40 rounded-full p-1 pr-3 transition-all cursor-pointer"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-yellow/60"
              />
              <span className="hidden md:inline font-heading font-semibold text-xs text-white max-w-[100px] truncate">
                {currentUser.name}
              </span>
            </button>

            {/* Demo Menu Dropdown */}
            {showDemoMenu && (
              <div className="absolute right-0 mt-3 w-64 bg-[#222630] border border-purple/40 rounded-xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="px-2 py-1.5 border-b border-purple/30 mb-2">
                  <p className="text-xs font-semibold text-white">{currentUser.name}</p>
                  <p className="text-[10px] text-gray-400 truncate">{currentUser.email}</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-yellow bg-purple/40 px-2 py-0.5 rounded-full border border-purple-light/30">
                      Nivel {currentUser.tier}
                    </span>
                    <span className="text-[10px] text-gray-400">Puesto #{currentUser.rank}</span>
                  </div>
                </div>

                {/* Switch Demo Profiles section */}
                <div className="py-1">
                  <p className="text-[10px] uppercase font-bold text-yellow px-2 mb-1">
                    Cambiar Perfil Demo:
                  </p>
                  <div className="space-y-1">
                    {demoUsers.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => {
                          switchDemoUser(user.id);
                          setShowDemoMenu(false);
                        }}
                        className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors ${
                          user.id === currentUser.id
                            ? 'bg-purple/50 text-white font-bold border border-purple-light/40'
                            : 'hover:bg-[#16181E] text-gray-300'
                        }`}
                      >
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="truncate flex-1 text-left">{user.name}</span>
                        {user.id === currentUser.id && <UserCheck className="w-3.5 h-3.5 text-yellow" />}
                        <span className="text-[10px] text-yellow font-mono">{user.points} pts</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-purple/30 pt-2 mt-2 space-y-1">
                  <button
                    onClick={() => {
                      resetDemoData();
                      setShowDemoMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors text-left"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restablecer Demostración</span>
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setShowDemoMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Salir Modo Demo</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
