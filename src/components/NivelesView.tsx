import React from 'react';
import { useApp } from '../context/AppContext';
import { TIER_CONFIGS } from '../data/mockData';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Award, 
  Crown, 
  CheckCircle2, 
  Lock, 
  Zap,
  Sparkles
} from 'lucide-react';

export const NivelesView: React.FC = () => {
  const { currentUser } = useApp();

  if (!currentUser) return null;

  const currentTierConfig = TIER_CONFIGS.find((t) => t.name === currentUser.tier) || TIER_CONFIGS[0];

  const getTierIcon = (iconName: string, isCurrent: boolean) => {
    const className = `w-7 h-7 ${isCurrent ? 'text-yellow' : 'text-purple-light'}`;
    switch (iconName) {
      case 'Shield':
        return <ShieldAlert className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'Award':
        return <Award className={className} />;
      case 'Crown':
        return <Crown className={className} />;
      default:
        return <Award className={className} />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-purple/30 pb-4">
        <div>
          <h2 className="text-3xl font-heading font-black text-white uppercase tracking-tight flex items-center gap-3">
            <span>NIVELES DE <span className="text-yellow">FIDELIDAD</span></span>
            <ShieldAlert className="w-8 h-8 text-yellow" />
          </h2>
          <p className="text-xs text-gray-300 font-light mt-1">
            Conoce la escala de niveles del club, sus umbrales de puntos y beneficios exclusivos.
          </p>
        </div>

        <div className="bg-[#222630] border border-yellow/50 px-4 py-2 rounded-xl text-xs text-gray-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow" />
          <span>Tu Nivel: <strong className="text-yellow font-bold">Nivel {currentUser.tier}</strong> ({currentUser.points} pts)</span>
        </div>
      </div>

      {/* Current Level Status Overview */}
      <div className="bg-[#222630] border-2 border-purple/50 rounded-2xl p-6 shadow-[0_0_25px_rgba(107,0,156,0.2)]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-xs font-heading font-bold text-yellow uppercase tracking-widest bg-purple/40 px-3 py-1 rounded-full border border-yellow/40">
              ESTADO ACTUAL EN EL CLUB
            </span>
            <h3 className="text-2xl md:text-3xl font-heading font-black text-white uppercase mt-2">
              Atleta <span className="text-yellow">{currentUser.tier}</span>
            </h3>
            <p className="text-xs text-gray-300 font-light mt-1 max-w-xl">
              {currentTierConfig.description}
            </p>
          </div>

          <div className="bg-[#16181E] p-4 rounded-xl border border-purple/30 text-center min-w-[180px] shrink-0">
            <span className="text-[10px] text-gray-400 uppercase font-bold block">Puntos Acumulados</span>
            <span className="font-heading font-black text-yellow text-3xl glow-text">
              {currentUser.points.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Level Roadmap Grid */}
      <div className="space-y-6">
        {TIER_CONFIGS.map((tier) => {
          const isCurrentTier = tier.name === currentUser.tier;
          const isReached = currentUser.points >= tier.minPoints;

          return (
            <div
              key={tier.name}
              className={`bg-[#222630] border-2 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden ${
                isCurrentTier
                  ? 'border-yellow shadow-[0_0_30px_rgba(245,184,0,0.2)]'
                  : isReached
                  ? 'border-purple/40 opacity-90'
                  : 'border-purple/20 opacity-70'
              }`}
            >
              {/* Badge for Current Tier */}
              {isCurrentTier && (
                <div className="absolute top-0 right-0 bg-yellow text-dark font-heading font-black text-xs px-4 py-1.5 rounded-bl-xl uppercase tracking-widest shadow">
                  Nivel Actual
                </div>
              )}

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${
                      isCurrentTier
                        ? 'bg-purple/40 border-yellow text-yellow shadow-[0_0_15px_rgba(245,184,0,0.4)]'
                        : isReached
                        ? 'bg-[#16181E] border-purple/40 text-purple-light'
                        : 'bg-[#16181E] border-gray-700 text-gray-500'
                    }`}
                  >
                    {getTierIcon(tier.iconName, isCurrentTier)}
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-heading font-black text-white uppercase">
                        Nivel {tier.name}
                      </h3>
                      <span className={`text-xs font-bold px-3 py-0.5 rounded-full border ${tier.badgeColor}`}>
                        {tier.minPoints === 0 ? 'Desde 0 pts' : `Requiere ${tier.minPoints.toLocaleString()} pts`}
                      </span>
                    </div>

                    <p className="text-xs text-gray-300 font-light mt-1">
                      {tier.description}
                    </p>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="shrink-0">
                  {isCurrentTier ? (
                    <span className="inline-flex items-center gap-1.5 bg-yellow/20 text-yellow border border-yellow/50 px-4 py-2 rounded-xl font-heading font-bold text-xs uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4" /> En Curso
                    </span>
                  ) : isReached ? (
                    <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-4 py-2 rounded-xl font-heading font-bold text-xs uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4" /> Alcanzado
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 bg-[#16181E] text-gray-400 border border-purple/20 px-4 py-2 rounded-xl font-heading font-bold text-xs uppercase tracking-wider">
                      <Lock className="w-4 h-4 text-gray-500" /> Bloqueado
                    </span>
                  )}
                </div>
              </div>

              {/* Perks List */}
              <div className="mt-6 pt-4 border-t border-purple/20">
                <h4 className="text-xs font-heading font-bold text-yellow uppercase mb-3 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5" /> Beneficios del Nivel {tier.name}:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {tier.perks.map((perk, i) => (
                    <div
                      key={i}
                      className="bg-[#16181E] p-2.5 rounded-xl border border-purple/20 flex items-start gap-2 text-xs text-gray-300 font-light"
                    >
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isReached ? 'text-yellow' : 'text-gray-500'}`} />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
