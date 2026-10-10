import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  History, 
  Search, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Calendar, 
  Clock, 
  Award 
} from 'lucide-react';

export const HistorialView: React.FC = () => {
  const { transactions, currentUser } = useApp();
  const [filterType, setFilterType] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!currentUser) return null;

  // Filter logic
  const filteredTransactions = transactions.filter((tx) => {
    // Type filter
    if (filterType !== 'todos') {
      if (filterType === 'visit' && tx.type !== 'visit') return false;
      if (filterType === 'renewal' && tx.type !== 'renewal') return false;
      if (filterType === 'reward' && tx.type !== 'reward') return false;
      if (filterType === 'bonus' && tx.type !== 'bonus') return false;
    }

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchDesc = tx.description.toLowerCase().includes(q);
      const matchCategory = tx.category.toLowerCase().includes(q);
      const matchDate = tx.date.includes(q);
      return matchDesc || matchCategory || matchDate;
    }

    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-purple/30 pb-4">
        <div>
          <h2 className="text-3xl font-heading font-black text-white uppercase tracking-tight flex items-center gap-3">
            <span>HISTORIAL DE <span className="text-yellow">MOVIMIENTOS</span></span>
            <History className="w-8 h-8 text-yellow" />
          </h2>
          <p className="text-xs text-gray-300 font-light mt-1">
            Registro detallado de tus ingresos y canjes de puntos en Premium Gym Club.
          </p>
        </div>

        <div className="bg-[#222630] border border-purple/40 px-4 py-2 rounded-xl text-xs text-gray-300 flex items-center gap-2">
          <Award className="w-4 h-4 text-yellow" />
          <span>Saldo Actual: <strong className="text-yellow font-mono">{currentUser.points} pts</strong></span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#222630] border border-purple/40 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            onClick={() => setFilterType('todos')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer ${
              filterType === 'todos'
                ? 'bg-purple text-yellow border border-yellow/40 shadow-[0_0_10px_rgba(107,0,156,0.5)]'
                : 'bg-[#16181E] text-gray-300 hover:text-white border border-purple/20'
            }`}
          >
            Todos ({transactions.length})
          </button>
          <button
            onClick={() => setFilterType('visit')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer ${
              filterType === 'visit'
                ? 'bg-purple text-yellow border border-yellow/40 shadow-[0_0_10px_rgba(107,0,156,0.5)]'
                : 'bg-[#16181E] text-gray-300 hover:text-white border border-purple/20'
            }`}
          >
            Visitas
          </button>
          <button
            onClick={() => setFilterType('renewal')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer ${
              filterType === 'renewal'
                ? 'bg-purple text-yellow border border-yellow/40 shadow-[0_0_10px_rgba(107,0,156,0.5)]'
                : 'bg-[#16181E] text-gray-300 hover:text-white border border-purple/20'
            }`}
          >
            Renovaciones
          </button>
          <button
            onClick={() => setFilterType('reward')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer ${
              filterType === 'reward'
                ? 'bg-purple text-yellow border border-yellow/40 shadow-[0_0_10px_rgba(107,0,156,0.5)]'
                : 'bg-[#16181E] text-gray-300 hover:text-white border border-purple/20'
            }`}
          >
            Canjes
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Buscar por motivo o fecha..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#16181E] border border-purple/30 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-yellow transition-colors"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Transactions Table / List */}
      <div className="bg-[#222630] border border-purple/40 rounded-2xl overflow-hidden">
        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center">
            <History className="w-12 h-12 text-purple-light mx-auto mb-3 opacity-50" />
            <h4 className="font-heading font-bold text-white text-base">No hay movimientos registrados</h4>
            <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
              No se encontraron registros con los filtros seleccionados. Intenta cambiar los criterios de búsqueda.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-purple/20">
            {filteredTransactions.map((tx) => {
              const isEarned = tx.points > 0;
              return (
                <div
                  key={tx.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#16181E]/60 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                        isEarned
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-purple/30 text-purple-light border border-purple/40'
                      }`}
                    >
                      {isEarned ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                    </div>

                    <div>
                      <h4 className="font-heading font-bold text-white text-sm">
                        {tx.description}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-[11px] text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-purple-light" />
                          {tx.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-purple-light" />
                          {tx.time}
                        </span>
                        <span className="bg-[#16181E] text-yellow px-2 py-0.5 rounded border border-purple/30 text-[10px] uppercase font-semibold">
                          {tx.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-purple/10">
                    <span
                      className={`font-heading font-black text-base md:text-lg ${
                        isEarned ? 'text-emerald-400' : 'text-purple-light'
                      }`}
                    >
                      {isEarned ? `+${tx.points}` : tx.points} pts
                    </span>
                    <span className="text-[11px] text-gray-400 font-mono">
                      Saldo Resultante: {tx.balanceAfter} pts
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
