import React from 'react';
import { useApp } from '../context/AppContext';
import { TIER_CONFIGS } from '../data/mockData';
import { 
  Award, 
  Flame, 
  QrCode, 
  Gift, 
  Trophy, 
  TrendingUp, 
  ChevronRight, 
  ShieldAlert,
  Zap
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    currentUser, 
    setActiveTab, 
    setShowQRScanner, 
    transactions, 
    rewards 
  } = useApp();

  if (!currentUser) return null;

  // Calculate tier info & progress to next tier
  const currentTierConfig = TIER_CONFIGS.find((t) => t.name === currentUser.tier) || TIER_CONFIGS[0];
  const nextTierIndex = TIER_CONFIGS.findIndex((t) => t.name === currentUser.tier) + 1;
  const nextTierConfig = TIER_CONFIGS[nextTierIndex] || null;

  let progressPercent = 100;
  let pointsNeededForNext = 0;

  if (nextTierConfig) {
    const currentTierBase = currentTierConfig.minPoints;
    const targetPoints = nextTierConfig.minPoints;
    const earnedInCurrentTier = Math.max(0, currentUser.points - currentTierBase);
    const tierRange = targetPoints - currentTierBase;
    progressPercent = Math.min(100, Math.round((earnedInCurrentTier / tierRange) * 100));
    pointsNeededForNext = Math.max(0, targetPoints - currentUser.points);
  }

  // Count redeemed rewards count
  const redeemedCount = transactions.filter((t) => t.type === 'reward').length;
  const popularRewards = rewards.filter((r) => r.isPopular).slice(0, 3);

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300">
      {/* Top Banner Greeting */}
      <div className="bg-[#222630] border border-purple/40 rounded-2xl p-4 sm:p-6 md:p-8 relative overflow-hidden shadow-[0_0_30px_rgba(107,0,156,0.15)]">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center md:items-center gap-4 sm:gap-6 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-yellow shadow-[0_0_20px_rgba(245,184,0,0.3)] shrink-0"
            />
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-black text-white uppercase">
                  ¡Hola, <span className="text-yellow">{currentUser.name.split(' ')[0]}</span>! 👋
                </h2>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm font-light mt-0.5">
                Bienvenido a tu club de beneficios en <span className="text-white font-semibold">Premium Gym</span>.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2.5">
                <span className={`text-[11px] sm:text-xs font-bold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border ${currentTierConfig.badgeColor}`}>
                  Nivel {currentUser.tier}
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-gray-300 bg-[#16181E] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-purple/30">
                  Ranking #{currentUser.rank}
                </span>
              </div>
            </div>
          </div>

          {/* Quick QR Visit CTA button */}
          <button
            onClick={() => setShowQRScanner(true)}
            className="w-full md:w-auto bg-purple hover:bg-yellow text-white hover:text-dark font-heading font-bold text-xs sm:text-sm px-5 py-3 sm:px-6 sm:py-3.5 uppercase tracking-wider rounded-xl border border-purple-light/40 shadow-lg hover:shadow-[0_0_25px_rgba(245,184,0,0.5)] transition-all duration-300 flex items-center justify-center gap-2 glow-button cursor-pointer shrink-0"
          >
            <QrCode className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Simular Visita con QR (+1 pt)</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Points Card & Level Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* TUS PUNTOS CARD */}
        <div className="bg-[#222630] border-2 border-yellow rounded-2xl p-5 sm:p-6 md:p-8 shadow-[0_0_30px_rgba(245,184,0,0.15)] relative overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow/10 rounded-full blur-2xl pointer-events-none"></div>
          <div>
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <span className="text-[10px] sm:text-xs font-heading font-bold text-yellow uppercase tracking-widest bg-purple/40 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-yellow/40">
                TUS PUNTOS
              </span>
              <Award className="w-7 h-7 sm:w-8 sm:h-8 text-yellow animate-pulse-subtle" />
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-yellow glow-text">
                {currentUser.points.toLocaleString()}
              </span>
              <span className="text-base sm:text-lg font-heading font-bold text-gray-300 uppercase">puntos</span>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 font-light flex items-center gap-2">
              <Flame className="w-4 h-4 text-yellow shrink-0" />
              <span>Sigue entrenando. Cada visita cuenta.</span>
            </p>
          </div>

          <div className="mt-5 sm:mt-6 pt-4 border-t border-yellow/20 flex gap-2.5 sm:gap-3">
            <button
              onClick={() => setActiveTab('recompensas')}
              className="flex-1 bg-yellow text-dark font-heading font-bold text-xs sm:text-sm py-2.5 sm:py-3 px-3 sm:px-4 uppercase tracking-wider rounded-xl hover:bg-yellow-light transition-all shadow-[0_0_15px_rgba(245,184,0,0.4)] text-center cursor-pointer"
            >
              Canjear Puntos
            </button>
            <button
              onClick={() => setActiveTab('mis-puntos')}
              className="bg-[#16181E] text-gray-300 hover:text-white font-heading font-bold text-xs py-2.5 sm:py-3 px-3 sm:px-4 uppercase tracking-wider rounded-xl border border-purple/40 hover:border-yellow transition-all text-center cursor-pointer shrink-0"
            >
              Detalles
            </button>
          </div>
        </div>

        {/* MI NIVEL CARD */}
        <div className="bg-[#222630] border border-purple/40 rounded-2xl p-5 sm:p-6 md:p-8 shadow-[0_0_20px_rgba(107,0,156,0.15)] flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
          <div>
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <span className="text-[10px] sm:text-xs font-heading font-bold text-purple-light uppercase tracking-widest bg-purple/30 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-purple-light/30">
                NIVEL ACTUAL DE CLUB
              </span>
              <ShieldAlert className="w-6 h-6 sm:w-7 sm:h-7 text-purple-light" />
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-black text-white uppercase mb-1 flex items-center gap-2">
              <span>Nivel</span>
              <span className={currentTierConfig.textColor}>{currentUser.tier}</span>
            </h3>

            <p className="text-xs text-gray-300 font-light mb-4 sm:mb-6">
              {currentTierConfig.description}
            </p>

            {/* Level Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-gray-400">Progreso de Nivel</span>
                <span className="text-yellow font-mono">{progressPercent}%</span>
              </div>
              <div className="w-full bg-[#16181E] h-2.5 sm:h-3 rounded-full overflow-hidden p-0.5 border border-purple/30">
                <div
                  className="bg-gradient-to-r from-purple via-purple-light to-yellow h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(245,184,0,0.5)]"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] sm:text-[11px] text-gray-400 pt-0.5">
                <span>{currentTierConfig.minPoints} pts</span>
                {nextTierConfig ? (
                  <span>
                    Faltan <strong className="text-yellow font-mono">{pointsNeededForNext} pts</strong> para Nivel {nextTierConfig.name}
                  </span>
                ) : (
                  <span className="text-purple-light font-bold">¡Nivel Máximo Élite Alcanzado!</span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-purple/30">
            <button
              onClick={() => setActiveTab('niveles')}
              className="w-full flex items-center justify-center gap-2 text-xs font-heading font-bold text-purple-light hover:text-yellow transition-colors uppercase tracking-wider py-1.5 cursor-pointer"
            >
              <span>Ver Beneficios de Nivel</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats 4-Grid Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Visitas Registradas */}
        <div className="bg-[#222630] border border-purple/30 rounded-xl p-3.5 sm:p-5 hover:border-yellow transition-all">
          <div className="flex justify-between items-center mb-1.5 sm:mb-2">
            <span className="text-[10px] sm:text-[11px] font-heading font-bold text-gray-400 uppercase">Visitas</span>
            <QrCode className="w-4 h-4 sm:w-5 sm:h-5 text-yellow" />
          </div>
          <div className="text-xl sm:text-3xl font-heading font-black text-white">
            {currentUser.visitsCount}
          </div>
          <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5">Visitas en gimnasio</p>
        </div>

        {/* Puntos Acumulados */}
        <div className="bg-[#222630] border border-purple/30 rounded-xl p-3.5 sm:p-5 hover:border-yellow transition-all">
          <div className="flex justify-between items-center mb-1.5 sm:mb-2">
            <span className="text-[10px] sm:text-[11px] font-heading font-bold text-gray-400 uppercase">Acumulados</span>
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-light" />
          </div>
          <div className="text-xl sm:text-3xl font-heading font-black text-white">
            {currentUser.totalEarned.toLocaleString()}
          </div>
          <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5">Puntos ganados</p>
        </div>

        {/* Recompensas Canjeadas */}
        <div className="bg-[#222630] border border-purple/30 rounded-xl p-3.5 sm:p-5 hover:border-yellow transition-all">
          <div className="flex justify-between items-center mb-1.5 sm:mb-2">
            <span className="text-[10px] sm:text-[11px] font-heading font-bold text-gray-400 uppercase">Canjeados</span>
            <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-yellow" />
          </div>
          <div className="text-xl sm:text-3xl font-heading font-black text-white">
            {redeemedCount}
          </div>
          <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5">Premios canjeados</p>
        </div>

        {/* Posición Ranking */}
        <div className="bg-[#222630] border border-purple/30 rounded-xl p-3.5 sm:p-5 hover:border-yellow transition-all">
          <div className="flex justify-between items-center mb-1.5 sm:mb-2">
            <span className="text-[10px] sm:text-[11px] font-heading font-bold text-gray-400 uppercase">Ranking</span>
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow" />
          </div>
          <div className="text-xl sm:text-3xl font-heading font-black text-yellow">
            #{currentUser.rank}
          </div>
          <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5">Puesto en el club</p>
        </div>
      </div>

      {/* Featured Motivational Callout */}
      <div className="bg-gradient-to-r from-[#6B009C]/40 via-[#222630] to-[#6B009C]/30 border border-purple/50 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-[0_0_25px_rgba(107,0,156,0.2)]">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-yellow/20 border border-yellow/50 flex items-center justify-center text-yellow shrink-0">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-heading font-black text-white uppercase">
              Tu constancia tiene recompensa
            </h4>
            <p className="text-xs text-gray-300 font-light mt-0.5">
              Revisa los productos, indumentaria y descuentos en mensualidades disponibles para ti hoy.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('recompensas')}
          className="w-full sm:w-auto bg-yellow hover:bg-yellow-light text-dark font-heading font-bold text-xs sm:text-sm px-5 py-3 uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(245,184,0,0.4)] transition-all cursor-pointer whitespace-nowrap"
        >
          Explorar Catálogo
        </button>
      </div>

      {/* Popular Rewards Quick Preview */}
      <div className="bg-[#222630] border border-purple/40 rounded-2xl p-4 sm:p-6">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <div>
            <h3 className="text-lg sm:text-xl font-heading font-black text-white uppercase">
              Recompensas Populares
            </h3>
            <p className="text-xs text-gray-400 font-light">
              Las más canjeadas por los miembros del club esta semana.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('recompensas')}
            className="text-xs font-heading font-bold text-yellow hover:underline flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>Ver Todas</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {popularRewards.map((reward) => (
            <div
              key={reward.id}
              className="bg-[#16181E] border border-purple/30 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between hover:border-yellow transition-all group"
            >
              <div>
                <div className="relative h-28 sm:h-32 rounded-lg overflow-hidden mb-3">
                  <img
                    src={reward.image}
                    alt={reward.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-purple text-yellow text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-light/30 uppercase">
                    {reward.badge}
                  </span>
                </div>

                <h4 className="font-heading font-bold text-white text-xs sm:text-sm line-clamp-1">
                  {reward.title}
                </h4>
                <p className="text-gray-400 text-xs mt-1 line-clamp-2 font-light">
                  {reward.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-purple/20 flex items-center justify-between">
                <span className="font-heading font-black text-yellow text-sm sm:text-base">
                  {reward.pointsCost} <span className="text-xs font-normal">pts</span>
                </span>
                <button
                  onClick={() => setActiveTab('recompensas')}
                  className="text-xs font-heading font-bold text-purple-light hover:text-white underline cursor-pointer"
                >
                  Canjear
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
