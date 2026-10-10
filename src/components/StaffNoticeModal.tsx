import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, X, Info, Lock } from 'lucide-react';

export const StaffNoticeModal: React.FC = () => {
  const { showStaffModal, setShowStaffModal } = useApp();

  if (!showStaffModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#222630] border-2 border-purple-light rounded-2xl max-w-md w-full p-6 shadow-[0_0_50px_rgba(168,85,247,0.3)] relative text-center">
        <button
          onClick={() => setShowStaffModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-full bg-purple/40 border-2 border-purple-light flex items-center justify-center text-purple-light mx-auto mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-heading font-black text-white uppercase mb-2">
          Portal de Personal Autorizado
        </h3>

        <div className="bg-[#16181E] border border-purple/30 p-4 rounded-xl text-left text-xs text-gray-300 space-y-3 mb-6">
          <div className="flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-yellow shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-semibold block">Próxima Fase 2</strong>
              El módulo de administración para recepción, asignación de puntos manuales, validación de membresías y reportes del gimnasio se integrará en la fase de backend.
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Info className="w-4 h-4 text-purple-light shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-semibold block">Modo Demostración Actual</strong>
              Por ahora, puedes explorar el sistema completo desde la perspectiva del cliente ingresando en el modo demo.
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowStaffModal(false)}
          className="w-full bg-purple hover:bg-yellow text-white hover:text-dark font-heading font-bold text-xs py-3.5 rounded-xl uppercase tracking-wider transition-all cursor-pointer glow-button"
        >
          Entendido, Volver
        </button>
      </div>
    </div>
  );
};
