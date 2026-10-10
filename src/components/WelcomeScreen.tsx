import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ChevronRight, Info, CheckCircle2 } from 'lucide-react';

export const WelcomeScreen: React.FC = () => {
  const { loginDemo, demoUsers, setShowStaffModal } = useApp();
  const [selectedUserId, setSelectedUserId] = useState<string>('user-alexis');

  const handleGoogleSimulatedLogin = () => {
    loginDemo(selectedUserId);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 md:p-8 bg-[#16181E] overflow-hidden">
      {/* Background Graphic Effects matching official landing */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E1014]/90 via-[#40005D]/50 to-[#16181E] z-10"></div>
        <img
          src="https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/PremiumGym_hy/Interior.webp"
          alt="Premium Gym Interior"
          className="w-full h-full object-cover grayscale opacity-40"
        />
      </div>

      {/* Decorative ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#6B009C]/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#F5B800]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-xl mx-auto">
        {/* Card Container */}
        <div className="bg-[#222630]/90 backdrop-blur-xl border border-[#6B009C]/50 rounded-2xl p-6 sm:p-10 shadow-[0_0_40px_rgba(107,0,156,0.3)] text-center transition-all duration-300">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow via-purple-light to-purple rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
              <img
                src="https://wdirdbryxwtbnprbrkvh.supabase.co/storage/v1/object/public/PremiumGym_hy/logoPGcolorTransparente.webp"
                alt="Premium Gym Logo"
                className="relative w-20 h-20 sm:w-24 sm:h-24 object-contain mx-auto"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-heading font-black tracking-widest text-white uppercase mb-1">
            PREMIUM <span className="text-yellow glow-text">GYM</span> <span className="text-purple-light">CLUB</span>
          </h1>

          <p className="text-sm sm:text-base font-heading font-bold text-yellow uppercase tracking-wider mb-4">
            Tu esfuerzo suma. Tus puntos te premian.
          </p>

          <p className="text-xs sm:text-sm font-light text-gray-300 max-w-md mx-auto mb-8 leading-relaxed">
            Bienvenido a la plataforma oficial de fidelización de <span className="text-white font-semibold">Premium Gym</span>. Acumula puntos con cada visita, sube de nivel en el club y canjea recompensas exclusivas en mensualidades e indumentaria.
          </p>

          {/* User selector for Demo mode */}
          <div className="mb-6 bg-[#16181E]/90 p-4 rounded-xl border border-purple/30 text-left">
            <label className="text-xs font-heading font-bold text-gray-300 uppercase tracking-wider block mb-2 flex items-center justify-between">
              <span>Selecciona una cuenta de prueba:</span>
              <span className="text-[10px] text-yellow bg-purple/40 px-2 py-0.5 rounded-full border border-purple-light/30">
                Demo Mode
              </span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {demoUsers.slice(0, 4).map((user) => (
                <button
                  key={user.id}
                  onClick={() => setSelectedUserId(user.id)}
                  className={`flex items-center gap-3 p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                    selectedUserId === user.id
                      ? 'bg-purple/40 border-yellow text-white shadow-[0_0_15px_rgba(245,184,0,0.2)]'
                      : 'bg-[#222630] border-purple/20 text-gray-300 hover:border-purple/50'
                  }`}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-yellow/40"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate flex items-center justify-between">
                      <span>{user.name}</span>
                      {selectedUserId === user.id && <CheckCircle2 className="w-3.5 h-3.5 text-yellow" />}
                    </div>
                    <div className="text-[10px] text-yellow font-mono">
                      {user.points} pts • Nivel {user.tier}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 mb-6">
            {/* Continuar con Google (Simulated) */}
            <button
              onClick={handleGoogleSimulatedLogin}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-heading font-bold text-sm sm:text-base py-3.5 px-6 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg cursor-pointer hover:scale-[1.02]"
            >
              {/* Official Google SVG Icon */}
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continuar con Google</span>
              <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
            </button>

            {/* Entrar en modo demo */}
            <button
              onClick={() => loginDemo(selectedUserId)}
              className="w-full flex items-center justify-center gap-2 bg-purple text-yellow font-heading font-bold text-sm sm:text-base py-3.5 px-6 rounded-xl hover:bg-yellow hover:text-dark border border-purple-light/40 transition-all duration-300 glow-button cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Entrar en modo demo</span>
            </button>
          </div>

          {/* Discreet explanatory note */}
          <p className="text-[11px] text-gray-400 font-light flex items-center justify-center gap-1 mb-6">
            <Info className="w-3.5 h-3.5 text-purple-light shrink-0" />
            <span>Sistema web interactivo en modo demostración local. No requiere contraseñas reales.</span>
          </p>

          {/* Discreet link for authorized staff note */}
          <div className="border-t border-purple/30 pt-4 text-center">
            <button
              onClick={() => setShowStaffModal(true)}
              className="text-xs text-gray-400 hover:text-yellow transition-colors underline font-light hover:no-underline cursor-pointer"
            >
              ¿Personal autorizado de Premium Gym Club?
            </button>
          </div>
        </div>

        {/* Footer Credit */}
        <p className="text-center text-xs text-gray-400 font-light mt-6">
          &copy; 2026 Premium Gym Club • Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};
