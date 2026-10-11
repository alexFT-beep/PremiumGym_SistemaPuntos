import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { 
  UserProfile, 
  Reward, 
  PointTransaction, 
  Visit, 
  ActiveTab, 
  UserTier 
} from '../types';
import { 
  INITIAL_DEMO_USERS, 
  INITIAL_REWARDS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_VISITS,
  getAvatarForName
} from '../data/mockData';

interface ToastNotice {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface AppContextType {
  currentUser: UserProfile | null;
  activeTab: ActiveTab;
  demoUsers: UserProfile[];
  rewards: Reward[];
  transactions: PointTransaction[];
  visits: Visit[];
  toast: ToastNotice | null;
  showQRScanner: boolean;
  showStaffModal: boolean;
  loginDemo: (userId?: string) => void;
  logout: () => void;
  switchDemoUser: (userId: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
  simulateVisit: () => boolean;
  redeemReward: (rewardId: string) => boolean;
  updateUserProfile: (name: string, phone: string) => void;
  resetDemoData: () => void;
  setShowQRScanner: (show: boolean) => void;
  setShowStaffModal: (show: boolean) => void;
  hideToast: () => void;
  calculateTier: (points: number) => UserTier;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'premium_gym_club_demo_v3';

// Enforce gender avatars based on user name
const sanitizeUserAvatars = (users: UserProfile[]): UserProfile[] => {
  return users.map((u) => ({
    ...u,
    avatar: getAvatarForName(u.name),
  }));
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [demoUsers, setDemoUsers] = useState<UserProfile[]>(sanitizeUserAvatars(INITIAL_DEMO_USERS));
  const [rewards, setRewards] = useState<Reward[]>(INITIAL_REWARDS);
  const [transactionsMap, setTransactionsMap] = useState<Record<string, PointTransaction[]>>(INITIAL_TRANSACTIONS);
  const [visitsMap, setVisitsMap] = useState<Record<string, Visit[]>>(INITIAL_VISITS);
  const [toast, setToast] = useState<ToastNotice | null>(null);
  const [showQRScanner, setShowQRScanner] = useState<boolean>(false);
  const [showStaffModal, setShowStaffModal] = useState<boolean>(false);

  // Load persisted demo state if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.demoUsers) {
          const sanitized = sanitizeUserAvatars(parsed.demoUsers);
          setDemoUsers(sanitized);
        }
        if (parsed.rewards) setRewards(parsed.rewards);
        if (parsed.transactionsMap) setTransactionsMap(parsed.transactionsMap);
        if (parsed.visitsMap) setVisitsMap(parsed.visitsMap);
        if (parsed.activeUserId) {
          const user = parsed.demoUsers?.find((u: UserProfile) => u.id === parsed.activeUserId);
          if (user) {
            setCurrentUser({
              ...user,
              avatar: getAvatarForName(user.name),
            });
          }
        }
      }
    } catch (e) {
      console.error('Error loading demo state from localStorage', e);
    }
  }, []);

  // Save demo state to localStorage
  const saveState = (
    users: UserProfile[],
    rews: Reward[],
    txs: Record<string, PointTransaction[]>,
    vsts: Record<string, Visit[]>,
    activeUserId?: string | null
  ) => {
    try {
      const sanitizedUsers = sanitizeUserAvatars(users);
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          demoUsers: sanitizedUsers,
          rewards: rews,
          transactionsMap: txs,
          visitsMap: vsts,
          activeUserId: activeUserId !== undefined ? activeUserId : currentUser?.id,
        })
      );
    } catch (e) {
      console.error('Error saving state to localStorage', e);
    }
  };

  const showToastNotice = (title: string, message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    setToast({
      id: Date.now().toString(),
      title,
      message,
      type,
    });
  };

  const hideToast = () => {
    setToast(null);
  };

  const calculateTier = (points: number): UserTier => {
    if (points >= 3000) return 'Élite';
    if (points >= 1500) return 'Oro';
    if (points >= 500) return 'Plata';
    return 'Bronce';
  };

  // Recalculate ranks across all users
  const updateUsersRanksAndTiers = (users: UserProfile[]): UserProfile[] => {
    const sorted = [...users].sort((a, b) => b.points - a.points);
    return sorted.map((user, index) => ({
      ...user,
      avatar: getAvatarForName(user.name),
      rank: index + 1,
      tier: calculateTier(user.points),
    }));
  };

  const loginDemo = (userId: string = 'user-alexis') => {
    const targetUser = demoUsers.find((u) => u.id === userId) || demoUsers[0];
    const sanitizedUser = {
      ...targetUser,
      avatar: getAvatarForName(targetUser.name),
    };
    setCurrentUser(sanitizedUser);
    setActiveTab('dashboard');
    saveState(demoUsers, rewards, transactionsMap, visitsMap, targetUser.id);
    showToastNotice(
      `¡Bienvenido a Premium Gym Club!`,
      `Sesión iniciada en modo demostración como ${targetUser.name}.`,
      'success'
    );
  };

  const logout = () => {
    setCurrentUser(null);
    saveState(demoUsers, rewards, transactionsMap, visitsMap, null);
    showToastNotice('Sesión cerrada', 'Has salido del modo demostración.', 'info');
  };

  const switchDemoUser = (userId: string) => {
    const targetUser = demoUsers.find((u) => u.id === userId);
    if (!targetUser) return;
    const sanitizedUser = {
      ...targetUser,
      avatar: getAvatarForName(targetUser.name),
    };
    setCurrentUser(sanitizedUser);
    saveState(demoUsers, rewards, transactionsMap, visitsMap, targetUser.id);
    showToastNotice(
      'Perfil cambiado',
      `Ahora estás visualizando el panel como ${targetUser.name}.`,
      'info'
    );
  };

  const simulateVisit = (): boolean => {
    if (!currentUser) return false;

    const todayStr = new Date().toISOString().split('T')[0];
    const userVisits = visitsMap[currentUser.id] || [];
    const alreadyVisitedToday = userVisits.some((v) => v.date === todayStr && v.status === 'valid');

    if (alreadyVisitedToday) {
      showToastNotice(
        'Visita ya registrada hoy',
        'Ya has registrado tu visita del día. ¡Vuelve mañana para sumar otro punto!',
        'warning'
      );
      return false;
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const dateFormatted = todayStr;

    const newVisit: Visit = {
      id: `vis-${Date.now()}`,
      date: dateFormatted,
      time: timeStr,
      location: 'Sede Calle Aija - Huarmey',
      pointsEarned: 1,
      status: 'valid',
    };

    const updatedUserVisits = [newVisit, ...userVisits];

    const newTransaction: PointTransaction = {
      id: `tx-${Date.now()}`,
      date: dateFormatted,
      time: timeStr,
      description: 'Visita al gimnasio (Validación QR)',
      points: 1,
      type: 'visit',
      category: 'Visitas',
      balanceAfter: currentUser.points + 1,
    };

    const userTxs = transactionsMap[currentUser.id] || [];
    const updatedUserTxs = [newTransaction, ...userTxs];

    const updatedUser: UserProfile = {
      ...currentUser,
      avatar: getAvatarForName(currentUser.name),
      points: currentUser.points + 1,
      totalEarned: currentUser.totalEarned + 1,
      visitsCount: currentUser.visitsCount + 1,
      lastVisitDate: dateFormatted,
    };

    // Update demoUsers list and ranks
    const updatedUsersList = demoUsers.map((u) => (u.id === currentUser.id ? updatedUser : u));
    const rankedUsers = updateUsersRanksAndTiers(updatedUsersList);
    const finalCurrentUser = rankedUsers.find((u) => u.id === currentUser.id) || updatedUser;

    const newTxsMap = { ...transactionsMap, [currentUser.id]: updatedUserTxs };
    const newVisitsMap = { ...visitsMap, [currentUser.id]: updatedUserVisits };

    setDemoUsers(rankedUsers);
    setCurrentUser(finalCurrentUser);
    setTransactionsMap(newTxsMap);
    setVisitsMap(newVisitsMap);

    saveState(rankedUsers, rewards, newTxsMap, newVisitsMap, finalCurrentUser.id);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#F5B800', '#6B009C', '#A855F7'],
      });
    } catch (e) {
      // ignore confetti errors
    }

    showToastNotice(
      '¡Visita Registrada con Éxito! 🎉',
      '+1 punto sumado a tu saldo. ¡Sigue entrenando duro en Premium Gym!',
      'success'
    );

    return true;
  };

  const redeemReward = (rewardId: string): boolean => {
    if (!currentUser) return false;

    const reward = rewards.find((r) => r.id === rewardId);
    if (!reward) return false;

    if (currentUser.points < reward.pointsCost) {
      showToastNotice(
        'Puntos insuficientes',
        `Necesitas ${reward.pointsCost} puntos para canjear "${reward.title}". Te faltan ${reward.pointsCost - currentUser.points} puntos.`,
        'error'
      );
      return false;
    }

    if (reward.stock <= 0) {
      showToastNotice(
        'Recompensa agotada',
        'Esta recompensa no tiene stock disponible en este momento.',
        'warning'
      );
      return false;
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const dateFormatted = now.toISOString().split('T')[0];

    const updatedUserPoints = currentUser.points - reward.pointsCost;

    const newTransaction: PointTransaction = {
      id: `tx-${Date.now()}`,
      date: dateFormatted,
      time: timeStr,
      description: `Canje de Recompensa: ${reward.title}`,
      points: -reward.pointsCost,
      type: 'reward',
      category: 'Canjes',
      balanceAfter: updatedUserPoints,
    };

    const userTxs = transactionsMap[currentUser.id] || [];
    const updatedUserTxs = [newTransaction, ...userTxs];

    const updatedUser: UserProfile = {
      ...currentUser,
      avatar: getAvatarForName(currentUser.name),
      points: updatedUserPoints,
      totalSpent: currentUser.totalSpent + reward.pointsCost,
    };

    const updatedRewards = rewards.map((r) =>
      r.id === rewardId ? { ...r, stock: r.stock - 1 } : r
    );

    const updatedUsersList = demoUsers.map((u) => (u.id === currentUser.id ? updatedUser : u));
    const rankedUsers = updateUsersRanksAndTiers(updatedUsersList);
    const finalCurrentUser = rankedUsers.find((u) => u.id === currentUser.id) || updatedUser;

    const newTxsMap = { ...transactionsMap, [currentUser.id]: updatedUserTxs };

    setDemoUsers(rankedUsers);
    setCurrentUser(finalCurrentUser);
    setRewards(updatedRewards);
    setTransactionsMap(newTxsMap);

    saveState(rankedUsers, updatedRewards, newTxsMap, visitsMap, finalCurrentUser.id);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F5B800', '#6B009C', '#FFD84D', '#A855F7'],
      });
    } catch (e) {
      // ignore
    }

    showToastNotice(
      '¡Canje Confirmado! 🎁',
      `Has canjeado "${reward.title}" por ${reward.pointsCost} puntos. Presenta tu comprobante digital en recepción.`,
      'success'
    );

    return true;
  };

  const updateUserProfile = (name: string, phone: string) => {
    if (!currentUser) return;

    const updatedUser: UserProfile = {
      ...currentUser,
      name,
      phone,
      avatar: getAvatarForName(name),
    };

    const updatedUsersList = demoUsers.map((u) => (u.id === currentUser.id ? updatedUser : u));
    const sanitizedList = sanitizeUserAvatars(updatedUsersList);
    setCurrentUser(updatedUser);
    setDemoUsers(sanitizedList);
    saveState(sanitizedList, rewards, transactionsMap, visitsMap, currentUser.id);

    showToastNotice('Perfil actualizado', 'Tus datos de demostración han sido guardados.', 'success');
  };

  const resetDemoData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    const sanitizedInitial = sanitizeUserAvatars(INITIAL_DEMO_USERS);
    setDemoUsers(sanitizedInitial);
    setRewards(INITIAL_REWARDS);
    setTransactionsMap(INITIAL_TRANSACTIONS);
    setVisitsMap(INITIAL_VISITS);

    if (currentUser) {
      const resetUser = sanitizedInitial.find((u) => u.id === currentUser.id) || sanitizedInitial[0];
      setCurrentUser(resetUser);
    }

    showToastNotice(
      'Demostración restablecida',
      'Todos los puntos, recompensas e historial han vuelto a su estado inicial.',
      'info'
    );
  };

  const activeTransactions = currentUser ? transactionsMap[currentUser.id] || [] : [];
  const activeVisits = currentUser ? visitsMap[currentUser.id] || [] : [];

  return (
    <AppContext.Provider
      value={{
        currentUser,
        activeTab,
        demoUsers,
        rewards,
        transactions: activeTransactions,
        visits: activeVisits,
        toast,
        showQRScanner,
        showStaffModal,
        loginDemo,
        logout,
        switchDemoUser,
        setActiveTab,
        simulateVisit,
        redeemReward,
        updateUserProfile,
        resetDemoData,
        setShowQRScanner,
        setShowStaffModal,
        hideToast,
        calculateTier,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp context must be used within an AppProvider');
  }
  return context;
};
