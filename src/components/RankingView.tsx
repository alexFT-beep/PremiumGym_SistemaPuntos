import React from 'react';
import { useApp } from '../context/AppContext';
import { Trophy, Award } from 'lucide-react';

export const RankingView: React.FC = () => {
  const { demoUsers, currentUser, switchDemoUser } = useApp();

  if (!currentUser) return null;

  // Sort demo users by points descending
  const sortedUsers = [...demoUsers].sort((a, b) => b.points - a.points);
  const top1 = sortedUsers[0];
  const top2 = sortedUsers[1];
  const top3 = sortedUsers[2];

  // User position logic
  const currentUserIndex = sortedUsers.findIndex((u) => u.id === currentUser.id);
  const currentUserRank = currentUserIndex >= 0 ? currentUserIndex + 1 : currentUser.rank;

  // Points needed to reach next rank
  let pointsToNextRank = 0;
  let prevUser = null;
  if (currentUserIndex > 0) {
    prevUser = sortedUsers[currentUserIndex - 1];
    pointsToNextRank = prevUser.points - currentUser.points + 1;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-purple/30 pb-4">
        <div>
          <h2 className="text-3xl font-heading font-black text-white uppercase tracking-tight flex items-center gap-3">
            <span>RANKING DE LA <span className="text-yellow">COMUNIDAD</span></span>
            <Trophy className="w-8 h-8 text-yellow" />
          </h2>
          <p className="text-xs text-gray-300 font-light mt-1">
            Los atletas con mayor dedicación y puntos en Premium Gym Club.
          </p>
        </div>

        {/* Demo Switcher Quick Pill */}
        <div className="bg-[#222630] border border-purple/40 px-3 py-1.5 rounded-xl text-xs text-gray-300 flex items-center gap-2">
          <span className="text-[10px] text-yellow uppercase font-bold">Ver como:</span>
          <select
            value={currentUser.id}
            onChange={(e) => switchDemoUser(e.target.value)}
            className="bg-[#16181E] border border-purple/30 rounded px-2 py-1 text-xs text-white focus:outline-none cursor-pointer"
          >
            {demoUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.points} pts)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Current User Status Banner */}
      <div className="bg-gradient-to-r from-[#222630] via-purple-dark/40 to-[#222630] border-2 border-yellow rounded-2xl p-6 shadow-[0_0_25px_rgba(245,184,0,0.2)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-14 h-14 rounded-full bg-yellow/20 border-2 border-yellow flex items-center justify-center text-yellow font-heading font-black text-2xl shrink-0 mx-auto sm:mx-0">
            #{currentUserRank}
          </div>
          <div>
            <span className="text-xs font-heading font-bold text-yellow uppercase tracking-widest block">
              TU POSICIÓN ACTUAL
            </span>
            <h3 className="text-xl font-heading font-black text-white uppercase">
              Estás en el puesto <span className="text-yellow">#{currentUserRank}</span> del club
            </h3>
            <p className="text-xs text-gray-300 font-light mt-0.5">
              {currentUserIndex === 0 ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Award className="w-4 h-4" /> ¡Felicidades! Eres el #1 de la comunidad.
                </span>
              ) : (
                <>
                  Te faltan <strong className="text-yellow font-mono">{pointsToNextRank} puntos</strong> para alcanzar el puesto #{currentUserRank - 1} ({prevUser?.name}).
                </>
              )}
            </p>
          </div>
        </div>

        <div className="bg-[#16181E] px-5 py-3 rounded-xl border border-purple/40 text-center shrink-0">
          <span className="text-[10px] text-gray-400 uppercase font-bold block">Tus Puntos Acumulados</span>
          <span className="font-heading font-black text-yellow text-2xl glow-text">
            {currentUser.points.toLocaleString()} <span className="text-xs font-normal">pts</span>
          </span>
        </div>
      </div>

      {/* Podium (Top 3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* 2nd Place */}
        {top2 && (
          <div className="order-2 md:order-1 bg-[#222630] border border-slate-400/40 rounded-2xl p-6 text-center relative overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all">
            <div className="absolute top-0 right-0 bg-slate-400 text-dark font-heading font-black text-xs px-4 py-1 rounded-bl-xl uppercase tracking-widest">
              2° LUGAR
            </div>
            <div>
              <div className="relative w-20 h-20 mx-auto mb-4 mt-2">
                <img
                  src={top2.avatar}
                  alt={top2.name}
                  className="w-full h-full rounded-full object-cover border-2 border-slate-300 shadow-lg"
                />
                <div className="absolute -bottom-2 -right-1 w-8 h-8 rounded-full bg-slate-300 text-dark flex items-center justify-center font-bold text-sm shadow">
                  🥈
                </div>
              </div>
              <h4 className="font-heading font-black text-white text-lg">{top2.name}</h4>
              <span className="text-xs font-bold text-slate-300 bg-slate-500/20 px-3 py-0.5 rounded-full border border-slate-400/30 inline-block my-1">
                Nivel {top2.tier}
              </span>
              <div className="text-2xl font-heading font-black text-slate-200 mt-2">
                {top2.points.toLocaleString()} <span className="text-xs font-normal">pts</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-400/20 text-xs text-gray-400">
              {top2.visitsCount} visitas registradas
            </div>
          </div>
        )}

        {/* 1st Place (Center Podium) */}
        {top1 && (
          <div className="order-1 md:order-2 bg-gradient-to-b from-[#222630] to-[#40005D]/40 border-2 border-yellow rounded-2xl p-6 text-center relative overflow-hidden flex flex-col justify-between shadow-[0_0_35px_rgba(245,184,0,0.25)] group hover:-translate-y-1 transition-all md:-mt-4">
            <div className="absolute top-0 right-0 bg-yellow text-dark font-heading font-black text-xs px-4 py-1 rounded-bl-xl uppercase tracking-widest shadow">
              👑 LÍDER #1
            </div>
            <div>
              <div className="relative w-24 h-24 mx-auto mb-4 mt-2">
                <div className="absolute -inset-2 bg-yellow/40 rounded-full blur animate-pulse"></div>
                <img
                  src={top1.avatar}
                  alt={top1.name}
                  className="relative w-full h-full rounded-full object-cover border-4 border-yellow shadow-xl"
                />
                <div className="absolute -bottom-2 -right-1 w-9 h-9 rounded-full bg-yellow text-dark flex items-center justify-center font-bold text-base shadow-lg">
                  🥇
                </div>
              </div>
              <h4 className="font-heading font-black text-white text-xl">{top1.name}</h4>
              <span className="text-xs font-bold text-yellow bg-purple/50 px-3 py-0.5 rounded-full border border-yellow/50 inline-block my-1">
                Nivel {top1.tier}
              </span>
              <div className="text-3xl font-heading font-black text-yellow glow-text mt-2">
                {top1.points.toLocaleString()} <span className="text-xs font-normal text-white">pts</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-yellow/30 text-xs text-yellow/90">
              {top1.visitsCount} visitas registradas • Máximo Atleta
            </div>
          </div>
        )}

        {/* 3rd Place */}
        {top3 && (
          <div className="order-3 bg-[#222630] border border-amber-600/40 rounded-2xl p-6 text-center relative overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all">
            <div className="absolute top-0 right-0 bg-amber-600 text-white font-heading font-black text-xs px-4 py-1 rounded-bl-xl uppercase tracking-widest">
              3° LUGAR
            </div>
            <div>
              <div className="relative w-20 h-20 mx-auto mb-4 mt-2">
                <img
                  src={top3.avatar}
                  alt={top3.name}
                  className="w-full h-full rounded-full object-cover border-2 border-amber-500 shadow-lg"
                />
                <div className="absolute -bottom-2 -right-1 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm shadow">
                  🥉
                </div>
              </div>
              <h4 className="font-heading font-black text-white text-lg">{top3.name}</h4>
              <span className="text-xs font-bold text-amber-300 bg-amber-700/20 px-3 py-0.5 rounded-full border border-amber-600/30 inline-block my-1">
                Nivel {top3.tier}
              </span>
              <div className="text-2xl font-heading font-black text-amber-400 mt-2">
                {top3.points.toLocaleString()} <span className="text-xs font-normal">pts</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-600/20 text-xs text-gray-400">
              {top3.visitsCount} visitas registradas
            </div>
          </div>
        )}
      </div>

      {/* Full Ranking Table */}
      <div className="bg-[#222630] border border-purple/40 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-purple/30 flex justify-between items-center bg-[#16181E]/60">
          <h3 className="font-heading font-bold text-white text-sm uppercase flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow" />
            Tabla General de Clasificación
          </h3>
          <span className="text-xs text-gray-400">Total: {sortedUsers.length} atletas</span>
        </div>

        <div className="divide-y divide-purple/20">
          {sortedUsers.map((user, index) => {
            const rank = index + 1;
            const isCurrentUser = user.id === currentUser.id;

            return (
              <div
                key={user.id}
                className={`p-4 flex items-center justify-between gap-4 transition-colors ${
                  isCurrentUser
                    ? 'bg-purple/30 border-l-4 border-l-yellow font-semibold'
                    : 'hover:bg-[#16181E]/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank badge */}
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-heading font-black text-sm shrink-0 ${
                      rank === 1
                        ? 'bg-yellow text-dark shadow-[0_0_10px_rgba(245,184,0,0.5)]'
                        : rank === 2
                        ? 'bg-slate-300 text-dark'
                        : rank === 3
                        ? 'bg-amber-600 text-white'
                        : 'bg-[#16181E] text-gray-400 border border-purple/30'
                    }`}
                  >
                    #{rank}
                  </span>

                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border border-purple/40"
                  />

                  <div>
                    <h4 className="font-heading font-bold text-white text-sm flex items-center gap-2">
                      <span>{user.name}</span>
                      {isCurrentUser && (
                        <span className="text-[10px] bg-yellow text-dark font-black px-2 py-0.2 rounded-full uppercase">
                          Tú
                        </span>
                      )}
                    </h4>
                    <span className="text-xs text-gray-400">
                      Nivel {user.tier} • {user.visitsCount} visitas
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-heading font-black text-yellow text-base md:text-lg">
                    {user.points.toLocaleString()} <span className="text-xs font-normal">pts</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
