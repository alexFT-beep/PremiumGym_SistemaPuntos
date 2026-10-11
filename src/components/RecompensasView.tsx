import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Reward } from '../types';
import { 
  Gift, 
  Tag, 
  Package, 
  Award, 
  CheckCircle2, 
  RotateCcw, 
  X,
  Info
} from 'lucide-react';

export const RecompensasView: React.FC = () => {
  const { rewards, currentUser, redeemReward, resetDemoData } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [isConfirming, setIsConfirming] = useState<boolean>(false);

  if (!currentUser) return null;

  const filteredRewards = rewards.filter((r) => {
    if (selectedCategory === 'descuento') return r.category === 'descuento';
    if (selectedCategory === 'producto') return r.category === 'producto';
    return true;
  });

  const handleConfirmRedeem = () => {
    if (!selectedReward) return;
    setIsConfirming(true);

    setTimeout(() => {
      const success = redeemReward(selectedReward.id);
      setIsConfirming(false);
      if (success) {
        setSelectedReward(null);
      }
    }, 400);
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 border-b border-purple/30 pb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-white uppercase tracking-tight flex items-center gap-2 sm:gap-3">
            <span>CATÁLOGO DE <span className="text-yellow">RECOMPENSAS</span></span>
            <Gift className="w-6 h-6 sm:w-8 sm:h-8 text-yellow shrink-0" />
          </h2>
          <p className="text-xs text-gray-300 font-light mt-0.5">
            Canjea tus puntos acumulados por descuentos en mensualidades y productos exclusivos.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="bg-[#222630] border border-yellow/50 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs text-gray-300 flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow shrink-0" />
            <span>Tus Puntos: <strong className="text-yellow font-mono text-sm">{currentUser.points} pts</strong></span>
          </div>

          <button
            onClick={resetDemoData}
            className="bg-[#222630] hover:bg-amber-500/20 text-amber-400 border border-amber-500/40 p-2 sm:p-2.5 rounded-xl transition-all cursor-pointer shrink-0"
            title="Restablecer Puntos y Stock de Demostración"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Tabs (Scrollable on mobile) */}
      <div className="flex overflow-x-auto pb-2 sm:pb-3 gap-2 sm:gap-3 border-b border-purple/20 no-scrollbar whitespace-nowrap">
        <button
          onClick={() => setSelectedCategory('todos')}
          className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer shrink-0 ${
            selectedCategory === 'todos'
              ? 'bg-purple text-yellow border border-yellow/40 shadow-[0_0_15px_rgba(107,0,156,0.5)]'
              : 'bg-[#222630] text-gray-300 hover:text-white border border-purple/30'
          }`}
        >
          <Gift className="w-4 h-4 text-yellow" />
          <span>Todas ({rewards.length})</span>
        </button>

        <button
          onClick={() => setSelectedCategory('descuento')}
          className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer shrink-0 ${
            selectedCategory === 'descuento'
              ? 'bg-purple text-yellow border border-yellow/40 shadow-[0_0_15px_rgba(107,0,156,0.5)]'
              : 'bg-[#222630] text-gray-300 hover:text-white border border-purple/30'
          }`}
        >
          <Tag className="w-4 h-4 text-yellow" />
          <span>Descuentos Mensualidad</span>
        </button>

        <button
          onClick={() => setSelectedCategory('producto')}
          className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer shrink-0 ${
            selectedCategory === 'producto'
              ? 'bg-purple text-yellow border border-yellow/40 shadow-[0_0_15px_rgba(107,0,156,0.5)]'
              : 'bg-[#222630] text-gray-300 hover:text-white border border-purple/30'
          }`}
        >
          <Package className="w-4 h-4 text-yellow" />
          <span>Productos e Indumentaria</span>
        </button>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredRewards.map((reward) => {
          const hasEnoughPoints = currentUser.points >= reward.pointsCost;
          const isOutOfStock = reward.stock <= 0;

          return (
            <div
              key={reward.id}
              className={`bg-[#222630] border rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                hasEnoughPoints && !isOutOfStock
                  ? 'border-purple/40 hover:border-yellow shadow-[0_0_20px_rgba(107,0,156,0.15)]'
                  : 'border-purple/20 opacity-80'
              }`}
            >
              <div>
                {/* Image */}
                <div className="relative h-40 sm:h-44 overflow-hidden group">
                  <img
                    src={reward.image}
                    alt={reward.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#222630] via-transparent to-transparent"></div>

                  {/* Badges */}
                  <span className="absolute top-3 left-3 bg-purple text-yellow text-[10px] font-heading font-bold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-yellow/40 shadow-lg uppercase">
                    {reward.badge}
                  </span>

                  <span className="absolute top-3 right-3 bg-[#16181E]/90 text-gray-300 text-[10px] font-mono px-2 py-0.5 rounded-full border border-purple/30">
                    Stock: {reward.stock} un.
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <div className="text-[10px] font-heading font-bold text-yellow uppercase mb-1 flex items-center gap-1">
                    {reward.category === 'descuento' ? <Tag className="w-3 h-3" /> : <Package className="w-3 h-3" />}
                    <span>{reward.category === 'descuento' ? 'Mensualidades & Planes' : 'Indumentaria & Suplementos'}</span>
                  </div>

                  <h3 className="font-heading font-bold text-white text-sm sm:text-base leading-snug mb-1.5 sm:mb-2">
                    {reward.title}
                  </h3>

                  <p className="text-gray-300 text-xs font-light leading-relaxed mb-3 sm:mb-4">
                    {reward.description}
                  </p>
                </div>
              </div>

              {/* Footer / Cost & Redeem Button */}
              <div className="p-4 sm:p-5 pt-0">
                <div className="bg-[#16181E] p-2.5 sm:p-3 rounded-xl border border-purple/30 flex items-center justify-between mb-3 sm:mb-4">
                  <div>
                    <span className="text-[9px] sm:text-[10px] text-gray-400 uppercase font-bold block">Valor en Puntos</span>
                    <span className="font-heading font-black text-yellow text-lg sm:text-xl">
                      {reward.pointsCost} <span className="text-xs font-normal">pts</span>
                    </span>
                  </div>

                  {hasEnoughPoints ? (
                    <span className="text-[10px] sm:text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Suficientes
                    </span>
                  ) : (
                    <span className="text-[10px] sm:text-[11px] font-bold text-purple-light flex items-center gap-1">
                      Faltan {reward.pointsCost - currentUser.points} pts
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setSelectedReward(reward)}
                  disabled={!hasEnoughPoints || isOutOfStock}
                  className={`w-full font-heading font-bold text-xs py-3 px-4 uppercase tracking-wider rounded-xl transition-all text-center cursor-pointer ${
                    isOutOfStock
                      ? 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'
                      : hasEnoughPoints
                      ? 'bg-purple text-yellow border border-yellow/50 hover:bg-yellow hover:text-dark hover:border-transparent glow-button'
                      : 'bg-[#16181E] text-gray-500 border border-purple/20 cursor-not-allowed'
                  }`}
                >
                  {isOutOfStock ? 'Agotado' : hasEnoughPoints ? 'Canjear Recompensa' : 'Puntos Insuficientes'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      {selectedReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#222630] border-2 border-yellow rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-[0_0_50px_rgba(245,184,0,0.3)] relative">
            <button
              onClick={() => setSelectedReward(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-purple/40 border-2 border-yellow flex items-center justify-center text-yellow mx-auto mb-3">
                <Gift className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>

              <h3 className="text-lg sm:text-xl font-heading font-black text-white uppercase">
                Confirmar Canje
              </h3>
              <p className="text-xs text-gray-300 mt-1 font-light">
                ¿Estás seguro de que deseas canjear tus puntos por este beneficio?
              </p>
            </div>

            {/* Selected Reward Card Details */}
            <div className="bg-[#16181E] border border-purple/30 p-3.5 sm:p-4 rounded-xl mb-5">
              <div className="flex gap-3 items-center">
                <img
                  src={selectedReward.image}
                  alt={selectedReward.title}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover border border-purple/40 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-bold text-white text-xs sm:text-sm truncate">
                    {selectedReward.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 line-clamp-1 font-light">
                    {selectedReward.description}
                  </p>
                  <span className="text-yellow font-heading font-bold text-xs sm:text-sm block mt-0.5">
                    -{selectedReward.pointsCost} puntos
                  </span>
                </div>
              </div>

              <div className="border-t border-purple/20 mt-3 pt-2 flex justify-between text-[11px] sm:text-xs text-gray-300">
                <span>Saldo actual: <strong className="text-white">{currentUser.points} pts</strong></span>
                <span>Saldo final: <strong className="text-yellow">{currentUser.points - selectedReward.pointsCost} pts</strong></span>
              </div>
            </div>

            <p className="text-[10px] sm:text-[11px] text-gray-400 mb-5 flex items-start gap-2 bg-[#16181E]/50 p-2.5 rounded-lg border border-purple/20">
              <Info className="w-4 h-4 text-yellow shrink-0 mt-0.5" />
              <span>Este canje es en modo de demostración local. Se registrará la deducción en tu historial.</span>
            </p>

            {/* Modal Actions */}
            <div className="flex gap-2.5 sm:gap-3">
              <button
                onClick={() => setSelectedReward(null)}
                className="flex-1 bg-[#16181E] hover:bg-[#16181E]/80 text-gray-300 font-heading font-bold text-xs py-3 rounded-xl border border-purple/30 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmRedeem}
                disabled={isConfirming}
                className="flex-1 bg-yellow hover:bg-yellow-light text-dark font-heading font-bold text-xs py-3 rounded-xl shadow-[0_0_20px_rgba(245,184,0,0.4)] uppercase tracking-wider cursor-pointer"
              >
                {isConfirming ? 'Procesando...' : 'Sí, Canjear Ahora'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
