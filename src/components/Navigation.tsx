import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { ActiveTab } from '../types';
import { 
  Home, 
  Award, 
  History, 
  Gift, 
  Trophy, 
  ShieldAlert, 
  QrCode, 
  User,
  Grid,
  X,
  ChevronRight
} from 'lucide-react';

interface NavItem {
  id: ActiveTab;
  label: string;
  icon: React.ElementType;
  desc?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Inicio', icon: Home, desc: 'Panel principal y resumen de beneficios' },
  { id: 'mis-puntos', label: 'Mis Puntos', icon: Award, desc: 'Saldo, reglas y cómo ganar más puntos' },
  { id: 'recompensas', label: 'Recompensas', icon: Gift, desc: 'Catálogo de descuentos e indumentaria' },
  { id: 'ranking', label: 'Ranking', icon: Trophy, desc: 'Clasificación oficial de la comunidad' },
  { id: 'visitas', label: 'Mis Visitas', icon: QrCode, desc: 'Historial de asistencias y escaneo QR' },
  { id: 'historial', label: 'Historial', icon: History, desc: 'Registro de ingresos y canjes' },
  { id: 'niveles', label: 'Mi Nivel', icon: ShieldAlert, desc: 'Escala de fidelidad Bronce, Plata, Oro, Élite' },
  { id: 'perfil', label: 'Mi Perfil', icon: User, desc: 'Datos del cliente y configuración' },
];

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, currentUser } = useApp();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  if (!currentUser) return null;

  const primaryMobileItems = NAV_ITEMS.slice(0, 4);

  return (
    <>
      {/* Desktop Navigation Bar */}
      <nav className="hidden md:block bg-[#0E1014] border-b border-purple/30 py-2.5 px-4 sticky top-[65px] z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-1 lg:gap-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs lg:text-sm font-heading font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-purple text-yellow border border-yellow/50 shadow-[0_0_15px_rgba(107,0,156,0.5)] scale-105'
                    : 'text-gray-300 hover:text-white hover:bg-[#222630]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-yellow' : 'text-purple-light'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0E1014]/95 backdrop-blur-md border-t border-purple/40 px-2 py-1.5 shadow-[0_-10px_25px_rgba(0,0,0,0.5)]">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {primaryMobileItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setShowMobileMenu(false);
                }}
                className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'text-yellow scale-105'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-yellow glow-text' : 'text-gray-400'}`} />
                <span className="text-[10px] font-heading font-semibold tracking-tight">
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* Mobile "Más Secciones" Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all cursor-pointer ${
              showMobileMenu || ['visitas', 'historial', 'niveles', 'perfil'].includes(activeTab)
                ? 'text-yellow scale-105'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Grid className={`w-5 h-5 ${showMobileMenu ? 'text-yellow' : 'text-purple-light'}`} />
            <span className="text-[10px] font-heading font-semibold tracking-tight">Menú</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Bottom Sheet Drawer */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 flex flex-col justify-end">
          <div className="bg-[#222630] border-t-2 border-yellow rounded-t-3xl p-5 shadow-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center pb-3 border-b border-purple/30 mb-4">
              <div className="flex items-center gap-2">
                <Grid className="w-5 h-5 text-yellow" />
                <h3 className="font-heading font-black text-white text-base uppercase">
                  Todas las Secciones del Club
                </h3>
              </div>
              <button
                onClick={() => setShowMobileMenu(false)}
                className="w-8 h-8 rounded-full bg-[#16181E] text-gray-400 hover:text-white flex items-center justify-center border border-purple/30"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setShowMobileMenu(false);
                    }}
                    className={`flex items-center gap-3.5 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-purple/40 border-yellow text-white shadow-[0_0_15px_rgba(245,184,0,0.2)]'
                        : 'bg-[#16181E] border-purple/20 text-gray-300 hover:border-purple/50'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive
                          ? 'bg-yellow text-dark font-bold shadow'
                          : 'bg-[#222630] text-purple-light border border-purple/30'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-heading font-bold text-sm text-white flex items-center justify-between">
                        <span>{item.label}</span>
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      </div>
                      <p className="text-[11px] text-gray-400 font-light truncate">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
