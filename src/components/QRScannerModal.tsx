import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QrCode, X, CheckCircle2, AlertCircle, Camera } from 'lucide-react';

export const QRScannerModal: React.FC = () => {
  const { showQRScanner, setShowQRScanner, simulateVisit } = useApp();
  const [scanningState, setScanningState] = useState<'idle' | 'scanning' | 'success' | 'duplicate'>('idle');

  if (!showQRScanner) return null;

  const handleStartScan = () => {
    setScanningState('scanning');

    setTimeout(() => {
      const success = simulateVisit();
      if (success) {
        setScanningState('success');
      } else {
        setScanningState('duplicate');
      }
    }, 1800);
  };

  const handleClose = () => {
    setScanningState('idle');
    setShowQRScanner(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#222630] border-2 border-yellow rounded-2xl max-w-md w-full p-6 shadow-[0_0_50px_rgba(245,184,0,0.3)] relative text-center">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex justify-center mb-3">
          <span className="text-[10px] font-heading font-bold text-yellow bg-purple/40 px-3 py-1 rounded-full border border-yellow/40 uppercase">
            Simulador Frontend QR
          </span>
        </div>

        <h3 className="text-xl font-heading font-black text-white uppercase mb-1">
          Validación de Visita
        </h3>
        <p className="text-xs text-gray-300 font-light mb-6">
          Simula el escaneo del código QR oficial ubicado en la recepción de Premium Gym.
        </p>

        {/* Viewfinder / Camera Simulation area */}
        <div className="relative w-64 h-64 mx-auto mb-6 bg-[#0E1014] border-2 border-purple/60 rounded-2xl overflow-hidden flex items-center justify-center shadow-inner">
          {scanningState === 'idle' && (
            <div className="p-4 text-center">
              <QrCode className="w-20 h-20 text-yellow mx-auto mb-3 animate-pulse-subtle" />
              <p className="text-xs text-gray-300 font-light">
                Presiona «Escanear QR» para simular la llegada a la sede.
              </p>
            </div>
          )}

          {scanningState === 'scanning' && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Scanning laser line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-yellow shadow-[0_0_15px_#F5B800] animate-bounce"></div>
              <Camera className="w-16 h-16 text-purple-light animate-spin" />
              <span className="absolute bottom-4 text-xs font-heading font-bold text-yellow uppercase tracking-wider">
                Escaneando QR...
              </span>
            </div>
          )}

          {scanningState === 'success' && (
            <div className="p-4 text-center animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto mb-3">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-heading font-black text-white text-base uppercase">
                ¡Visita Validada!
              </h4>
              <span className="text-lg font-heading font-black text-yellow glow-text block mt-1">
                +1 PUNTO SUMADO
              </span>
            </div>
          )}

          {scanningState === 'duplicate' && (
            <div className="p-4 text-center animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-400 mx-auto mb-3">
                <AlertCircle className="w-10 h-10" />
              </div>
              <h4 className="font-heading font-bold text-white text-sm uppercase">
                Visita Ya Registrada
              </h4>
              <p className="text-xs text-gray-300 mt-1 font-light">
                Solo se permite 1 punto por jornada diaria. ¡Nos vemos mañana!
              </p>
            </div>
          )}

          {/* Corner Guides */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-yellow"></div>
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-yellow"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-yellow"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-yellow"></div>
        </div>

        {/* Action Buttons */}
        {scanningState === 'idle' && (
          <button
            onClick={handleStartScan}
            className="w-full bg-yellow hover:bg-yellow-light text-dark font-heading font-bold text-xs py-3.5 rounded-xl uppercase tracking-wider shadow-[0_0_20px_rgba(245,184,0,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Camera className="w-4 h-4" />
            <span>Simular Escaneo QR</span>
          </button>
        )}

        {scanningState === 'scanning' && (
          <button
            disabled
            className="w-full bg-purple/50 text-gray-400 font-heading font-bold text-xs py-3.5 rounded-xl uppercase tracking-wider cursor-wait"
          >
            Validando en Servidor...
          </button>
        )}

        {(scanningState === 'success' || scanningState === 'duplicate') && (
          <div className="flex gap-2">
            <button
              onClick={() => setScanningState('idle')}
              className="flex-1 bg-[#16181E] text-gray-300 font-heading font-bold text-xs py-3 rounded-xl border border-purple/30 hover:text-white cursor-pointer"
            >
              Simular Otra
            </button>
            <button
              onClick={handleClose}
              className="flex-1 bg-yellow text-dark font-heading font-bold text-xs py-3 rounded-xl uppercase tracking-wider cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
