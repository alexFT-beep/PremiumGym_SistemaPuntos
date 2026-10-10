import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { DashboardView } from './components/DashboardView';
import { MisPuntosView } from './components/MisPuntosView';
import { HistorialView } from './components/HistorialView';
import { RecompensasView } from './components/RecompensasView';
import { RankingView } from './components/RankingView';
import { NivelesView } from './components/NivelesView';
import { MisVisitasView } from './components/MisVisitasView';
import { PerfilView } from './components/PerfilView';
import { ToastNotice } from './components/ToastNotice';
import { QRScannerModal } from './components/QRScannerModal';
import { StaffNoticeModal } from './components/StaffNoticeModal';

const AppContent: React.FC = () => {
  const { currentUser, activeTab } = useApp();

  if (!currentUser) {
    return (
      <>
        <WelcomeScreen />
        <ToastNotice />
        <StaffNoticeModal />
      </>
    );
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'mis-puntos':
        return <MisPuntosView />;
      case 'historial':
        return <HistorialView />;
      case 'recompensas':
        return <RecompensasView />;
      case 'ranking':
        return <RankingView />;
      case 'niveles':
        return <NivelesView />;
      case 'visitas':
        return <MisVisitasView />;
      case 'perfil':
        return <PerfilView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#16181E] text-white selection:bg-[#6B009C] selection:text-white pb-20 md:pb-12">
      {/* Header */}
      <Header />

      {/* Navigation */}
      <Navigation />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6 md:py-8">
        {renderActiveView()}
      </main>

      {/* Footer */}
      <footer className="border-t border-purple/20 bg-[#0E1014] py-8 text-center text-xs text-gray-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              src="https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/PremiumGym_hy/logoPGcolorTransparente.webp"
              alt="Logo Premium Gym"
              className="w-6 h-6 object-contain"
            />
            <span className="font-heading font-black text-white">PREMIUM <span className="text-yellow">GYM</span> CLUB</span>
          </div>

          <p className="font-light">
            &copy; 2026 Premium Gym. Plataforma de Puntos y Fidelización.
          </p>

          <p className="text-[11px] text-gray-400">
            Diseñado para dominar • Modo Demostración
          </p>
        </div>
      </footer>

      {/* Global Modals & Notifications */}
      <ToastNotice />
      <QRScannerModal />
      <StaffNoticeModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
