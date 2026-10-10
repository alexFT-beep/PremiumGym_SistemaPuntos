import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastNotice: React.FC = () => {
  const { toast, hideToast } = useApp();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-6 h-6 text-yellow shrink-0" />;
      case 'error':
        return <AlertCircle className="w-6 h-6 text-red-400 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />;
      default:
        return <Info className="w-6 h-6 text-purple-light shrink-0" />;
    }
  };

  const getBorder = () => {
    switch (toast.type) {
      case 'success':
        return 'border-yellow/60 shadow-[0_0_20px_rgba(245,184,0,0.3)]';
      case 'error':
        return 'border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.3)]';
      case 'warning':
        return 'border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.3)]';
      default:
        return 'border-purple/60 shadow-[0_0_20px_rgba(107,0,156,0.3)]';
    }
  };

  return (
    <div className="fixed top-5 right-5 z-[200] max-w-sm w-full px-4 animate-in fade-in slide-in-from-top-5 duration-300">
      <div className={`bg-[#222630] border ${getBorder()} rounded-xl p-4 flex items-start gap-3 backdrop-blur-md`}>
        {getIcon()}
        <div className="flex-1 pr-2">
          <h4 className="font-heading font-bold text-white text-sm tracking-wide">{toast.title}</h4>
          <p className="text-gray-300 text-xs mt-1 leading-relaxed font-light">{toast.message}</p>
        </div>
        <button
          onClick={hideToast}
          className="text-gray-400 hover:text-white transition-colors p-1"
          aria-label="Cerrar notificación"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
