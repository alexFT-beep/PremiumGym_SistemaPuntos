import React from 'react';
import { useApp } from '../context/AppContext';
import { QrCode, Calendar, MapPin, CheckCircle2, Clock, Award } from 'lucide-react';

export const MisVisitasView: React.FC = () => {
  const { visits, currentUser, setShowQRScanner } = useApp();

  if (!currentUser) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-purple/30 pb-4">
        <div>
          <h2 className="text-3xl font-heading font-black text-white uppercase tracking-tight flex items-center gap-3">
            <span>MIS <span className="text-yellow">VISITAS</span></span>
            <QrCode className="w-8 h-8 text-yellow" />
          </h2>
          <p className="text-xs text-gray-300 font-light mt-1">
            Registro cronológico de tus entrenamientos asistidos en Premium Gym.
          </p>
        </div>

        <button
          onClick={() => setShowQRScanner(true)}
          className="bg-purple hover:bg-yellow text-white hover:text-dark font-heading font-bold text-xs px-5 py-2.5 uppercase tracking-wider rounded-xl border border-purple-light/40 transition-all flex items-center gap-2 glow-button cursor-pointer"
        >
          <QrCode className="w-4 h-4" />
          <span>Simular Visita con QR</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#222630] border border-purple/40 rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-heading font-bold text-gray-400 uppercase">Total Visitas</span>
            <QrCode className="w-6 h-6 text-yellow" />
          </div>
          <div className="text-4xl font-heading font-black text-white my-2">
            {currentUser.visitsCount} <span className="text-xs font-normal text-gray-400">visitas</span>
          </div>
          <p className="text-xs text-gray-300 font-light">
            Días de entrenamiento acumulados en el gimnasio.
          </p>
        </div>

        <div className="bg-[#222630] border border-purple/40 rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-heading font-bold text-gray-400 uppercase">Puntos por Visitas</span>
            <Award className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="text-4xl font-heading font-black text-emerald-400 my-2">
            +{currentUser.visitsCount} <span className="text-xs font-normal text-gray-400">pts</span>
          </div>
          <p className="text-xs text-gray-300 font-light">
            1 punto otorgado por cada día de escaneo QR.
          </p>
        </div>

        <div className="bg-[#222630] border border-purple/40 rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-heading font-bold text-gray-400 uppercase">Última Asistencia</span>
            <Calendar className="w-6 h-6 text-purple-light" />
          </div>
          <div className="text-2xl font-heading font-black text-yellow my-2">
            {currentUser.lastVisitDate || 'Hoy'}
          </div>
          <p className="text-xs text-gray-300 font-light">
            Sede Calle Aija - Huarmey.
          </p>
        </div>
      </div>

      {/* Visits Timeline List */}
      <div className="bg-[#222630] border border-purple/40 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-purple/30 flex justify-between items-center bg-[#16181E]/60">
          <h3 className="font-heading font-bold text-white text-sm uppercase flex items-center gap-2">
            <Calendar className="w-4 h-4 text-yellow" />
            Historial de Entrenamientos
          </h3>
          <span className="text-xs text-gray-400">{visits.length} asistencias</span>
        </div>

        {visits.length === 0 ? (
          <div className="p-12 text-center">
            <QrCode className="w-12 h-12 text-purple-light mx-auto mb-3 opacity-50" />
            <h4 className="font-heading font-bold text-white text-base">No hay visitas registradas aún</h4>
            <p className="text-xs text-gray-400 mt-1">
              Presiona el botón «Simular Visita con QR» para registrar tu primer entrenamiento.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-purple/20">
            {visits.map((vis) => (
              <div
                key={vis.id}
                className="p-4 flex items-center justify-between gap-4 hover:bg-[#16181E]/50 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-white text-sm">
                      Visita Confirmada (+1 pt)
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-[11px] text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-purple-light" />
                        {vis.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-purple-light" />
                        {vis.time}
                      </span>
                      <span className="flex items-center gap-1 text-gray-300">
                        <MapPin className="w-3 h-3 text-yellow" />
                        {vis.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-heading font-black text-emerald-400 text-base">
                    +{vis.pointsEarned} pt
                  </span>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold text-emerald-500">
                    Válido
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
