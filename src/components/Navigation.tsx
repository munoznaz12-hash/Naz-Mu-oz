import React, { useState, useRef, useEffect } from 'react';
import { 
  Home,
  Search,
  BookOpen, 
  SlidersHorizontal, 
  HelpCircle,
  FileCheck2,
  MapPin, 
  User, 
  UserPlus, 
  LogIn, 
  LogOut, 
  Languages,
  Sun,
  Moon,
  ChevronDown,
  ShieldCheck
} from 'lucide-react';
import { ScreenId, UserProfile } from '../types';
import { ViaNovaLogo } from './ViaNovaLogo';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

interface NavigationProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  user: UserProfile | null;
  onLogout: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentScreen,
  onNavigate,
  user,
  onLogout,
}) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { 
    language, 
    toggleLanguage,
    themeMode, 
    toggleThemeMode, 
    t 
  } = useThemeLanguage();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };

    if (userDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userDropdownOpen]);

  // All 8 sections clearly listed for the top navigation
  const mainNavItems = [
    { id: 'inicio' as ScreenId, label: t('nav_home', 'Inicio'), icon: Home },
    { id: 'educacion_vial' as ScreenId, label: t('nav_education', 'Educación Vial'), icon: BookOpen },
    { id: 'quiz' as ScreenId, label: t('nav_quiz', 'Quiz'), icon: HelpCircle },
    { id: 'reportes' as ScreenId, label: t('nav_reports', 'Reportes en Vía'), icon: MapPin },
    { id: 'busqueda' as ScreenId, label: t('nav_search', 'Búsqueda'), icon: Search },
    { id: 'senales' as ScreenId, label: t('nav_signs', 'Señales de Tránsito'), icon: SlidersHorizontal },
    { id: 'simulador' as ScreenId, label: t('nav_simulator', 'Simulador Examen'), icon: FileCheck2 },
    { id: 'perfil' as ScreenId, label: t('nav_profile', 'Mi Perfil'), icon: User },
  ];

  const handleNavClick = (screen: ScreenId) => {
    onNavigate(screen);
    setUserDropdownOpen(false);
  };

  return (
    <header className="w-full bg-white dark:bg-[#0f172a] border-b border-[#cbd5e1] dark:border-slate-800 sticky top-0 z-40 shadow-sm transition-colors">
      {/* Top Primary Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Brand Logo & Emblem */}
        <div 
          onClick={() => handleNavClick(user ? 'inicio' : 'login')}
          className="flex items-center gap-2.5 cursor-pointer select-none shrink-0 group hover:opacity-90 transition-opacity"
          id="brand-logo-btn"
        >
          <ViaNovaLogo size="sm" />
          <div className="flex flex-col">
            <div className="font-black text-[#0f172a] dark:text-white tracking-tight leading-none text-xl sm:text-2xl">
              <span className="text-[#0052cc] dark:text-sky-400">Via</span>Nova
            </div>
            <span className="text-[10px] text-[#475569] dark:text-slate-400 font-extrabold tracking-wider uppercase">
              {t('appSubtitle', 'Movilidad Inteligente')}
            </span>
          </div>
        </div>

        {/* ================= TOP NAVIGATION ITEMS (Desktop XL/2XL Main Bar) ================= */}
        {user && (
          <nav className="hidden xl:flex items-center gap-1 flex-1 justify-center px-2">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-xl text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#0052cc] text-white shadow-sm ring-2 ring-[#0052cc]/20'
                      : 'text-[#334155] dark:text-slate-200 hover:text-[#0052cc] dark:hover:text-white hover:bg-[#f1f5f9] dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon size={17} className={isActive ? 'text-white' : 'text-[#0052cc] dark:text-sky-400'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* ================= RIGHT CONTROLS: Dark/Light Mode + 1-Click Language + User Name ================= */}
        <div className="flex items-center gap-2 shrink-0">
          {/* 1. Theme Toggle: Only Claro / Oscuro */}
          <button
            type="button"
            id="quick-theme-toggle-btn"
            onClick={toggleThemeMode}
            title={themeMode === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
            className="p-2 sm:px-2.5 sm:py-2 rounded-xl border border-[#cbd5e1] dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-800 text-[#334155] dark:text-slate-200 hover:bg-[#e2e8f0] dark:hover:bg-slate-700 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
          >
            {themeMode === 'light' ? (
              <>
                <Moon size={16} className="text-slate-700" />
                <span className="hidden sm:inline text-xs">Oscuro</span>
              </>
            ) : (
              <>
                <Sun size={16} className="text-amber-400" />
                <span className="hidden sm:inline text-xs">Claro</span>
              </>
            )}
          </button>

          {/* 2. Language Toggle: 1-Click Toggle between Spanish & English */}
          <button
            type="button"
            id="single-click-language-toggle-btn"
            onClick={toggleLanguage}
            title={language === 'es' ? 'Cambiar a Inglés (Switch to English)' : 'Switch to Spanish (Cambiar a Español)'}
            className="px-2.5 py-2 rounded-xl border border-[#cbd5e1] dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-800 hover:bg-[#e2e8f0] dark:hover:bg-slate-700 text-xs font-black text-[#1e293b] dark:text-slate-200 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Languages size={15} className="text-[#0052cc] dark:text-sky-400" />
            <span className="font-extrabold">{language === 'es' ? '🇨🇴 ES' : '🇺🇸 EN'}</span>
          </button>

          {user ? (
            /* 3. LOGGED-IN: User Name Clickable Menu with Dropdown (Logout only shows on click) */
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                id="user-name-dropdown-trigger"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className={`flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  userDropdownOpen
                    ? 'bg-[#0052cc] text-white border-[#0052cc] shadow-md ring-2 ring-[#0052cc]/30'
                    : 'bg-[#f1f5f9] dark:bg-slate-800 text-[#0f172a] dark:text-white border-[#cbd5e1] dark:border-slate-700 hover:bg-[#e2e8f0] dark:hover:bg-slate-700'
                }`}
                title="Haz clic para ver opciones y cerrar sesión"
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                  userDropdownOpen 
                    ? 'bg-white text-[#0052cc]' 
                    : 'bg-[#0052cc] text-white'
                }`}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                
                <span className="text-xs sm:text-sm font-extrabold max-w-[100px] sm:max-w-[140px] truncate">
                  {user.name}
                </span>

                <ChevronDown 
                  size={15} 
                  className={`transition-transform duration-200 ${
                    userDropdownOpen ? 'rotate-180 text-white' : 'text-[#64748b] dark:text-slate-400'
                  }`} 
                />
              </button>

              {/* Dropdown Menu (ONLY VISIBLE ON CLICK) */}
              {userDropdownOpen && (
                <div 
                  id="user-logout-dropdown-menu"
                  className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl border border-[#cbd5e1] dark:border-slate-700 py-2.5 px-2 z-50 animate-fade-in"
                >
                  {/* User info summary */}
                  <div className="px-3 py-2 border-b border-[#e2e8f0] dark:border-slate-700/80 mb-2">
                    <p className="text-xs text-[#64748b] dark:text-slate-400 font-bold uppercase tracking-wider">
                      Usuario Conectado
                    </p>
                    <p className="text-sm font-extrabold text-[#0f172a] dark:text-white truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-[#64748b] dark:text-slate-400 truncate">
                      {user.email}
                    </p>
                    <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold border border-emerald-200 dark:border-emerald-800">
                      <ShieldCheck size={12} />
                      <span>{user.userType || 'Conductor'}</span>
                    </div>
                  </div>

                  {/* Menu Option: Mi Perfil */}
                  <button
                    type="button"
                    id="dropdown-menu-profile-btn"
                    onClick={() => handleNavClick('perfil')}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#334155] dark:text-slate-200 hover:bg-[#f1f5f9] dark:hover:bg-slate-800 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <User size={16} className="text-[#0052cc] dark:text-sky-400" />
                    <span>Ver Mi Perfil</span>
                  </button>

                  {/* Menu Option: Cerrar Sesión (Highlighted as requested) */}
                  <button
                    type="button"
                    id="dropdown-menu-logout-btn"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-xs sm:text-sm font-black text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 hover:text-rose-700 flex items-center gap-2.5 transition-colors cursor-pointer mt-1"
                  >
                    <LogOut size={16} className="text-rose-600 dark:text-rose-400" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Unauthenticated state: Login & Register */
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="header-login-btn"
                onClick={() => handleNavClick('login')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  currentScreen === 'login'
                    ? 'bg-[#0052cc] text-white'
                    : 'text-[#334155] dark:text-slate-300 hover:bg-[#f1f5f9] dark:hover:bg-slate-800 border border-[#cbd5e1] dark:border-slate-700'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <LogIn size={15} />
                  <span>{t('nav_login', 'Iniciar Sesión')}</span>
                </span>
              </button>

              <button
                type="button"
                id="header-register-btn"
                onClick={() => handleNavClick('registro')}
                className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer bg-[#16a34a] hover:bg-[#15803d] text-white"
              >
                <UserPlus size={15} />
                <span>{t('nav_register', 'Registrarme')}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ================= ALL SECTIONS PROMINENT TOP BAR (Visible on all screen sizes in the top area) ================= */}
      {user && (
        <div className="w-full bg-[#f8fafc] dark:bg-[#0b1120] border-t border-[#e2e8f0] dark:border-slate-800/80 px-3 sm:px-5 lg:px-6 py-1.5">
          <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;

              return (
                <button
                  key={`top-bar-${item.id}`}
                  type="button"
                  id={`top-subnav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#0052cc] text-white shadow-xs font-black'
                      : 'text-[#334155] dark:text-slate-200 hover:text-[#0052cc] dark:hover:text-white hover:bg-[#e2e8f0] dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-white' : 'text-[#0052cc] dark:text-sky-400'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
