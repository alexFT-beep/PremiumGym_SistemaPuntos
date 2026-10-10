import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Award, 
  TrendingUp, 
  Gift, 
  QrCode, 
  HelpCircle, 
  ChevronRight, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownLeft
} from 'lucide-react';

export const MisPuntosView: React.FC = () => {
  const { currentUser, transactions, setActiveTab, setShowQRScanner } = useApp();

  if (!currentUser) return null;

  const recentTxs = transactions.slice(0, 5);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-purple/30 pb-4">
        <div>
          <h2 className="text-3xl font-heading font-black text-white uppercase tracking-tight flex items-center gap-3">
            <span>MIS <span className="text-yellow">PUNTOS</span></span>
            <Award className="w-8 h-8 text-yellow" />
          </h2>
          <p className="text-xs text-gray-300 font-light mt-1">
            Consulta tu saldo disponible, resumen de acumulación y reglas del programa de beneficios.
          </p>
        </div>

        <button
          onClick={() => setShowQRScanner(true)}
          className="bg-purple hover:bg-yellow text-white hover:text-dark font-heading font-bold text-xs px-5 py-2.5 uppercase tracking-wider rounded-xl border border-purple-light/40 transition-all flex items-center gap-2 glow-button cursor-pointer"
        >
          <QrCode className="w-4 h-4" />
          <span>Sumar +1 Punto con QR</span>
        </button>
      </div>

      {/* Main Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Actual */}
        <div className="bg-[#222630] border-2 border-yellow rounded-2xl p-6 shadow-[0_0_30px_rgba(245,184,0,0.15)] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-heading font-bold text-yellow uppercase tracking-widest bg-purple/40 px-3 py-1 rounded-full border border-yellow/40">
                SALDO DISPONIBLE
              </span>
              <Award className="w-6 h-6 text-yellow" />
            </div>
            <div className="text-5xl font-heading font-black text-yellow glow-text my-2">
              {currentUser.points.toLocaleString()}
            </div>
            <p className="text-xs text-gray-300 font-light">
              Puntos listos para canjear en el catálogo oficial.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('recompensas')}
            className="mt-6 w-full bg-yellow hover:bg-yellow-light text-dark font-heading font-bold text-xs py-3 px-4 uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(245,184,0,0.4)] cursor-pointer text-center"
          >
            Ir al Catálogo de Recompensas
          </button>
        </div>

        {/* Total Ganados */}
        <div className="bg-[#222630] border border-purple/40 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-heading font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/30">
                TOTAL ACUMULADO
              </span>
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="text-4xl font-heading font-black text-white my-2">
              +{currentUser.totalEarned.toLocaleString()} <span className="text-xs text-gray-400">pts</span>
            </div>
            <p className="text-xs text-gray-300 font-light">
              Puntos generados desde tu registro en el club ({currentUser.joinDate}).
            </p>
          </div>

          <div className="mt-6 pt-3 border-t border-purple/20 text-xs text-gray-400 flex justify-between items-center">
            <span>Visitas registradas:</span>
            <span className="font-bold text-white font-mono">{currentUser.visitsCount} visitas</span>
          </div>
        </div>

        {/* Total Canjeados */}
        <div className="bg-[#222630] border border-purple/40 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-heading font-bold text-purple-light uppercase tracking-widest bg-purple/30 px-3 py-1 rounded-full border border-purple-light/30">
                TOTAL UTILIZADO
              </span>
              <Gift className="w-6 h-6 text-purple-light" />
            </div>
            <div className="text-4xl font-heading font-black text-white my-2">
              -{currentUser.totalSpent.toLocaleString()} <span className="text-xs text-gray-400">pts</span>
            </div>
            <p className="text-xs text-gray-300 font-light">
              Puntos canjeados en descuentos y productos del gimnasio.
            </p>
          </div>

          <div className="mt-6 pt-3 border-t border-purple/20 text-xs text-gray-400 flex justify-between items-center">
            <span>Nivel actual:</span>
            <span className="font-bold text-yellow">Nivel {currentUser.tier}</span>
          </div>
        </div>
      </div>

      {/* Program Rules & Points Calculation */}
      <div className="bg-[#222630] border border-purple/40 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="w-6 h-6 text-yellow shrink-0" />
          <div>
            <h3 className="text-lg font-heading font-black text-white uppercase">
              ¿Cómo funciona el Sistema de Puntos?
            </h3>
            <p className="text-xs text-gray-400 font-light">
              Reglas simples para acumular y disfrutar de tus beneficios en Premium Gym.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#16181E] border border-purple/30 p-4 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-yellow/20 border border-yellow/40 flex items-center justify-center text-yellow font-bold text-sm mb-3">
              1
            </div>
            <h4 className="font-heading font-bold text-white text-sm">Escanea tu Visita Diario</h4>
            <p className="text-xs text-gray-300 font-light mt-1">
              Al ingresar a la sede, valida tu código QR en recepción o simula tu asistencia desde la app. Sumas <strong className="text-yellow">+1 punto</strong> por cada jornada de entrenamiento.
            </p>
          </div>

          <div className="bg-[#16181E] border border-purple/30 p-4 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-purple/30 border border-purple-light/40 flex items-center justify-center text-purple-light font-bold text-sm mb-3">
              2
            </div>
            <h4 className="font-heading font-bold text-white text-sm">Renueva tu Membresía</h4>
            <p className="text-xs text-gray-300 font-light mt-1">
              Recibe <strong className="text-yellow">+50 puntos directos</strong> cada vez que renueves tu plan mensual de Máquinas, Pesas o Boxeo.
            </p>
          </div>

          <div className="bg-[#16181E] border border-purple/30 p-4 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm mb-3">
              3
            </div>
            <h4 className="font-heading font-bold text-white text-sm">Canjea en el Catálogo</h4>
            <p className="text-xs text-gray-300 font-light mt-1">
              Utiliza tus puntos acumulados para obtener descuentos en la mensualidad, mensualidades gratis, indumentaria oficial o suplementos.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Movements Preview */}
      <div className="bg-[#222630] border border-purple/40 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-heading font-black text-white uppercase">
              Últimos Movimientos
            </h3>
            <p className="text-xs text-gray-400 font-light">
              Visualiza tus puntos ganados y utilizados recientemente.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('historial')}
            className="text-xs font-heading font-bold text-yellow hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Ver Historial Completo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          {recentTxs.map((tx) => {
            const isEarned = tx.points > 0;
            return (
              <div
                key={tx.id}
                className="bg-[#16181E] border border-purple/20 p-3 rounded-xl flex items-center justify-between hover:border-purple/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                      isEarned
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-purple/30 text-purple-light border border-purple/40'
                    }`}
                  >
                    {isEarned ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-white text-xs">{tx.description}</h4>
                    <p className="text-[10px] text-gray-400 flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-purple-light" />
                        {tx.date} - {tx.time}
                      </span>
                      <span>•</span>
                      <span className="text-yellow">{tx.category}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`font-heading font-black text-sm block ${
                      isEarned ? 'text-emerald-400' : 'text-purple-light'
                    }`}
                  >
                    {isEarned ? `+${tx.points}` : tx.points} pts
                  </span>
                  <span className="text-[10px] text-gray-400">Saldo: {tx.balanceAfter} pts</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
