import React from 'react';
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
  User 
} from 'lucide-react';

interface NavItem {
  id: ActiveTab;
  label: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Inicio', icon: Home },
  { id: 'mis-puntos', label: 'Mis Puntos', icon: Award },
  { id: 'historial', label: 'Historial', icon: History },
  { id: 'recompensas', label: 'Recompensas', icon: Gift },
  { id: 'ranking', label: 'Ranking', icon: Trophy },
  { id: 'niveles', label: 'Mi Nivel', icon: ShieldAlert },
  { id: 'visitas', label: 'Mis Visitas', icon: QrCode },
  { id: 'perfil', label: 'Mi Perfil', icon: User },
];

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, currentUser } = useApp();

  if (!currentUser) return null;

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
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs lg:text-sm font-heading font-semibold transition-all duration-300 cursor-pointer ${
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
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0E1014]/95 backdrop-blur-md border-t border-purple/40 px-2 py-2">
        <div className="flex justify-around items-center">
          {NAV_ITEMS.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'text-yellow scale-110'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-yellow glow-text' : 'text-gray-400'}`} />
                <span className="text-[10px] font-heading font-medium tracking-tight">
                  {item.label}
                </span>
              </button>
            );
          })}
          {/* Mobile "Más" button */}
          <button
            onClick={() => setActiveTab('perfil')}
            className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              activeTab === 'perfil' || activeTab === 'niveles' || activeTab === 'visitas'
                ? 'text-yellow scale-110'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <User className={`w-5 h-5 ${activeTab === 'perfil' ? 'text-yellow' : 'text-gray-400'}`} />
            <span className="text-[10px] font-heading font-medium tracking-tight">Perfil</span>
          </button>
        </div>
      </nav>
    </>
  );
};
