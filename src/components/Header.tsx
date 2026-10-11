import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LogOut, RotateCcw, QrCode, Award, Bell, Sparkles, UserCheck, X } from 'lucide-react';

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
    <header className="sticky top-0 z-40 w-full header-scrolled transition-all duration-300 py-2.5 sm:py-3 px-3 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
        {/* Logo & Brand */}
        <button
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2 sm:gap-3 text-left group focus:outline-none shrink-0 cursor-pointer"
        >
          <img
            src="https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/PremiumGym_hy/logoPGcolorTransparente.webp"
            alt="Premium Gym Logo"
            className="w-9 h-9 sm:w-11 sm:h-11 object-contain transition-transform group-hover:scale-105"
          />
          <div>
            <div className="flex items-center gap-1 sm:gap-1.5 text-base sm:text-xl font-heading font-black tracking-wider sm:tracking-widest text-white leading-none">
              <span>PREMIUM</span>
              <span className="text-yellow">GYM</span>
              <span className="hidden xs:inline-block text-purple-light text-[10px] sm:text-xs font-bold px-1 sm:px-1.5 py-0.5 rounded bg-purple/40 border border-purple-light/40">
                CLUB
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] text-gray-400 font-light tracking-wider block mt-0.5 uppercase">
              Sistema de Puntos
            </span>
          </div>
        </button>

        {/* Right side actions */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Quick QR Visit Button (Desktop/Tablet) */}
          <button
            onClick={() => setShowQRScanner(true)}
            className="hidden sm:flex items-center gap-2 bg-purple hover:bg-yellow text-white hover:text-dark font-heading font-bold text-xs sm:text-sm px-3.5 py-2 uppercase tracking-wider rounded-xl border border-purple-light/40 transition-all duration-300 glow-button cursor-pointer"
            title="Simular escaneo QR en recepción"
          >
            <QrCode className="w-4 h-4" />
            <span>Simular Visita</span>
          </button>

          {/* Points Badge */}
          <button
            onClick={() => setActiveTab('mis-puntos')}
            className="flex items-center gap-1.5 bg-[#222630] hover:border-yellow border border-purple/40 rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 transition-all duration-300 group cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow group-hover:scale-110 transition-transform" />
            <div className="flex items-baseline gap-0.5">
              <span className="font-heading font-black text-yellow text-xs sm:text-base">
                {currentUser.points.toLocaleString()}
              </span>
              <span className="text-[9px] sm:text-[10px] text-gray-300 uppercase font-semibold">pts</span>
            </div>
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowDemoMenu(false);
              }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#222630] border border-purple/30 flex items-center justify-center text-gray-300 hover:text-yellow hover:border-yellow/50 transition-all relative cursor-pointer"
              title="Notificaciones"
            >
              <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-yellow animate-ping"></span>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-yellow"></span>
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-72 sm:w-80 bg-[#222630] border border-purple/40 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center border-b border-purple/30 pb-2 mb-3">
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow" /> Notificaciones
                  </h4>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  <div className="bg-[#16181E] p-2.5 rounded-xl border border-purple/20 text-xs">
                    <div className="font-semibold text-white flex justify-between">
                      <span>¡Bono de Bienvenida Activo!</span>
                      <span className="text-[10px] text-gray-400">Hoy</span>
                    </div>
                    <p className="text-gray-300 text-[11px] mt-1 font-light">
                      Recuerda que cada visita al gimnasio te otorga 1 punto acumulable.
                    </p>
                  </div>
                  <div className="bg-[#16181E] p-2.5 rounded-lg border border-yellow/20 text-xs">
                    <div className="font-semibold text-yellow flex justify-between">
                      <span>Nivel {currentUser.tier}</span>
                      <span className="text-[10px] text-gray-400">Actual</span>
                    </div>
                    <p className="text-gray-300 text-[11px] mt-1 font-light">
                      Estás en el puesto #{currentUser.rank} del ranking con {currentUser.points} puntos.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Demo Menu Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setShowDemoMenu(!showDemoMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-1.5 bg-[#222630] hover:border-purple-light border border-purple/40 rounded-full p-1 sm:pr-3 transition-all cursor-pointer"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-yellow/60"
              />
              <span className="hidden md:inline font-heading font-semibold text-xs text-white max-w-[90px] truncate">
                {currentUser.name}
              </span>
            </button>

            {/* Demo Menu Dropdown */}
            {showDemoMenu && (
              <div className="absolute right-0 mt-3 w-64 max-w-[calc(100vw-2rem)] bg-[#222630] border border-purple/40 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="px-2 py-1.5 border-b border-purple/30 mb-2 flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-white">{currentUser.name}</p>
                    <p className="text-[10px] text-gray-400 truncate max-w-[170px]">{currentUser.email}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-yellow bg-purple/40 px-2 py-0.5 rounded-full border border-purple-light/30">
                        Nivel {currentUser.tier}
                      </span>
                      <span className="text-[10px] text-gray-400">Puesto #{currentUser.rank}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDemoMenu(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
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
                        className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
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
                        {user.id === currentUser.id && <UserCheck className="w-3.5 h-3.5 text-yellow shrink-0" />}
                        <span className="text-[10px] text-yellow font-mono shrink-0">{user.points} pts</span>
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
                    className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors text-left cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                    <span>Restablecer Demostración</span>
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setShowDemoMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 shrink-0" />
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
